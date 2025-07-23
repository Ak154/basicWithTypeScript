import { Request, Response } from "express";
import Deck from "../models/Deck"

export async function getDecksController(req: Request, res: Response) {
    try {
        const { deckId } = req.params;
        const deck = await Deck.findById(deckId);
        if(!deck){
            res.status(404).json({ message: "Deck not found", success: false })
            return ;
        }

        res.status(200).json({ message: "Deck found", success: true, deck });
    } catch (error) {
        res.status(500).json({ message: "Error in get deck by id", success: false })
    }
}