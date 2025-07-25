import { API_URL } from "./config";
import type { TDeck } from "./getDeck";

export async function deleteCard(deckId:string, index: number) :Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
      method: "DELETE",
    });
    return response.json();
}