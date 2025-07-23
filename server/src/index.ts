import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "./config/dbConfig";
import Deck from "./models/Deck";
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardDeckController } from "./controllers/createCardDeckController";
import { getDecksController } from "./controllers/getDecksController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", getDeckController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId", getDecksController);
app.post("/decks/:deckId/cards", createCardDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);


app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
