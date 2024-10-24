const express = require('express');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todos los libros
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Ruta para agregar un libro
app.post('/books', (req, res) => {
  const { title, author, published_year } = req.body;
  db.query('INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)',
    [title, author, published_year],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'Book added', id: results.insertId });
    });
});

// Ruta para actualizar un libro
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  db.query('UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?',
    [title, author, published_year, id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ message: 'Book updated' });
    });
});

// Ruta para eliminar un libro
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Book deleted' });
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
