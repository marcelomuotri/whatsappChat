// nlpManager.js

import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['es'] });

// Add training data for intent analysis
manager.addDocument('es', 'Quiero reservar una cita', 'bookAppointment');
manager.addDocument('es', 'Cancelar cita', 'cancelAppointment');
manager.addDocument('es', 'Modificar cita', 'modifyAppointment');
// Add more training examples as needed

// Train the model
async function trainModel() {
  await manager.train();
  console.log('Model trained successfully');
}

// Process a message and detect the intent
async function processMessage(message) {
  const response = await manager.process('es', message);
  return { intent: response.intent, entities: response.entities };
}

export { trainModel, processMessage };
