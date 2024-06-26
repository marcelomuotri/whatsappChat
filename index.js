// index.js

import express from "express";
import bodyParser from "body-parser";
import { handleMessage } from "./controllers/whatsapp.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS

app.get("/webhook", (req, res) => {
  console.log("GET request to /webhook");
  console.log(req.query);
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === "aplicacion123") {
    res.status(200).send(challenge);
  } else {
    console.log("error pavote");
    res.sendStatus(403);
  }
});

// Configure routes
app.post("/webhook", handleMessage);

// Start server
async function startServer() {
  //await trainModel(); // Train the model when starting the server
  app.listen(3000, () => {
    console.log("WhatsApp chatbot running on port 3000");
  });
}

// Start the server
startServer();
