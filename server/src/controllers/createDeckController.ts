import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
  try {
    const newDeck = new Deck({
      title: req.body.title,
    });
    const createDeck = await newDeck.save();
    res.status(201).json({ message: "New deck created", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating deck", success: false });
  }
}
