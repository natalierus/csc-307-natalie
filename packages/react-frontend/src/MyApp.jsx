// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
const [characters, setCharacters] = useState([
    {
      name: "Riley",
      job: "Minion",
      age: "20"
    },
    {
    name: "Jess",
    job: "Minion",
    age: "23"
  },
  {
    name: "Tillie",
    job: "Minion",
    age:"21"
  },
  {
    name: "Katie",
    job: "Minion",
    age: "22"
  },
  {
    name: "Ciara",
    job: "Minion",
    age: "28"
  }
  ]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  </div>
);
}
export default MyApp;