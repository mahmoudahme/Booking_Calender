import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In, Brackets, Not } from 'typeorm';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { ResPartner } from '../entities/entities/ResPartner.entity';
import { DoctorSpecialityModel } from '../entities/entities/DoctorSpecialityModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { SubtimeModel } from '../entities/entities/SubtimeModel.entity';
import { CampaginsSources } from '../entities/entities/CampaginsSources.entity';
import { ResCompany } from '../entities/entities/ResCompany.entity';
import { ResCountry } from '../entities/entities/ResCountry.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';

@Injectable()
export class BookingCalendarService {
    constructor(
        @InjectRepository(DoctorModel)
        private readonly doctorRepository: Repository<DoctorModel>,
        @InjectRepository(OpdRegistrationModel)
        private readonly appointmentRepository: Repository<OpdRegistrationModel>,
        @InjectRepository(ResPartner)
        private readonly partnerRepository: Repository<ResPartner>,
        @InjectRepository(DoctorSpecialityModel)
        private readonly specialityRepository: Repository<DoctorSpecialityModel>,
        @InjectRepository(PatientModel)
        private readonly patientRepository: Repository<PatientModel>,
        @InjectRepository(SubtimeModel)
        private readonly subtimeRepository: Repository<SubtimeModel>,
        @InjectRepository(CampaginsSources)
        private readonly campaignSourcesRepository: Repository<CampaginsSources>,
        @InjectRepository(ResCompany)
        private readonly companyRepository: Repository<ResCompany>,
        @InjectRepository(ResCountry)
        private readonly countryRepository: Repository<ResCountry>,
    ) { }

    async getCountries() {
        const countries = await this.countryRepository.find({ order: { id: 'ASC' } });
        return countries.map(c => ({
            id: c.id,
            name: typeof c.name === 'object' ? (c.name?.en_US || c.name?.ar_001 || Object.values(c.name)[0] || '') : c.name,
            code: c.code,
        }));
    }

    async getCampaignSources() {
        const sources = await this.campaignSourcesRepository.find({ order: { id: 'ASC' } });
        return sources.map(s => ({ id: s.id, name: s.name }));
    }

    async getBranches() {
        const branches = await this.companyRepository.find({
            select: ['id', 'name'],
            order: { id: 'ASC' },
        });
        return branches.map(b => ({ id: b.id, name: b.name }));
    }

    async getDoctors() {
        const [doctors, branches] = await Promise.all([
            this.doctorRepository.find({ relations: ['partner', 'doctorSpeciality'] }),
            this.companyRepository.find({ select: ['id', 'name'] }),
        ]);

        const branchMap = new Map(branches.map(b => [b.id, b.name]));

        // Collect partner IDs to fetch company_id in bulk
        const partnerIds = doctors.map(d => d.partner_id).filter(Boolean);
        const partners = partnerIds.length > 0
            ? await this.partnerRepository.find({ where: { id: In(partnerIds) }, select: ['id', 'company_id'] })
            : [];
        const partnerCompanyMap = new Map(partners.map(p => [p.id, p.company_id]));

        return doctors.map((doc) => {
            const companyId = partnerCompanyMap.get(doc.partner_id) || null;
            const companyName = companyId ? (branchMap.get(companyId) || null) : null;
            return {
                id: doc.id,
                name: doc.partner?.name || 'Unknown Doctor',
                specialty: doc.doctorSpeciality?.name || 'General Dentist',
                image: `https://i.pravatar.cc/150?u=${doc.id}`,
                companyId,
                companyName,
            };
        });
    }

    async getAppointments(startDate: Date, endDate: Date, doctorIds?: number[]) {
        try {
            const start = new Date(startDate);
            if (isNaN(start.getTime())) {
                throw new Error('Invalid start date');
            }
            start.setHours(0, 0, 0, 0);

            const end = new Date(endDate);
            if (isNaN(end.getTime())) {
                throw new Error('Invalid end date');
            }
            end.setHours(23, 59, 59, 999);

            // We use a broader query to catch UTC shifts
            const query = this.appointmentRepository.createQueryBuilder('app')
                .where('(app.appointment_date BETWEEN :start AND :end OR app.search_date BETWEEN :start AND :end OR app.create_date BETWEEN :start AND :end)', {
                    start: new Date(start.getTime() - 4 * 60 * 60 * 1000),
                    end: new Date(end.getTime() + 4 * 60 * 60 * 1000)
                });

            if (doctorIds && doctorIds.length > 0) {
                query.andWhere('app.doctor_id IN (:...ids)', { ids: doctorIds });
            }

            const appointments = await query.orderBy('app.id', 'DESC').getMany();

            // Pre-fetch all slots for efficiency
            const subtimeIds = appointments.map(app => app.subtime).filter(id => id !== null);
            const slots = subtimeIds.length > 0
                ? await this.subtimeRepository.find({ where: { id: In(subtimeIds) } })
                : [];
            const slotsMap = new Map(slots.map(s => [s.id, s]));

            const result = appointments
                .filter(app => !['cancel', 'cancelled'].includes(app.appointment_state || ''))
                .map((app) => {
                    const adjustDate = (d: Date | null) => {
                        if (!d) return null;
                        return new Date(d); // Browser/Node will handle local offset
                    };

                    const baseDate = app.appointment_date || app.search_date || app.create_date;
                    if (!baseDate) return null;

                    let finalStart = adjustDate(baseDate);

                    // If Odoo linked a specific slot (subtime), use its local time string
                    if (app.subtime) {
                        const slot = slotsMap.get(app.subtime);
                        if (slot && slot.subtime) {
                            let timeStr = slot.subtime;

                            // Simple parser for "09:00" or "09:00 Am"
                            let [part1, part2] = timeStr.split(' ');
                            if (part1) {
                                let parts = part1.split(':');
                                if (parts.length >= 2) {
                                    let h = parseInt(parts[0]);
                                    let m = parseInt(parts[1]);

                                    if (part2) {
                                        const mode = part2.toLowerCase().trim();
                                        if (mode === 'pm' && h < 12) h += 12;
                                        if (mode === 'am' && h === 12) h = 0;
                                    }

                                    if (!isNaN(h) && !isNaN(m)) {
                                        finalStart.setHours(h, m, 0, 0);
                                    }
                                }
                            }
                        }
                    }

                    // Calculate duration: default to 15m or use stored end_date
                    let durationMinutes = 15;
                    if (app.appointment_date && app.end_date) {
                        durationMinutes = Math.floor((new Date(app.end_date).getTime() - new Date(app.appointment_date).getTime()) / 60000);
                    }

                    const finalEnd = new Date(finalStart.getTime() + durationMinutes * 60000);

                    const ay = finalStart.getFullYear();
                    const am = String(finalStart.getMonth() + 1).padStart(2, '0');
                    const ad = String(finalStart.getDate()).padStart(2, '0');
                    const aDateStr = `${ay}-${am}-${ad}`;

                    const title = app.patient_name ||
                        app.english_name ||
                        'No Name Patient';

                    const getStateColor = (state: string) => {
                        const s = (state || '').toLowerCase().trim();
                        if (s === 'onthyfly') return 'gray';
                        if (['confirmed', 'confirm'].includes(s)) return 'teal';
                        if (s === 'arrived') return 'blue';
                        if (s === 'in_chair') return 'purple';
                        if (s === 'in_payment') return 'orange';
                        if (s === 'paid') return 'green';
                        if (['closed', 'visit_closed'].includes(s)) return 'pink';
                        return 'blue'; // Default
                    };

                    return {
                        id: app.id,
                        docId: app.doctor_id,
                        title: title,
                        time: finalStart.toTimeString().substring(0, 5), // Local time string
                        duration: durationMinutes || 15,
                        type: getStateColor(app.appointment_state),
                        date: aDateStr,
                        appointment_date: finalStart,
                        end_date: finalEnd,
                        state: app.appointment_state
                    };
                }).filter(item => item !== null);

            // Precise filtering
            const filtered = result.filter(a => {
                const aDayStr = a.date;
                const targetDayStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;

                // If the range is exactly one day
                const diffMs = end.getTime() - start.getTime();
                if (diffMs <= 24 * 60 * 60 * 1000) {
                    return aDayStr === targetDayStr;
                }

                const aDay = new Date(aDayStr);
                return aDay >= start && aDay <= end;
            });

            return { appointments: filtered };
        } catch (error) {
            console.error('Error in getAppointments:', error);
            throw error;
        }
    }

    async getSlots(doctorId: number, dayName: string) {
        const slots = await this.subtimeRepository.find({
            where: {
                doctor_id: doctorId,
                day: dayName,
            },
            order: {
                subtime: 'ASC',
            },
        });

        // Ensure uniqueness by subtime string to avoid "Double Slots" issues
        const uniqueSlots = [];
        const seen = new Set();
        for (const s of slots) {
            if (!seen.has(s.subtime)) {
                seen.add(s.subtime);
                uniqueSlots.push(s);
            }
        }
        return uniqueSlots;
    }

    async createAppointment(data: CreateAppointmentDto) {
        let { doctorId, patientName, date, time, duration, notes, patientId, slotIds, patientDetails, patientSrcId } = data;
        const start = new Date(`${date}T${time}`);
        const slotCount = Math.max(1, Math.floor(duration / 15));
        const dayName = start.toLocaleDateString('en-US', { weekday: 'long' });

        // --- 1. HANDLE PATIENT (Link existing only, no new patient creation) ---
        let patient;
        if (patientId) {
            patient = await this.patientRepository.findOne({ where: { id: patientId } });

            // Update existing patient data if provided
            if (patient && patientDetails) {
                patient.first_name = patientDetails.firstName || patient.first_name;
                patient.middle_name = patientDetails.middleName || patient.middle_name;
                patient.last_name = patientDetails.lastName || patient.last_name;
                patient.mobile = patientDetails.mobile || patient.mobile;
                patient.id_number = patientDetails.nationalId || patient.id_number;
                patient.date_of_birth = patientDetails?.dob ? new Date(patientDetails.dob) : patient.date_of_birth;
                patient.gender = patientDetails.gender ? patientDetails.gender.toLowerCase() : patient.gender;
                patient.age = patientDetails?.age ? (typeof patientDetails.age === 'string' ? parseInt(patientDetails.age) : patientDetails.age) : patient.age;
                patient.english_name = patientName || patient.english_name;
                await this.patientRepository.save(patient);
            }
        }

        const createdAppointments = [];

        for (let i = 0; i < slotCount; i++) {
            const chunkStart = new Date(start.getTime() + i * 15 * 60000);
            const chunkEnd = new Date(chunkStart.getTime() + 15 * 60000);
            const chunkTimeStr = chunkStart.toTimeString().substring(0, 5);

            let slot;
            // Precise linking: If user sent slotIds array, use the specific ID for this chunk
            if (slotIds && slotIds[i]) {
                slot = await this.subtimeRepository.findOne({ where: { id: slotIds[i] } });
            }

            if (!slot) {
                slot = await this.subtimeRepository.findOne({
                    where: {
                        doctor_id: doctorId,
                        day: dayName,
                        subtime: chunkTimeStr
                    }
                });
            }

            // Odoo stores in UTC. If we are in Egypt (UTC+2), we subtract 2 hours from local time to store in UTC.
            const toUTC = (d: Date) => new Date(d.getTime() - 2 * 60 * 60000);

            const appointment = this.appointmentRepository.create({
                doctor_id: doctorId,
                patient_id: patient?.id || null,
                patient_name: patientName,
                english_name: patientName,
                name: patientName,
                new_or_exist: patientId ? 'exist' : 'new_reg',
                appointment_date: toUTC(chunkStart),
                end_date: toUTC(chunkEnd),
                subtime: slot ? slot.id : null,
                search_date: toUTC(chunkStart),
                notes: notes,
                appointment_state: 'onthyfly',
                status: 'scheduled',
                patient_source: patientSrcId || null,
                company: 1,
                // Patient personal data
                mobile: patientDetails?.mobile || patient?.mobile || null,
                phone_number: patientDetails?.mobile || patient?.mobile || null,
                gender: patientDetails?.gender ? (patientDetails.gender.toLowerCase() === 'male' ? 'Male' : 'Female') : (patient?.gender || null),
                age: patientDetails?.age ? (typeof patientDetails.age === 'string' ? parseInt(patientDetails.age) : patientDetails.age) : (patient?.age || null),
                vat: patientDetails?.nationalId || patient?.id_number || null,
                id_type: patientDetails?.idType || null,
                nationality: patientDetails?.nationalityId ? Number(patientDetails.nationalityId) : null,
                date_of_birth: patientDetails?.dob ? new Date(patientDetails.dob) : (patient?.date_of_birth || null),
                patient_seq: patient?.patient_seq || null,
                create_uid: 1,
                write_uid: 1,
                create_date: new Date(),
                write_date: new Date()
            });

            createdAppointments.push(await this.appointmentRepository.save(appointment));
        }

        return createdAppointments;
    }

    async searchAppointments(term: string) {
        // Use QueryBuilder for advanced search across multiple fields
        const query = this.appointmentRepository.createQueryBuilder('app')
            .where('app.patient_name ILIKE :term', { term: `%${term}%` })
            .orWhere('app.english_name ILIKE :term', { term: `%${term}%` })
            .limit(10);

        const results = await query.getMany();

        const getStateColor = (state: string) => {
            const s = (state || '').toLowerCase().trim();
            if (s === 'onthyfly') return 'gray';
            if (['confirmed', 'confirm'].includes(s)) return 'teal';
            if (s === 'arrived') return 'blue';
            if (s === 'in_chair') return 'purple';
            if (s === 'in_payment') return 'orange';
            if (s === 'paid') return 'green';
            if (['closed', 'visit_closed'].includes(s)) return 'pink';
            return 'blue';
        };

        return results.map((app) => ({
            id: app.id,
            docId: app.doctor_id,
            title: app.patient_name || app.english_name || 'No Name',
            time: app.appointment_date ? app.appointment_date.toTimeString().substring(0, 5) : '00:00',
            duration: 60,
            type: getStateColor(app.appointment_state),
            date: app.appointment_date ? app.appointment_date.toISOString().substring(0, 10) : '',
        }));
    }


    async searchPatients(term: string) {
        const query = this.patientRepository.createQueryBuilder('patient')
            .leftJoinAndMapOne('patient.partner', ResPartner, 'partner', 'partner.id = patient.partner_id');

        if (term && term.trim() !== '') {
            query.where(new Brackets(qb => {
                qb.where('patient.english_name ILIKE :term', { term: `%${term}%` })
                    .orWhere('patient.first_name ILIKE :term', { term: `%${term}%` })
                    .orWhere('patient.middle_name ILIKE :term', { term: `%${term}%` })
                    .orWhere('patient.last_name ILIKE :term', { term: `%${term}%` })
                    .orWhere('patient.mobile ILIKE :term', { term: `%${term}%` })
                    .orWhere('patient.id_number ILIKE :term', { term: `%${term}%` })
                    .orWhere('partner.name ILIKE :term', { term: `%${term}%` });
            }));
        }

        query.orderBy('patient.id', 'DESC').limit(50);

        const patients = await query.getMany();

        return patients.map((p: any) => ({
            id: p.id,
            firstName: p.first_name || p.partner?.name?.split(' ')[0] || '',
            middleName: p.middle_name || '',
            lastName: p.last_name || p.partner?.name?.split(' ').slice(1).join(' ') || '',
            name: `${p.first_name || ''} ${p.middle_name || ''} ${p.last_name || ''}`.trim() || p.partner?.name || p.english_name || 'Unknown',
            mobile: p.mobile || p.mobile_number || '',
            nationalId: p.id_number || '',
            idType: p.id_type || '',
            nationalityId: p.nationality || null,
            additionalPhone: p.phone_number || p.mobile_number || '',
            dob: p.date_of_birth ? new Date(p.date_of_birth).toISOString().split('T')[0] : '',
            gender: (() => {
                const g = (p.gender || '').toLowerCase();
                if (g === 'male') return 'Male';
                if (g === 'female') return 'Female';
                return '';
            })(),
            age: p.age || (p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : '')
        }));
    }

    private calculateEndDate(date: string, time: string, duration: number): Date {
        const start = new Date(`${date}T${time}`);
        return new Date(start.getTime() + duration * 60000);
    }

    async seedData() {
        // --- 1. COMPREHENSIVE CLEANUP ---
        await this.appointmentRepository.query('DELETE FROM opd_registration_model');
        await this.subtimeRepository.query('DELETE FROM subtime_model');
        await this.appointmentRepository.query('DELETE FROM doctor_schedule');
        await this.doctorRepository.query('DELETE FROM doctor_model');

        // --- 2. CREATE ONE SPECIALITY ---
        const specName = 'General Dentist';
        let spec = await this.specialityRepository.findOne({ where: { name: specName } });
        if (!spec) {
            spec = await this.specialityRepository.save(this.specialityRepository.create({ name: specName }));
        }

        // --- 3. CREATE ONE DOCTOR ---
        const doctorName = 'Dr. Amr Khaled';
        const startHour = 9;
        const endHour = 17; // 9 AM to 5 PM

        let partner = await this.partnerRepository.findOne({ where: { name: doctorName } });
        if (!partner) {
            partner = await this.partnerRepository.save(this.partnerRepository.create({
                name: doctorName,
                active: true,
                is_company: false,
                type: 'contact',
                company_id: 1,
                lang: 'en_US',
                autopost_bills: 'never',
                group_rfq: 'one',
                group_on: 'partner'
            }));
        }

        const doctor = await this.doctorRepository.save(this.doctorRepository.create({
            partner_id: partner.id,
            doctor_speciality: spec.id,
            create_uid: 1, write_uid: 1, create_date: new Date(), write_date: new Date()
        }));

        // Create Schedule (Odoo Requirement)
        await this.appointmentRepository.query(`
            INSERT INTO doctor_schedule 
            (doctor_id, period_type, day_field, start_time, end_time, period, active, create_uid, write_uid, create_date, write_date)
            VALUES ($1, 'morning', 'all', $2, $3, 15, true, 1, 1, NOW(), NOW())
        `, [doctor.id, startHour, endHour]);

        // --- 4. CREATE SLOTS (SubtimeModel) ---
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const allSlots = [];

        for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + dayOffset);
            const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

            let currentSlotTime = new Date(currentDate);
            currentSlotTime.setHours(startHour, 0, 0, 0);

            while (currentSlotTime.getHours() < endHour) {
                const timeStr = currentSlotTime.toTimeString().substring(0, 5);
                allSlots.push(this.subtimeRepository.create({
                    doctor_id: doctor.id,
                    subtime: timeStr,
                    day: dayName,
                    create_uid: 1, write_uid: 1, create_date: new Date(), write_date: new Date()
                }));
                currentSlotTime = new Date(currentSlotTime.getTime() + 15 * 60000); // 15 min slots
            }
        }
        const savedSlots = await this.subtimeRepository.save(allSlots);

        return {
            message: 'System reset. Created 1 doctor with 14 days of slots.',
            doctor: doctorName,
            hours: `${startHour}:00 - ${endHour}:00`,
            slotsCount: savedSlots.length
        };
    }




    async clearSlots() {
        try {
            const deleteResult = await this.subtimeRepository.createQueryBuilder()
                .delete()
                .execute();
            return {
                message: 'Slots cleared successfully',
                deletedCount: deleteResult.affected,
                description: 'All records from the subtime_model table have been removed.'
            };
        } catch (error) {
            console.error('Error in clearSlots:', error);
            return {
                message: 'Failed to clear slots',
                error: error.message,
                detail: error.detail
            };
        }
    }

    async clearData() {
        try {
            const deleteResult = await this.appointmentRepository.createQueryBuilder()
                .delete()
                .execute();
            return {
                message: 'Appointments cleared successfully',
                deletedCount: deleteResult.affected,
                description: 'All records from the appointments table have been removed.'
            };
        } catch (error) {
            console.error('Error in clearData:', error);
            return {
                message: 'Failed to clear appointments',
                error: error.message,
                detail: error.detail
            };
        }
    }
    async analyzeData() {
        const doctors = await this.doctorRepository.find({ relations: ['partner'] });
        const appointments = await this.appointmentRepository.find();
        const slots = await this.subtimeRepository.find();
        const schedules = await this.doctorRepository.query('SELECT * FROM doctor_schedule');

        const issues = [];
        const problematicApps = [];

        // Check Doctors
        for (const doc of doctors) {
            if (!doc.partner) issues.push(`Doctor ID ${doc.id} missing Partner relation.`);
            const hasSchedule = schedules.some((s: any) => s.doctor_id === doc.id);
            if (!hasSchedule) issues.push(`Doctor ${doc.partner?.name || doc.id} has no entry in doctor_schedule.`);
            const hasSlots = slots.some(s => s.doctor_id === doc.id);
            if (!hasSlots) issues.push(`Doctor ${doc.partner?.name || doc.id} has no slots in subtime_model.`);
        }

        // Check Appointments
        for (const app of appointments) {
            let appIssue = false;
            if (!app.doctor_id) { issues.push(`Appointment ID ${app.id} has no doctor_id.`); appIssue = true; }
            if (!app.subtime) { issues.push(`Appointment ID ${app.id} (Patient: ${app.patient_name}) is not linked to any subtime slot.`); appIssue = true; }
            if (!app.appointment_date) { issues.push(`Appointment ID ${app.id} missing appointment_date.`); appIssue = true; }

            if (appIssue) {
                problematicApps.push({
                    id: app.id,
                    patient: app.patient_name,
                    doctor: app.doctor_id,
                    appointment_date: app.appointment_date,
                    search_date: app.search_date,
                    create_date: app.create_date
                });
            }
        }

        return {
            summary: {
                doctorsCount: doctors.length,
                appointmentsCount: appointments.length,
                slotsCount: slots.length,
                schedulesCount: schedules.length
            },
            issues: issues.length > 0 ? issues : "No issues found. Data looks healthy.",
            problematicDetails: problematicApps,
            doctorsList: doctors.map(d => ({ id: d.id, name: d.partner?.name || 'Unknown' })),
        };
    }

    async repairData() {
        const appointments = await this.appointmentRepository.find();
        let repairedCount = 0;

        for (const app of appointments) {
            let needsSave = false;
            if (!app.appointment_date) {
                app.appointment_date = app.search_date || app.create_date || new Date();
                needsSave = true;
            }
            if (!app.search_date) {
                app.search_date = app.appointment_date;
                needsSave = true;
            }

            if (needsSave) {
                await this.appointmentRepository.save(app);
                repairedCount++;
            }
        }

        // --- NEW: Deduplicate Slots ---
        const duplicates = await this.subtimeRepository.query(`
            SELECT doctor_id, subtime, day, COUNT(*) 
            FROM subtime_model 
            GROUP BY doctor_id, subtime, day 
            HAVING COUNT(*) > 1
        `);

        let deletedSlots = 0;
        for (const dup of duplicates) {
            // Keep the one with the highest ID, delete others
            const allOfThem = await this.subtimeRepository.find({
                where: { doctor_id: dup.doctor_id, subtime: dup.subtime, day: dup.day },
                order: { id: 'DESC' }
            });

            const toDelete = allOfThem.slice(1);
            if (toDelete.length > 0) {
                await this.subtimeRepository.remove(toDelete);
                deletedSlots += toDelete.length;
            }
        }

        return {
            message: 'Data repair and deduplication completed',
            repairedAppointments: repairedCount,
            deletedDuplicateSlots: deletedSlots
        };
    }

    async getDoctorSchedule(doctorId: number | null, date: string) {
        try {
            const dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid date provided');
            }
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[dateObj.getDay()];

            let targetDoctorIds: number[] = [];
            if (doctorId) {
                targetDoctorIds = [doctorId];
            } else {
                const allDocs = await this.doctorRepository.find({ select: ['id'] });
                targetDoctorIds = allDocs.map(d => d.id);
            }

            const schedules: any = {};

            for (const docId of targetDoctorIds) {
                const slots = await this.subtimeRepository.find({
                    where: {
                        doctor_id: docId,
                        day: dayName,
                    },
                    select: ['id', 'subtime', 'day'],
                    order: { id: 'ASC' }
                });

                const bookedSlots = await this.appointmentRepository.find({
                    where: {
                        doctor_id: docId,
                        search_date: Between(
                            new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0),
                            new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59)
                        ),
                        appointment_state: Not(In(['cancel', 'cancelled']))
                    },
                    select: ['subtime'],
                });

                const bookedSlotIds = new Set(bookedSlots.map(booking => booking.subtime));

                const slotsWithBookingStatus = slots.map(slot => ({
                    id: slot.id,
                    subtime: slot.subtime,
                    day: slot.day,
                    available: !bookedSlotIds.has(slot.id),
                }));

                schedules[docId] = slotsWithBookingStatus;
            }

            return {
                success: true,
                message: 'DATA_RETRIEVED_SUCCESS',
                data: {
                    schedules: schedules
                },
            };
        } catch (error) {
            console.error("Error fetching schedule:", error);
            throw error; // Let the filter handle it
        }
    }

    /**
     * Get appointment by ID with full details
     */
    async getAppointmentById(appointmentId: number) {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id: appointmentId },
            });

            if (!appointment) {
                throw new Error('APPOINTMENT_NOT_FOUND');
            }

            const adjustDate = (d: Date | null) => {
                if (!d) return null;
                return new Date(d);
            };

            const baseDate = appointment.appointment_date || appointment.search_date || appointment.create_date;
            let finalStart = adjustDate(baseDate);

            // Parse slot time if available
            if (appointment.subtime) {
                const slot = await this.subtimeRepository.findOne({ where: { id: appointment.subtime } });
                if (slot && slot.subtime) {
                    let timeStr = slot.subtime;
                    let [part1, part2] = timeStr.split(' ');
                    let [h, m] = part1.split(':').map(Number);

                    if (part2) {
                        const mode = part2.toLowerCase().trim();
                        if (mode === 'pm' && h < 12) h += 12;
                        if (mode === 'am' && h === 12) h = 0;
                    }

                    if (!isNaN(h) && !isNaN(m)) {
                        finalStart.setHours(h, m, 0, 0);
                    }
                }
            }

            // Calculate duration
            let durationMinutes = 15;
            if (appointment.appointment_date && appointment.end_date) {
                durationMinutes = Math.floor((new Date(appointment.end_date).getTime() - new Date(appointment.appointment_date).getTime()) / 60000);
            }

            const ay = finalStart.getFullYear();
            const am = String(finalStart.getMonth() + 1).padStart(2, '0');
            const ad = String(finalStart.getDate()).padStart(2, '0');
            const aDateStr = `${ay}-${am}-${ad}`;

            const patientName = appointment.patient_name ||
                appointment.english_name ||
                'No Name Patient';

            // Fetch patient details if patient_id exists
            let patient = null;
            if (appointment.patient_id) {
                patient = await this.patientRepository.findOne({ where: { id: appointment.patient_id } });
            }

            // If no patient linked, parse name from OPD record
            const opdNameParts = (appointment.patient_name || appointment.english_name || '').trim().split(/\s+/);
            const opdFirstName  = opdNameParts[0] || '';
            const opdMiddleName = opdNameParts.length > 2 ? opdNameParts.slice(1, -1).join(' ') : '';
            const opdLastName   = opdNameParts.length > 1 ? opdNameParts[opdNameParts.length - 1] : '';

            const normalizeGender = (g: string | null) => {
                const s = (g || '').toLowerCase().trim();
                if (s === 'male')   return 'Male';
                if (s === 'female') return 'Female';
                return '';
            };

            return {
                success: true,
                message: 'APPOINTMENT_RETRIEVED_SUCCESS',
                data: {
                    id: appointment.id,
                    docId: appointment.doctor_id,
                    patientId: appointment.patient_id,
                    patientName: patientName,
                    time: finalStart.toTimeString().substring(0, 5),
                    duration: durationMinutes,
                    date: aDateStr,
                    notes: appointment.notes,
                    state: appointment.appointment_state,
                    patientSrcId: appointment.patient_source || null,
                    patientDetails: {
                        firstName:  patient?.first_name  || opdFirstName,
                        middleName: patient?.middle_name || opdMiddleName,
                        lastName:   patient?.last_name   || opdLastName,
                        mobile:     patient?.mobile      || appointment.mobile || appointment.phone_number || '',
                        nationalId: patient?.id_number   || appointment.vat   || appointment.id_number   || '',
                        idType: appointment.id_type || '',
                        nationalityId: appointment.nationality || null,
                        dob: patient?.date_of_birth
                            ? new Date(patient.date_of_birth).toISOString().split('T')[0]
                            : appointment.date_of_birth
                                ? new Date(appointment.date_of_birth).toISOString().split('T')[0]
                                : '',
                        gender: patient ? normalizeGender(patient.gender) : normalizeGender(appointment.gender),
                        age: patient?.age || appointment.age || '',
                        additionalPhone: ''
                    }
                },
            };
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            throw error;
        }
    }

    /**
     * Get the last appointment's patient_source for a given patient
     */
    async getLastAppointmentByPatient(patientId: number) {
        const last = await this.appointmentRepository.findOne({
            where: { patient_id: patientId },
            order: { id: 'DESC' },
        });
        return { patientSrcId: last?.patient_source || null };
    }

    /**
     * Update an existing appointment
     */
    async updateAppointment(appointmentId: number, data: UpdateAppointmentDto) {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id: appointmentId },
            });

            if (!appointment) {
                throw new Error('APPOINTMENT_NOT_FOUND');
            }

            let { doctorId, patientName, date, time, duration, notes, patientId, slotIds, patientDetails } = data;

            // Update patient details if provided
            if (appointment.patient_id && patientDetails) {
                const patient = await this.patientRepository.findOne({ where: { id: appointment.patient_id } });
                if (patient) {
                    patient.first_name = patientDetails.firstName || patient.first_name;
                    patient.middle_name = patientDetails.middleName || patient.middle_name;
                    patient.last_name = patientDetails.lastName || patient.last_name;
                    patient.mobile = patientDetails.mobile || patient.mobile;
                    patient.date_of_birth = patientDetails.dob ? new Date(patientDetails.dob) : patient.date_of_birth;
                    patient.gender = patientDetails.gender ? patientDetails.gender.toLowerCase() : patient.gender;
                    patient.age = patientDetails.age ? (typeof patientDetails.age === 'string' ? parseInt(patientDetails.age) : patientDetails.age) : patient.age;
                    patient.english_name = patientName || patient.english_name;
                    await this.patientRepository.save(patient);
                }
            }

            // Update appointment fields
            const start = new Date(`${date}T${time}`);
            const end = new Date(start.getTime() + duration * 60000);
            const toUTC = (d: Date) => new Date(d.getTime() - 2 * 60 * 60000);

            appointment.doctor_id = doctorId || appointment.doctor_id;
            appointment.patient_name = patientName || appointment.patient_name;
            appointment.english_name = patientName || appointment.english_name;

            // Update basic appointment fields if provided
            if (patientDetails) {
                appointment.mobile = patientDetails.mobile || appointment.mobile;
                appointment.vat = patientDetails.nationalId || appointment.vat;
                appointment.id_type = patientDetails.idType || appointment.id_type;
                appointment.nationality = patientDetails.nationalityId ? Number(patientDetails.nationalityId) : appointment.nationality;
                appointment.date_of_birth = patientDetails.dob ? new Date(patientDetails.dob) : appointment.date_of_birth;
                appointment.gender = patientDetails.gender ? (patientDetails.gender.toLowerCase() === 'male' ? 'Male' : 'Female') : appointment.gender;
                appointment.age = patientDetails.age ? (typeof patientDetails.age === 'string' ? parseInt(patientDetails.age) : patientDetails.age) : appointment.age;
            }

            appointment.appointment_date = toUTC(start);
            appointment.end_date = toUTC(end);
            appointment.search_date = toUTC(start);
            appointment.notes = notes !== undefined ? notes : appointment.notes;
            appointment.write_date = new Date();

            // Update slot if provided
            if (slotIds && slotIds[0]) {
                const slot = await this.subtimeRepository.findOne({ where: { id: slotIds[0] } });
                if (slot) {
                    appointment.subtime = slot.id;
                }
            }

            await this.appointmentRepository.save(appointment);

            return {
                success: true,
                message: 'APPOINTMENT_UPDATED_SUCCESS',
                data: appointment,
            };
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    }

    /**
     * Update only the appointment_state field
     */
    async updateAppointmentState(appointmentId: number, state: string) {
        const appointment = await this.appointmentRepository.findOne({ where: { id: appointmentId } });
        if (!appointment) throw new Error('APPOINTMENT_NOT_FOUND');
        appointment.appointment_state = state;
        appointment.write_date = new Date();
        await this.appointmentRepository.save(appointment);
        return { success: true, message: 'STATUS_UPDATED', data: { id: appointmentId, state } };
    }

    /**
     * Delete an appointment (soft delete by changing state)
     */
    async deleteAppointment(appointmentId: number) {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id: appointmentId },
            });

            if (!appointment) {
                throw new Error('APPOINTMENT_NOT_FOUND');
            }
            // Hard Delete as requested: Remove the record completely
            await this.appointmentRepository.delete(appointmentId);

            return {
                success: true,
                message: 'APPOINTMENT_DELETED_SUCCESS',
            };
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw error;
        }
    }
}
