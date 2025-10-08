// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    { name: "Charlie",        job: "Janitor",          id: "xyz789" },
    { name: "Mac",            job: "Bouncer",          id: "abc123" },
    { name: "Mac",            job: "Professor",        id: "ppp222" },
    { name: "Dee",            job: "Aspring actress",  id: "yat999" },
    { name: "Dennnynynyny",   job: "Bartender",        id: "zap555" }
  ]
};

app.use(express.json());
app.use(cors());

// simple id generator (short, random)
const genId = () => Math.random().toString(36).slice(2, 8);

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// helper: delete by id
const deleteUserById = (id) => {
  const idx = users.users_list.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.users_list.splice(idx, 1);
  return true;
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = deleteUserById(id);
  if (!deleted) return res.status(404).send("Resource not found.");
  return res.status(204).send(); // no content on success
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;   // expects JSON: { id?, name, job }
  if (!userToAdd.id) {
    userToAdd.id = genId();     // auto-generate id if missing
  }
  const created = addUser(userToAdd);
  res.status(201).json(created);  // <-- 201 Created + return the created object
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; // or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
