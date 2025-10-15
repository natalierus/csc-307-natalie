import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import {
  getAllUsers,
  getUsersByName,
  getUsersByJob,
  getUsersByNameAndJob,
  getUserById,
  deleteUserById,
} from "./services/user-services.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let q;
  if (name && job) {
    q = getUsersByNameAndJob(name, job); // both
  } else if (name) {
    q = getUsersByName(name);            // name only
  } else if (job) {
    q = getUsersByJob(job);              // job only
  } else {
    q = getAllUsers();                   // no filters -> all
  }

  q.then(docs => res.json(docs))
   .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/users/:id", (req, res) => {
  getUserById(req.params.id)
    .then(doc => doc ? res.json(doc) : res.status(404).json({ error: "Not found" }))
    .catch(err => res.status(400).json({ error: err.message }));
});


app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  deleteUserById(id)
    .then(doc => {
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json({ deleted: true, id: doc._id });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});


const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`API running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connect failed:", err.message);
    process.exit(1);
  });
