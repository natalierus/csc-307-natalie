// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:3000/users").then((r) => r.json());
  }

  function postUser(person) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    }).then((r) => r.json());
  }

  function updateList(person) {
    postUser(person).then((createdUser) =>
      setCharacters((prev) => [...prev, createdUser])
    );
  }

  function removeOneCharacter(index) {
    const user = characters[index];
    if (!user) return;

    fetch(`http://localhost:3000/users/${user.id}`, { method: "DELETE" }).then(
      () => setCharacters((prev) => prev.filter((_, i) => i !== index))
    );
  }

  useEffect(() => {
    fetchUsers().then((json) => setCharacters(json.users_list || []));
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
