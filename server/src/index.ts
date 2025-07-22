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

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", getDeckController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController)
app.post("/decks/:deckId/cards", createCardDeckController)


app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
