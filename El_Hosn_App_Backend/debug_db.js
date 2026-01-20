const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres@localhost:5432/elhosn_database' });
client.connect().then(async () => {
    const res = await client.query("SELECT id, doctor_id, patient_name, appointment_date FROM opd_registration_model WHERE appointment_date::date = '2026-01-19' ORDER BY id DESC");
    console.log('--- ALL APPOINTMENTS FOR 2026-01-19 ---');
    console.log(JSON.stringify(res.rows, null, 2));

    const docs = await client.query("SELECT id, partner_id FROM doctor_model");
    console.log('--- ALL DOCTORS ---');
    console.log(JSON.stringify(docs.rows, null, 2));

    client.end();
}).catch(console.error);
