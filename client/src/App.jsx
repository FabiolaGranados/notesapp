import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleAdd = async () => {
    if (!input) return;

    const newNote = await addNote(input);

    setNotes([...notes, newNote]);
    setInput("");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <h1>Notes App</h1>

      <div className="input-container">
        <input
          value={input}
          placeholder="Write a note..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => handleDelete(note.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
