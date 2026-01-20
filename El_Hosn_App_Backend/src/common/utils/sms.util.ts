import axios from 'axios';
import twilio from 'twilio';

/**
 * Sends an OTP SMS using Textbelt service.
 * @param phone The phone number to send the SMS to (e.g., '5555555555').
 * @param message The message content (e.g., 'Your OTP is 1234').
 * @param key The API key for Textbelt (default is 'textbelt' for testing).
 * @returns The response from the SMS service.
 */
export async function sendOtpSms(phone: string, message: string): Promise<any> {
    try {
        const params = new URLSearchParams();
        params.append('api_key', process.env.MORA_SMS_API_KEY);
        params.append('username', process.env.MORA_SMS_USERNAME);
        params.append('message', message);
        params.append('sender', 'Hosn Clin');
        params.append('numbers', phone);
        params.append('return', 'json');

        const response = await axios.post('https://mora-sa.com/api/v1/sendsms', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('SMS Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send SMS');
    }
}


function generateOtpCode(length: number = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
}

export async function sendOtpSmsViaTwilio(phone: string, otpMessage: string) {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID!;
        const authToken = process.env.TWILIO_AUTH_TOKEN!;
        const fromPhone = process.env.TWILIO_PHONE_NUMBER!; // ✅ استخدم الرقم

        const client = twilio(accountSid, authToken);

        const customMessage = otpMessage.trim();

        const message = await client.messages.create({
            body: customMessage,
            from: fromPhone, // ✅ بدل messagingServiceSid
            to: phone,
        });

        return {
            sid: message.sid,
            status: message.status
        };
    } catch (error: any) {
        console.error('❌ SMS Error:', error.message);
        throw new Error('Failed to send custom SMS');
    }
}