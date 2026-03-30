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
    setNotes(data.map(note => ({ ...note, column: "To Do" }))); 
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    const newNote = await addNote(input);
    if (newNote) setNotes([...notes, { ...newNote, column: "To Do" }]);
    setInput("");
  };

  const handleDelete = async (id) => {
    const success = await deleteNote(id);
    if (success) setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDragStart = (index) => setDragging(index);

  const handleDrop = (column) => {
    if (dragging === null) return;
    const newNotes = [...notes];
    newNotes[dragging].column = column;
    setNotes(newNotes);
    setDragging(null);
  };

  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="app">
      <h1>My Notes Board</h1>

      <div className="input-container">
        <input
          value={input}
          placeholder="Write a note..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <div className="board">
        {columns.map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col)}
          >
            <h2>{col}</h2>
            {notes
              .filter(note => note.column === col)
              .map((note, index) => (
              <div
                key={note.id}
                className="note-item"
                draggable
                onDragStart={() => handleDragStart(notes.findIndex(n => n.id === note.id))}
              >
                <span className="note-text">{note.text}</span>
                <button className="delete-btn" onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


