const { Client } = require('pg');
require('dotenv').config();

async function checkSlots() {
    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    await client.connect();

    console.log('--- Slots check ---');
    const res = await client.query(`
        SELECT id, subtime, day 
        FROM subtime_model 
        WHERE subtime LIKE '12:%' OR subtime LIKE '14:%' 
        ORDER BY subtime, day 
        LIMIT 50
    `);
    console.table(res.rows);

    await client.end();
}

checkSlots();
