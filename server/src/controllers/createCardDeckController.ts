// src/controllers/createCardDeckController.ts
import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardDeckController(
  req: Request<{ deckId: string }, any, { text: string }>, 
  res: Response
) {
  try {
    const deckId = req.params.deckId;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      res.status(400).json({ message: "Invalid card text" });
      return;
    }

    const deck = await Deck.findById(deckId);
    if (!deck) {
      res.status(404).json({ message: "Deck not found" });
      return;
    }

    deck.cards.push(text);
    await deck.save();

    res.status(201).json({ message: "Card added", success: true, deck });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    return;
  }
}