const Book = require("../models/Book");

async function getBooks(req, res) {
  const books = await Book.find();
  res.json(books);
}

async function createBook(req, res) {
  const newBook = await Book.create(req.body);
  res.json(newBook);
}

async function updateBook(req, res) {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
        new: true
    }
  );

  res.json(updatedBook);
}

async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ 
    message: "Book deleted"
});
}

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};