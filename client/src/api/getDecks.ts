import { API_URL } from "./config";
import { type TDeck } from "./getDeck"

export async function getDecks(deckId: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}`)
    return response.json()
}