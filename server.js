const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = 'AC6a160d92e75f2d4e085b51917eef8418'; // Tu Account SID de Twilio
const authToken = 'e0b13562bb393c1e8a4f6e1aa69c2957'; // Tu Auth Token de Twilio
const client = twilio(accountSid, authToken);

app.post('/whatsapp', (req, res) => {
    const incomingMessage = req.body.Body;
    const fromNumber = req.body.From;
    console.log(incomingMessage, fromNumber)

    let responseMessage;

    switch (incomingMessage.toLowerCase()) {
        case '1':
            responseMessage = 'Has elegido la opción 1';
            break;
        case '2':
            responseMessage = 'Has elegido la opción 2';
            break;
        default:
            responseMessage = 'Bienvenido, elige una opción:\n1. Opción 1\n2. Opción 2';
            break;
    }

    client.messages.create({
        from: 'whatsapp:+14155238886', // Número de WhatsApp de Twilio (sandbox)
        to: fromNumber,
        body: responseMessage
    }).then(message => console.log(message.sid))
      .catch(error => console.error(error));

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Chatbot de WhatsApp funcionando en puerto 3000');
});
