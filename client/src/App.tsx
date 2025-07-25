import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { createDeck } from "./api/createDeck";
import { getDecks } from "./api/getDeck";

export type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id != deckId));
  };

  useEffect(() => {
    (async () => {
      const newDeck = await getDecks();
      setDecks(newDeck);
    })();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        <ul className="decks">
          {decks.map((decks) => (
            <li key={decks._id}>
              <button
                onClick={() => {
                  handleDeleteDeck(decks._id);
                }}
                style={{ color: "white" }}
              >
                X
              </button>
              <Link to={`/decks/${decks._id}`}>{decks.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#fff",
              boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
            }}
          >
            add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
