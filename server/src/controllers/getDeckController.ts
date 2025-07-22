import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
  try {
    const deck = await Deck.find({});
    res.status(200).json({
      message: "Data fetched successfully",
      success: true,
      data: deck,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in data fetching",
      success: false,
    });
  }
}