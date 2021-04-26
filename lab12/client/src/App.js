import React from "react";
import axios from "axios";
import "./App.css";

const API_SERVER_URL = "http://localhost:45030";

const useBooks = () => {
  const [books, setBooks] = React.useState([]);

  const doFetch = async () => {
    const response = await axios.get(`${API_SERVER_URL}/books`);
    setBooks(response.data);
  };

  const fetchBooks = () => {
    doFetch();
  };

  React.useEffect(fetchBooks, []);

  return {
    books: books.filter((book) => book.ISBN != null),
    setBooks,
    refetchBooks: doFetch,
  };
};

const useNewBookState = () => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isbn, setIsbn] = React.useState("");

  return {
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    isbn,
    setIsbn,
  };
};

const createBook = ({ title, author, ISBN, description }) =>
  axios.put(`${API_SERVER_URL}/books/${ISBN}`, {
    title,
    author,
    description,
    ISBN,
  });

const deleteBook = (isbn) => axios.delete(`${API_SERVER_URL}/books/${isbn}`);

const App = () => {
  const { books, setBooks, refetchBooks } = useBooks();

  const {
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    isbn,
    setIsbn,
  } = useNewBookState();

  const createBookAndReset = async () => {
    await createBook({ title, author, ISBN: isbn, description });

    setTitle("");
    setAuthor("");
    setDescription("");
    setIsbn("");

    await refetchBooks();
  };

  const onDeleteBook = async (isbn) => {
    await deleteBook(isbn);

    const updatedBooks = books.filter((book) => book.ISBN != isbn);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <header className="App-header">Chris's Sophisticated Book App</header>

      <h3>Books in Database:</h3>
      <ul>
        {books.map((book) => (
          <li style={{ textAlign: "left" }}>
            <button
              style={{ background: "red", color: "black", marginRight: 10 }}
              onClick={() => onDeleteBook(book.ISBN)}
            >
              Delete
            </button>
            {book.title} - {book.author} - {book.ISBN}
          </li>
        ))}
      </ul>

      <h3> Add a New Book</h3>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label>ISBN</label>
          <input
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />
        </div>
      </div>

      <button onClick={createBookAndReset}>+ Create</button>
    </div>
  );
};

export default App;
