import React, { useEffect, useState } from "react";
import "./Deck.css";
import { getDecks, type TDeck } from "./api/getDecks";
import { createCard } from "./api/createCard";
import { deleteCard } from "./api/deleteCard";
import { useParams } from "react-router-dom";

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
    const newDeck = await deleteCard(deckId, index)
    setCards(newDeck.cards)
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
    <div className="Deck">
      <ul className="cards">
        {cards?.map((card, index) => (
          <li key={index}>
            <button onClick={()=> handleDeleteCard(index)} style={{ color: "white" }}>X</button>
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
        <button type="submit" style={{ backgroundColor: "#fff", boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" }}>create card</button>
      </form>
    </div>
  );
};

export default Deck;
