import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote } from "./api";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [dragging, setDragging] = useState(null);

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
    if (newNote) setNotes([...notes, { ...newNote, timestamp: new Date() }]);
    setInput("");
  };

  const handleDelete = async (id) => {
    const success = await deleteNote(id);
    if (success) setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDragStart = (index) => setDragging(index);

  const handleDragEnter = (index) => {
    if (dragging === null || dragging === index) return;
    const newNotes = [...notes];
    const moved = newNotes.splice(dragging, 1)[0];
    newNotes.splice(index, 0, moved);
    setDragging(index);
    setNotes(newNotes);
  };

  const handleDragEnd = () => setDragging(null);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      {notes.length === 0 ? (
        <p className="no-notes">No notes yet!</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li
              key={note.id}
              className="note-item"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            >
              <div className="note-top">
                <span className="note-text">{note.text}</span>
                <div className="note-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="timestamp">
                {note.timestamp ? formatDate(note.timestamp) : "Just now"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


