import { API_URL } from "./config";
import type { TDeck } from "./getDeck";

export async function createCard( deckId:string, text: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return await data.deck;
}