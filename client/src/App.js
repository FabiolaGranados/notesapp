import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // Load notes from backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;

    const newNote = await addNote(input);
    if (newNote) setNotes([...notes, newNote]);
    setInput("");
  };

  const handleDelete = async (id) => {
    const success = await deleteNote(id);
    if (success) setNotes(notes.filter((note) => note.id !== id));
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

      {notes.length === 0 ? (
        <p className="no-notes">No notes yet!</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <span>{note.text}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
