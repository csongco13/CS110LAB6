import { useEffect, useState } from "react";

function BookForm({
  API_URL,
  loadBooks,
  editingBook,
  setEditingBook
}) {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    genre: "",
    rating: 1
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        isbn: editingBook.isbn || "",
        title: editingBook.title || "",
        author: editingBook.author || "",
        genre: editingBook.genre || "",
        rating: editingBook.rating || 1
      });
    }
  }, [editingBook]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editingBook) {
      await fetch(`${API_URL}/${editingBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      setEditingBook(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    }

    setFormData({
      isbn: "",
      title: "",
      author: "",
      genre: "",
      rating: 1
    });

    loadBooks();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>

      <button type="submit">
        {editingBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;