import { API_URL } from "./config";

export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`);
    const data = await response.json();
    return await data.data;
}