const express = require('express');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// API Routes
const movies = require('./routes/api/movies');
// const comments = require('./routes/api/comments');

const server = express();

// Body parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// API ROUTES:
server.use('/movies', movies);
// server.use('/comments', comments);

server.get('*', (req, res) => {
  res
    .status(404)
    .send('<h1>ERROR 404 - Not Found</h1><p>Sorry, we cannot find that!</p>');
});

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
});
