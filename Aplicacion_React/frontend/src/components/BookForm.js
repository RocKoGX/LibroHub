import React, { useState } from 'react';
import axios from 'axios';

function BookForm({ fetchBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const addBook = async () => {
    await axios.post('http://localhost:5000/books', {
      title,
      author,
      published_year: year,
    });
    fetchBooks();
  };

  return (
    <div>
      <h2>Agregar Libro</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={addBook}>Agregar</button>
    </div>
  );
}

export default BookForm;
