const { Client } = require('pg');
const fs = require('fs');

async function dumpData() {
    const client = new Client({ connectionString: 'postgresql://postgres@localhost:5432/elhosn_database' });
    try {
        await client.connect();

        // 1. Get all Doctors
        const doctorsRes = await client.query(`
            SELECT d.id, p.name 
            FROM doctor_model d 
            JOIN res_partner p ON d.partner_id = p.id
        `);
        const doctors = doctorsRes.rows;

        // 2. Get all Appointments for today/future to keep it relevant
        const appointmentsRes = await client.query(`
            SELECT 
                a.id, 
                a.doctor_id, 
                a.patient_name, 
                a.appointment_date, 
                a.search_date,
                a.create_date
            FROM opd_registration_model a
            ORDER BY a.appointment_date ASC
        `);
        const appointments = appointmentsRes.rows;

        // 3. Grouping
        const report = doctors.map(doc => {
            const docAppointments = appointments.filter(app => app.doctor_id === doc.id);
            return {
                doctorId: doc.id,
                doctorName: doc.name,
                appointmentCount: docAppointments.length,
                appointments: docAppointments.map(app => ({
                    id: app.id,
                    patient: app.patient_name,
                    date: app.appointment_date,
                    searchDate: app.search_date,
                    rawDoctorId: app.doctor_id
                }))
            };
        });

        const output = {
            summary: {
                totalDoctors: doctors.length,
                totalAppointments: appointments.length,
                orphanedAppointments: appointments.filter(app => !doctors.find(d => d.id === app.doctor_id)).length
            },
            data: report
        };

        fs.writeFileSync('doctor_appointments_debug.json', JSON.stringify(output, null, 2));
        console.log('Successfully created doctor_appointments_debug.json');

    } catch (err) {
        console.error('Error dumping data:', err);
    } finally {
        await client.end();
    }
}

dumpData();
