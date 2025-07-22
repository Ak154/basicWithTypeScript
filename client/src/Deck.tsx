import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { createDeck } from "./api/createDeck";
import { getDecks, type TDeck } from "./api/getDeck";
import { createCard } from "./api/createCard";

const Deck = () => {
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

  // const handleDeleteDeck = async (deckId: string) => {
  //   await deleteDeck(deckId)
  //   setDecks(decks.filter((deck)=> deck._id != deckId));
  // };

  // useEffect(() => {
  //   (async () => {
  //     const newDeck = await getDecks()
  //     setDecks(newDeck);
  //   })();
  // }, []);

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>{card}</li>
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
