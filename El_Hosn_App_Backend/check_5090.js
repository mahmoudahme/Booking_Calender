const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres@localhost:5432/elhosn_database' });
client.connect().then(async () => {
    const res = await client.query("SELECT * FROM opd_registration_model WHERE id = 5090");
    console.log('--- DETAILS FOR ID 5090 ---');
    console.log(JSON.stringify(res.rows[0], null, 2));
    client.end();
}).catch(console.error);
