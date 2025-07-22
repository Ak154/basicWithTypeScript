import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res
      .status(200)
      .json({ message: "Deck deleted successfully", success: true, deck });
  } catch (error) {
    res.status(500).json({ message: "Error in deck deletion", success: false });
  }
}
