// controllers/whatsapp.js

import axios from "axios";

export async function handleMessage(req, res) {
  console.log("holiii");
  const body = req.body;

  if (body.object === "whatsapp_business_account") {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from; // El número de teléfono del remitente
      const msg_body = message.text.body; // El contenido del mensaje

      console.log(`Mensaje recibido de ${from}: ${msg_body}`);

      // Aquí puedes procesar el mensaje y enviar una respuesta
      // Por ejemplo, puedes usar axios para enviar una respuesta a través de la API de WhatsApp Business

      const responseMessage = {
        messaging_product: "whatsapp",
        to: from,
        text: { body: "Hola, este es un mensaje automático de respuesta." },
      };

      await axios.post(
        `https://graph.facebook.com/v12.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        responseMessage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          },
        }
      );

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
}
