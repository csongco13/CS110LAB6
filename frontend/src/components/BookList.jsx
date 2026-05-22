function BookList({ books, API_URL, loadBooks, setEditingBook }) {
  async function deleteBook(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    loadBooks();
  }

  function showStars(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }

    return stars;
  }

  return (
    <div>
      {books.map((book) => (
        <div key={book._id} className="book-card">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Genre: {book.genre}</p>
          <p>Rating: {showStars(book.rating)}</p>

          <button onClick={() => setEditingBook(book)}>
            Edit
          </button>

          <button onClick={() => deleteBook(book._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookList;