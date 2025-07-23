import { Request, Response} from 'express'
import Deck from "../models/Deck"

export async function deleteCardOnDeckController(req: Request, res: Response){
    try {
        const deckId = req.params.deckId
        const index = req.params.index
        const deck = await Deck.findById(deckId);
        if(!deck) {
            res.status(400).json({ message: "No deck of this id exist", success: false})
            return;
        }
        deck.cards.splice(parseInt(index), 1)
        await deck.save()

        res.json(deck);
    } catch (error) {
        res.status(500).json({ message: "Error in card deletion", success: false })
    }
}