import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { createDeck } from "./api/createDeck";
import { getDecks, type TDeck } from "./api/getDecks";
import { createCard } from "./api/createCard";
import { deleteCard } from "./api/deleteCard";

const Deck = () => {

  const [deck, setDeck] = useState<TDeck | undefined>()
  const { deckId } = useParams();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createCard(deckId!, text);
    const serverCards = response.cards ?? [];
    setCards(serverCards);
    setText("");
  };

  const handleDeleteCard = async (index:number) => {
    if(!deckId) return;
    await deleteCard(deckId, index)
    setCards([...cards].splice(index, 1))
  };

  useEffect(() => {
    (async () => {
      if(!deckId) return;
      const newDeck = await getDecks(deckId)
      setDeck(newDeck);
      setCards(newDeck.cards ?? []);;
    })();
  }, [deckId]);

  return (
    <div className="App">
      <ul className="decks">
        {cards?.map((card, index) => (
          <li key={index}>
            <button onClick={()=> handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card-text">Card Text</label>
        <input
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">create card</button>
      </form>
    </div>
  );
};

export default Deck;
