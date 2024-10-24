import React from 'react';
import axios from 'axios';

function BookList({ books, fetchBooks }) {
  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} ({book.published_year})
            <button onClick={() => deleteBook(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
