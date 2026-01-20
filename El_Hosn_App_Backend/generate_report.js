const { Client } = require('pg');
const fs = require('fs');

async function dumpData() {
    // Using credentials from .env
    const config = {
        host: '72.62.16.223',
        port: 5432,
        user: 'odoo',
        password: 'odoo',
        database: 'Hosn'
    };

    const client = new Client(config);
    try {
        await client.connect();
        console.log('Connected to database');

        // 1. Get all Doctors
        const doctorsRes = await client.query(`
            SELECT d.id, p.name 
            FROM doctor_model d 
            JOIN res_partner p ON d.partner_id = p.id
        `);
        const doctors = doctorsRes.rows;

        // 2. Get all Appointments
        const appointmentsRes = await client.query(`
            SELECT 
                a.id, 
                a.doctor_id, 
                a.patient_name, 
                a.appointment_date, 
                a.search_date
            FROM opd_registration_model a
            ORDER BY a.id DESC
            LIMIT 100
        `);
        const appointments = appointmentsRes.rows;

        // 3. Mapping
        let html = `
        <html>
        <head>
            <style>
                body { font-family: sans-serif; padding: 20px; background: #f4f4f9; }
                header { background: #2c3e50; color: white; padding: 10px 20px; border-radius: 8px; margin-bottom: 20px; }
                .doctor-section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                th { background: #f8f9fa; }
                .no-data { color: #999; font-style: italic; }
            </style>
        </head>
        <body>
            <header><h1>Doctor & Appointments Linkage Report</h1></header>
        `;

        doctors.forEach(doc => {
            const docApps = appointments.filter(app => app.doctor_id === doc.id);
            html += `
            <div class="doctor-section">
                <h2>Doctor: ${doc.name} (ID: ${doc.id})</h2>
                ${docApps.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>App ID</th>
                            <th>Patient Name</th>
                            <th>App Date</th>
                            <th>Search Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${docApps.map(app => `
                        <tr>
                            <td>${app.id}</td>
                            <td>${app.patient_name}</td>
                            <td>${app.appointment_date}</td>
                            <td>${app.search_date}</td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
                ` : '<p class="no-data">No appointments found for this doctor in last 100 records.</p>'}
            </div>
            `;
        });

        html += '</body></html>';

        fs.writeFileSync('doctors_report.html', html);
        console.log('Successfully created doctors_report.html');

    } catch (err) {
        console.error('Error dumping data:', err);
    } finally {
        await client.end();
    }
}

dumpData();
