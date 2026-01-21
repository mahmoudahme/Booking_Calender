const { Client } = require('pg');
require('dotenv').config();

async function getDoctorSchedule(doctorId, date) {
    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });

    try {
        await client.connect();
        console.log('✅ Connected to database');

        const dateObj = new Date(date);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[dateObj.getDay()];

        console.log(`\n🔍 Checking Schedule for Doctor ID: ${doctorId}`);
        console.log(`📅 Date: ${date} (${dayName})`);

        // 1. Get Slots (simulating this.subtimeRepository.find)
        console.log(`\n1️⃣ Fetching Slots from subtime_model...`);
        const slotsRes = await client.query(`
            SELECT id, subtime, day 
            FROM subtime_model 
            WHERE doctor_id = $1 AND day = $2 
            ORDER BY id ASC
        `, [doctorId, dayName]);

        const slots = slotsRes.rows;
        console.log(`   Found ${slots.length} slots.`);

        // 2. Get Bookings (simulating this.appointmentRepository.find)
        console.log(`\n2️⃣ Fetching Bookings from opd_registration_model...`);
        const bookedSlotsRes = await client.query(`
            SELECT subtime 
            FROM opd_registration_model 
            WHERE doctor_id = $1 AND search_date = $2
        `, [doctorId, date]);

        const bookedSlots = bookedSlotsRes.rows;
        console.log(`   Found ${bookedSlots.length} bookings.`);

        // 3. Logic to Determine Availability
        console.log(`\n3️⃣ Applying Availability Logic...`);
        const bookedSlotIds = new Set(bookedSlots.map(booking => booking.subtime));

        const slotsWithBookingStatus = slots.map(slot => ({
            id: slot.id,
            subtime: slot.subtime,
            day: slot.day,
            available: !bookedSlotIds.has(slot.id), // The Core Logic
        }));

        // 4. Output Result
        console.log(`\n📊 Final Result (What Frontend Will Receive):`);
        console.log('------------------------------------------------');
        console.log(JSON.stringify({
            status: true,
            statusCode: 200,
            message: 'DATA_RETRIEVED_SUCCESS',
            data: {
                slots: slotsWithBookingStatus
            }
        }, null, 2));
        console.log('------------------------------------------------');

        // Summary
        const availableCount = slotsWithBookingStatus.filter(s => s.available).length;
        const bookedCount = slotsWithBookingStatus.filter(s => !s.available).length;
        console.log(`\n📈 Summary:`);
        console.log(`   ✅ Available: ${availableCount}`);
        console.log(`   ❌ Booked:    ${bookedCount}`);
        console.log(`   Total:       ${slotsWithBookingStatus.length}`);

        if (slotsWithBookingStatus.length === 0) {
            console.log(`\n⚠️ WARNING: No slots found! Check if Doctor ${doctorId} has slots for ${dayName} in subtime_model.`);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.end();
    }
}

// Check for Doctor 47 on Today's Date
const today = new Date().toISOString().split('T')[0];
getDoctorSchedule(47, today);
