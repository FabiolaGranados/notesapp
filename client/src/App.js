import React, { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = () => {
    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(newNote => setNotes([...notes, newNote]));
    setTitle('');
    setContent('');
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' })
      .then(() => setNotes(notes.filter(note => note.id !== id)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Notes</h1>
      <input 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
      />
      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
