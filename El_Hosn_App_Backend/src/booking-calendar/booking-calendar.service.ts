import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In, Brackets, Not } from 'typeorm';
import { DoctorModel } from '../entities/entities/DoctorModel.entity';
import { OpdRegistrationModel } from '../entities/entities/OpdRegistrationModel.entity';
import { ResPartner } from '../entities/entities/ResPartner.entity';
import { DoctorSpecialityModel } from '../entities/entities/DoctorSpecialityModel.entity';
import { PatientModel } from '../entities/entities/PatientModel.entity';
import { SubtimeModel } from '../entities/entities/SubtimeModel.entity';

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
    ) { }

    async getDoctors() {
        const doctors = await this.doctorRepository.find({
            relations: ['partner', 'doctorSpeciality'],
        });

        return doctors.map((doc) => ({
            id: doc.id,
            name: doc.partner?.name || 'Unknown Doctor',
            specialty: doc.doctorSpeciality?.name || 'General Dentist',
            image: `https://i.pravatar.cc/150?u=${doc.id}`, // Placeholder as requested or if entity has image
        }));
    }

    async getAppointments(startDate: Date, endDate: Date, doctorIds?: number[]) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        // We use a broader query to catch UTC shifts
        const query = this.appointmentRepository.createQueryBuilder('app')
            .leftJoinAndSelect('app.doctor', 'doctor')
            .leftJoinAndSelect('doctor.partner', 'docPartner')
            .leftJoinAndSelect('app.patient', 'patient')
            .leftJoinAndSelect('patient.partner', 'patPartner')
            .leftJoinAndSelect('app.subtime_rel', 'subtime') // Join to get slot time from Odoo
            .where('(app.appointment_date BETWEEN :start AND :end OR app.search_date BETWEEN :start AND :end OR app.create_date BETWEEN :start AND :end)', {
                start: new Date(start.getTime() - 4 * 60 * 60 * 1000),
                end: new Date(end.getTime() + 4 * 60 * 60 * 1000)
            });

        if (doctorIds && doctorIds.length > 0) {
            query.andWhere('app.doctor_id IN (:...ids)', { ids: doctorIds });
        }

        const appointments = await query.orderBy('app.id', 'DESC').getMany();

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

                // CRITICAL FIX: If Odoo linked a specific slot (subtime), use its local time string!
                if (app.subtime_rel && app.subtime_rel.subtime) {
                    let timeStr = app.subtime_rel.subtime;

                    // Simple parser for "09:00" or "09:00 Am"
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
                    (app.patient && app.patient.english_name) ||
                    (app.patient && app.patient.partner && app.patient.partner.name) ||
                    'No Name Patient';

                return {
                    id: app.id,
                    docId: app.doctor_id,
                    title: title,
                    time: finalStart.toTimeString().substring(0, 5), // Local time string
                    duration: 15,
                    type: (['confirmed', 'confirm', 'onthyfly'].includes(app.appointment_state)) ? 'blue' : 'pink',
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
            if (start.getTime() === end.getTime() - (24 * 60 * 60 * 1000 - 1)) {
                return aDayStr === targetDayStr;
            }
            const aDay = new Date(aDayStr);
            return aDay >= start && aDay <= end;
        });

        return { appointments: filtered };
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

    async createAppointment(data: any) {
        let { doctorId, patientName, date, time, duration, notes, patientId, slotIds, patientDetails } = data;
        const start = new Date(`${date}T${time}`);
        const slotCount = Math.max(1, Math.floor(duration / 15));
        const dayName = start.toLocaleDateString('en-US', { weekday: 'long' });

        // --- 1. HANDLE PATIENT (Link existing or Create new) ---
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
                patient.age = patientDetails?.age ? parseInt(patientDetails.age) : patient.age;
                patient.english_name = patientName || patient.english_name;
                await this.patientRepository.save(patient);
            }
        }

        if (!patient) {
            // Create a New Patient for Odoo
            let partner = await this.partnerRepository.findOne({ where: { name: patientName } });
            if (!partner) {
                partner = await this.partnerRepository.save(this.partnerRepository.create({
                    name: patientName,
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

            patient = await this.patientRepository.save(this.patientRepository.create({
                partner_id: partner.id,
                english_name: patientName,
                first_name: patientDetails?.firstName || patientName.split(' ')[0],
                middle_name: patientDetails?.middleName,
                last_name: patientDetails?.lastName || patientName.split(' ').slice(1).join(' '),
                mobile: patientDetails?.mobile,
                id_number: patientDetails?.nationalId,
                date_of_birth: patientDetails?.dob ? new Date(patientDetails.dob) : null,
                gender: patientDetails?.gender ? patientDetails.gender.toLowerCase() : null,
                age: patientDetails?.age ? parseInt(patientDetails.age) : null,
                mrn: `MRN-${Math.floor(100000 + Math.random() * 900000)}`,
                create_date: new Date(),
                write_date: new Date(),
                create_uid: 1,
                write_uid: 1
            }));
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
            } else if (i === 0 && data.slotId) {
                // Backward compatibility for single slotId
                slot = await this.subtimeRepository.findOne({ where: { id: data.slotId } });
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
                patient_id: patient.id,
                patient_name: patientName,
                english_name: patientName,
                appointment_date: toUTC(chunkStart),
                end_date: toUTC(chunkEnd),
                subtime: slot ? slot.id : null,
                search_date: toUTC(chunkStart),
                notes: notes,
                appointment_state: 'confirmed',
                status: 'scheduled',
                company: 1,
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
            .leftJoinAndSelect('app.doctor', 'doctor')
            .leftJoinAndSelect('doctor.partner', 'partner')
            .where('app.patient_name ILIKE :term', { term: `%${term}%` })
            .orWhere('app.english_name ILIKE :term', { term: `%${term}%` })
            .orWhere('partner.name ILIKE :term', { term: `%${term}%` })
            .limit(10);

        const results = await query.getMany();

        return results.map((app) => ({
            id: app.id,
            docId: app.doctor_id,
            title: app.patient_name || app.english_name || 'No Name',
            time: app.appointment_date ? app.appointment_date.toTimeString().substring(0, 5) : '00:00',
            duration: 60, // Default or calculated
            type: app.appointment_state === 'confirmed' ? 'blue' : 'pink',
            date: app.appointment_date ? app.appointment_date.toISOString().substring(0, 10) : '',
        }));
    }

    async searchPatients(term: string) {
        const query = this.patientRepository.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.partner', 'partner');

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

        return patients.map(p => ({
            id: p.id,
            firstName: p.first_name || p.partner?.name?.split(' ')[0] || '',
            middleName: p.middle_name || '',
            lastName: p.last_name || p.partner?.name?.split(' ').slice(1).join(' ') || '',
            name: `${p.first_name || ''} ${p.middle_name || ''} ${p.last_name || ''}`.trim() || p.partner?.name || p.english_name || 'Unknown',
            mobile: p.mobile || p.mobile_number || '',
            nationalId: p.id_number || '',
            dob: p.date_of_birth ? new Date(p.date_of_birth).toISOString().split('T')[0] : '',
            gender: p.gender === 'male' ? 'Male' : p.gender === 'female' ? 'Female' : '',
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
                        search_date: new Date(date),
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

                // If single doctor, we can keep backward compat or just use the map structure.
                // To support "Get All", the map structure { [docId]: slots } is best.
                schedules[docId] = slotsWithBookingStatus;
            }

            // If a specific doctor was requested, we can return just the slots to match previous expectations,
            // OR we always return the map. For consistency with "Bulk", let's return the map (or handle in frontend).
            // Actually, to make frontend easy: let's return { schedules: { 47: [...], 48: [...] } }

            return {
                status: true,
                statusCode: 200,
                message: 'DATA_RETRIEVED_SUCCESS',
                data: {
                    schedules: schedules // Map of DoctorID -> Slots
                },
            };
        } catch (error) {
            console.error("Error fetching schedule:", error);
            return {
                status: false,
                statusCode: 500,
                message: 'FAILED_TO_FETCH_DATA',
                error: error.message,
            };
        }
    }

    /**
     * Get appointment by ID with full details
     */
    async getAppointmentById(appointmentId: number) {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id: appointmentId },
                relations: ['doctor', 'doctor.partner', 'patient', 'patient.partner', 'subtime_rel'],
            });

            if (!appointment) {
                return {
                    status: false,
                    statusCode: 404,
                    message: 'APPOINTMENT_NOT_FOUND',
                };
            }

            const adjustDate = (d: Date | null) => {
                if (!d) return null;
                return new Date(d);
            };

            const baseDate = appointment.appointment_date || appointment.search_date || appointment.create_date;
            let finalStart = adjustDate(baseDate);

            // Parse slot time if available
            if (appointment.subtime_rel && appointment.subtime_rel.subtime) {
                let timeStr = appointment.subtime_rel.subtime;
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
                (appointment.patient && appointment.patient.english_name) ||
                (appointment.patient && appointment.patient.partner && appointment.patient.partner.name) ||
                'No Name Patient';

            return {
                status: true,
                statusCode: 200,
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
                    patientDetails: {
                        firstName: appointment.patient?.first_name || appointment.first_name || '',
                        middleName: appointment.patient?.middle_name || appointment.middle_name || '',
                        lastName: appointment.patient?.last_name || appointment.last_name || '',
                        mobile: appointment.patient?.mobile || appointment.mobile || '',
                        nationalId: appointment.patient?.id_number || appointment.id_number || '',
                        dob: appointment.patient?.date_of_birth ? new Date(appointment.patient.date_of_birth).toISOString().split('T')[0] : 
                             appointment.date_of_birth ? new Date(appointment.date_of_birth).toISOString().split('T')[0] : '',
                        gender: appointment.patient?.gender === 'male' ? 'Male' : 
                               appointment.patient?.gender === 'female' ? 'Female' : 
                               appointment.gender === 'male' ? 'Male' :
                               appointment.gender === 'female' ? 'Female' : '',
                        age: appointment.patient?.age || appointment.age || '',
                        additionalPhone: appointment.additional_phone || ''
                    }
                },
            };
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            return {
                status: false,
                statusCode: 500,
                message: 'FAILED_TO_FETCH_APPOINTMENT',
                error: error.message,
            };
        }
    }

    /**
     * Update an existing appointment
     */
    async updateAppointment(appointmentId: number, data: any) {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id: appointmentId },
                relations: ['patient'],
            });

            if (!appointment) {
                return {
                    status: false,
                    statusCode: 404,
                    message: 'APPOINTMENT_NOT_FOUND',
                };
            }

            let { doctorId, patientName, date, time, duration, notes, patientId, slotIds, patientDetails } = data;

            // Update patient details if provided
            if (appointment.patient && patientDetails) {
                appointment.patient.first_name = patientDetails.firstName || appointment.patient.first_name;
                appointment.patient.middle_name = patientDetails.middleName || appointment.patient.middle_name;
                appointment.patient.last_name = patientDetails.lastName || appointment.patient.last_name;
                appointment.patient.mobile = patientDetails.mobile || appointment.patient.mobile;
                appointment.patient.id_number = patientDetails.nationalId || appointment.patient.id_number;
                appointment.patient.date_of_birth = patientDetails.dob || appointment.patient.date_of_birth;
                appointment.patient.gender = patientDetails.gender ? patientDetails.gender.toLowerCase() : appointment.patient.gender;
                appointment.patient.age = patientDetails.age || appointment.patient.age;
                appointment.patient.english_name = patientName || appointment.patient.english_name;
                await this.patientRepository.save(appointment.patient);
            }

            // Update appointment fields
            const start = new Date(`${date}T${time}`);
            const end = new Date(start.getTime() + duration * 60000);
            const toUTC = (d: Date) => new Date(d.getTime() - 2 * 60 * 60000);

            appointment.doctor_id = doctorId || appointment.doctor_id;
            appointment.patient_name = patientName || appointment.patient_name;
            appointment.english_name = patientName || appointment.english_name;
            
            // Update appointment fields from patient details if provided
            if (patientDetails) {
                appointment.first_name = patientDetails.firstName || appointment.first_name;
                appointment.middle_name = patientDetails.middleName || appointment.middle_name;
                appointment.last_name = patientDetails.lastName || appointment.last_name;
                appointment.mobile = patientDetails.mobile || appointment.mobile;
                appointment.id_number = patientDetails.nationalId || appointment.id_number;
                appointment.date_of_birth = patientDetails.dob || appointment.date_of_birth;
                appointment.gender = patientDetails.gender ? patientDetails.gender.toLowerCase() : appointment.gender;
                appointment.age = patientDetails.age || appointment.age;
                appointment.additional_phone = patientDetails.additionalPhone || appointment.additional_phone;
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
                status: true,
                statusCode: 200,
                message: 'APPOINTMENT_UPDATED_SUCCESS',
                data: appointment,
            };
        } catch (error) {
            console.error('Error updating appointment:', error);
            return {
                status: false,
                statusCode: 500,
                message: 'FAILED_TO_UPDATE_APPOINTMENT',
                error: error.message,
            };
        }
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
                return {
                    status: false,
                    statusCode: 404,
                    message: 'APPOINTMENT_NOT_FOUND',
                };
            }

            // Hard Delete as requested: Remove the record completely
            await this.appointmentRepository.delete(appointmentId);

            return {
                status: true,
                statusCode: 200,
                message: 'APPOINTMENT_DELETED_SUCCESS',
            };
        } catch (error) {
            console.error('Error deleting appointment:', error);
            return {
                status: false,
                statusCode: 500,
                message: 'FAILED_TO_DELETE_APPOINTMENT',
                error: error.message,
            };
        }
    }
}
