// whatsappController.js

import { processMessage } from "../nlp.js";
import { sendMessage } from "../services/twilioService.js";

let conversationState = {}; // Estado de la conversación para mantener contexto

// Función para manejar mensajes de WhatsApp
async function handleMessage(req, res) {
  console.log("holis");
  const incomingMessage = req.body.Body;
  const fromNumber = req.body.From;
  console.log("Mensaje recibido:", incomingMessage, "De:", fromNumber);

  // Procesar el mensaje para detectar la intención y entidades
  const result = await processMessage(incomingMessage);
  console.log("Intención detectada:", result.intent);
  console.log("Detalles:", result.entities);

  let responseMessage;

  // Manejar estados de la conversación
  if (conversationState.intent) {
    responseMessage = manageIntents(incomingMessage);
  } else {
    // Manejar diferentes intenciones
    responseMessage = detectIntent(result.intent);
  }
  sendMessage(fromNumber, responseMessage);
}

const manageIntents = (incomingMessage) => {
  let responseMessage;
  if (conversationState.intent === "bookAppointment") {
    // Si estamos en el estado de reserva de cita, esperamos una fecha válida
    const date = new Date(incomingMessage);

    if (isNaN(date.getTime())) {
      // Si la fecha no es válida, pedimos que intente nuevamente
      console.log("Formato de fecha inválido. Por favor, inténtelo de nuevo.");
      responseMessage =
        "Formato de fecha inválido. Por favor, inténtelo de nuevo.";
    } else {
      // Si la fecha es válida, confirmamos la reserva de la cita
      console.log("Fecha seleccionada:", date);
      responseMessage = `Ok, agendaré una cita para el ${date.toLocaleDateString(
        "es-AR"
      )}.`;
      // Limpiar el estado de la conversación
      conversationState = {};
    }
    return responseMessage;
  }
};
const detectIntent = (intent) => {
  let responseMessage;
  switch (intent) {
    case "bookAppointment":
      responseMessage = "¿Para qué fecha le gustaría agendar la cita?";
      conversationState.intent = "bookAppointment";
      break;
    case "cancelAppointment":
      responseMessage = "Lo siento, no puedo ayudar con la cancelación.";
      break;
    case "modifyAppointment":
      responseMessage = "Lo siento, no puedo ayudar con la modificación.";
      break;
    default:
      responseMessage = "Lo siento, no entendí tu mensaje.";
  }
  return responseMessage;
};

export { handleMessage };
