// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [
    { name: "Charlie", job: "Janitor", id: "xyz789" },
    { name: "Mac", job: "Bouncer", id: "abc123" },
    { name: "Mac", job: "Professor", id: "ppp222" },
    { name: "Dee", job: "Aspring actress", id: "yat999" },
    { name: "Dennnynynyny", job: "Bartender", id: "zap555" },
  ],
};

const genId = () => Math.random().toString(36).slice(2, 8);

app.get("/", (_req, res) => res.send("Hello World!"));

app.get("/users", (req, res) => {
  const { name } = req.query;
  if (name) {
    const result = users.users_list.filter((u) => u.name === name);
    return res.json({ users_list: result });
  }
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.users_list.find((u) => u.id === req.params.id);
  return user ? res.json(user) : res.status(404).send("Resource not found.");
});

// POST
app.post("/users", (req, res) => {
  const user = {
    id: req.body.id ?? genId(),
    name: req.body.name,
    job: req.body.job,
  };
  users.users_list.push(user);
  res.status(201).json(user);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const idx = users.users_list.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).send("Resource not found.");
  users.users_list.splice(idx, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
