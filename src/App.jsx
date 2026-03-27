import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes from backend
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Add a new note
  const addNote = () => {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(newNote => setNotes([...notes, newNote]));

    setTitle("");
    setContent("");
  };

  // Delete a note
  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" })
      .then(() => setNotes(notes.filter(n => n.id !== id)));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}:</strong> {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

