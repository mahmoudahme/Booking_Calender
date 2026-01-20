const { Client } = require('pg');
require('dotenv').config();

async function checkTime() {
    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    await client.connect();

    console.log('--- DB Config ---');
    try {
        const tz = await client.query('SHOW TIMEZONE');
        console.log('Postgres Timezone:', tz.rows[0].TimeZone);
    } catch (e) {
        console.log('Could not get timezone');
    }

    console.log('\n--- Recent Appointments (JSON) ---');
    const res = await client.query(`
        SELECT id, patient_name, appointment_date, search_date, subtime 
        FROM opd_registration_model 
        ORDER BY id DESC 
        LIMIT 5
    `);
    console.log(JSON.stringify(res.rows, null, 2));

    console.log('\n--- System Time ---');
    console.log('Node.js Time:', new Date().toString());
    console.log('Node.js ISO:', new Date().toISOString());

    await client.end();
}

checkTime();
