import { Client } from 'pg';

async function testSync() {
    const client = new Client({
        host: '72.62.16.223',
        port: 5432,
        user: 'odoo',
        password: 'odoo',
        database: 'Hosn',
    });

    try {
        await client.connect();
        console.log('--- CONNECTED TO DATABASE ---');

        // 1. List all slots for Dr. 46 on Tuesday
        const res = await client.query(`
            SELECT id, subtime, day 
            FROM subtime_model 
            WHERE doctor_id = 46 AND day = 'Tuesday'
            ORDER BY subtime ASC
        `);

        console.log('\n--- SLOTS FOR DR 46 TUESDAY ---');
        console.log(JSON.stringify(res.rows, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

testSync();
