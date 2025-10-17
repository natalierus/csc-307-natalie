// backend.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js"; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const { name, job } = req.query;
  const users = await userService.getUsers(name, job);
  res.json({ users_list: users });
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  const users = await userService.getUsers(name, job);
  res.json({ users_list: users });
});

app.get("/users/:id", async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  if (!user) res.status(404).send("Not found");
  else res.json(user);
});

app.post("/users", async (req, res) => {
  const created = await userService.addUser({
    name: req.body.name,
    job: req.body.job,
  });
  res.status(201).json(created);
});

// Delete
app.delete("/users/:id", async (req, res) => {
  const deleted = await userService.deleteUserById(req.params.id);
  if (!deleted) res.status(404).send("Not found");
  else res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
