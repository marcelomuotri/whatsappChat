import twilio from 'twilio';

const accountSid = 'AC6a160d92e75f2d4e085b51917eef8418'; // Tu Twilio Account SID
const authToken = 'e0b13562bb393c1e8a4f6e1aa69c2957'; // Tu Twilio Auth Token
const whatsappNumber = 'whatsapp:+14155238886';
const client = twilio(accountSid, authToken);



export async function sendMessage(to, body) {
    try {
        const message = await client.messages.create({
            from: whatsappNumber,
            to,
            body
        });
        console.log('Response sent:', message.sid);
    } catch (error) {
        console.error('Error sending response:', error);
    }
}