const BASE_URL = "https://notesapp-zxc3.onrender.com"; // deployed backend

// Get all notes
export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return await response.json();
  } catch (error) {
    console.error("Error getting notes:", error);
    return [];
  }
}

// Add a new note
export async function addNote(text) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error("Failed to add note");
    return await response.json();
  } catch (error) {
    console.error("Error adding note:", error);
    return null;
  }
}

// Delete a note by ID
export async function deleteNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete note");
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}




