import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  // Load notes from backend when component mounts
  useEffect(() => {
    async function fetchNotes() {
      const data = await getNotes();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  // Add new note
  const handleAdd = async () => {
    if (!input.trim()) return; // ignore empty
    const newNote = await addNote(input);
    if (newNote) {
      setNotes([...notes, newNote]);
      setInput("");
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    const success = await deleteNote(id);
    if (success) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="app">
      <h1>My Notes App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="notes-container">
        {notes.length === 0 && <p>No notes yet.</p>}
        {notes.map((note) => (
          <div key={note.id} className="note">
            <span>{note.text}</span>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
