import { useEffect, useState } from "react";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";
import "./components/App.css";

function App() {
  const API_URL = "http://localhost:5000/api/books";

  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadBooks() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Could not load books.");
        return;
      }

      setBooks(data);
    } catch (error) {
      setErrorMessage("Could not connect to backend. Make sure the backend is running.");
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="container">
      <h1>Book Management App</h1>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <BookForm
        API_URL={API_URL}
        loadBooks={loadBooks}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
        setErrorMessage={setErrorMessage}
      />

      <BookList
        books={books}
        API_URL={API_URL}
        loadBooks={loadBooks}
        setEditingBook={setEditingBook}
      />
    </div>
  );
}

export default App;