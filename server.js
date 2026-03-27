import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON

let notes = []; // in-memory storage

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add note
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
