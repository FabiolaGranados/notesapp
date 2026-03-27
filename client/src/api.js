const BASE_URL = "http://localhost:5000";

export const getNotes = async () => {
  const res = await fetch(`${BASE_URL}/notes`);
  return res.json();
};

export const addNote = async (text) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
};

export const deleteNote = async (id) => {
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
};





