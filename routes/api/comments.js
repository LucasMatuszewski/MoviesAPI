const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get models
const Movies = require('../../models/Movies');

// @route   GET /comments
// @route   GET /comments/movieId (optional)
// @desc    Get comments from DB
// @access  Public
router.get('/:movieId?', (req, res) => {
  Movies.find(
    req.params.movieId ? { _id: req.params.movieId } : null,
    'comments',
    null
  )
    .sort({ date: -1 }) // https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ noMoviesFound: 'No comments found' }));
});

// @route   POST /comments
// @desc    Add new comment to a movie
// @access  Public
router.post('/', (req, res) => {
  // VALIDATION - 'movieId' and 'text' are required
  if (!req.body.movieId || !req.body.text) {
    return res
      .status(400)
      .json({ commentError: 'MovieId and Text fields are required' });
  }

  Movies.findById(req.body.movieId)
    .then(movie => {
      const newComment = {
        text: req.body.text,
        userName: req.body.userName
      };
      // Add to comments array (on the beginning)
      movie.comments.unshift(newComment);
      movie.commentsCount++;
      movie
        .save()
        .then(movie => res.json(movie.comments[0]))
        .catch(err =>
          res.status(404).json({
            dbError: "Can't save to a data base",
            error: err
          })
        );
    })
    .catch(err =>
      res.status(404).json({
        noMovie: 'No movie found with that ID',
        error: err
      })
    );
});

module.exports = router;
