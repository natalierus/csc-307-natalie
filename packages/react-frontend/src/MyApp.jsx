// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

 function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
      return res.json(); // <-- get the server's created object (with id)
    })
    .then((createdUser) => setCharacters((prev) => [...prev, createdUser]))
    .catch((error) => {
      console.log(error);
      alert("Failed to add user.");
    });
}

  function removeOneCharacter(index) {
  const user = characters[index];
  if (!user) return;

  fetch(`http://localhost:8000/users/${encodeURIComponent(user.id)}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        setCharacters((prev) => prev.filter((_, i) => i !== index));
      } else if (res.status === 404) {
        alert("User not found on server.");
      } else {
        throw new Error(`Unexpected status ${res.status}`);
      }
    })
    .catch((e) => {
      console.log(e);
      alert("Failed to delete user.");
    });
}

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
   <Form handleSubmit={updateList} />
  </div>
);
}
export default MyApp;