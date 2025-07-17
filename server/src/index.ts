import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "./config/dbConfig";
import Deck from "./models/Deck";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  const deck = await Deck.find({});

  res
    .status(200)
    .json({ message: "Data fetched successfully", success: false, data: deck });
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createDeck = await newDeck.save();
  res.json(createDeck);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.delete("/decks/:deckId", async(req: Request, res: Response)=>{
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck)
})

const port = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
