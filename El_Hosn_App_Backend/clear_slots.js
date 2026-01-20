const { Client } = require('pg');

async function clearSlots() {
    const config = {
        host: '72.62.16.223',
        port: 5432,
        user: 'odoo',
        password: 'odoo', // This is a string literal
        database: 'Hosn'
    };

    const client = new Client(config);
    try {
        await client.connect();
        console.log('Connected to database successfully.');

        // Using TRUNCATE with CASCADE to handle any potential foreign key constraints
        // especially since opd_registration_model might refer to these slots.
        const res = await client.query('TRUNCATE TABLE subtime_model RESTART IDENTITY CASCADE');
        console.log('Successfully cleared all records from subtime_model.');

    } catch (err) {
        console.error('Error occurred while clearing slots:', err);
    } finally {
        await client.end();
    }
}

clearSlots();
