import React, { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/decks");
      const data = await response.json();
      setDecks(data.data);
    })();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((decks) => (
          <li key={decks._id}>{decks.title}</li>
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
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default App;
