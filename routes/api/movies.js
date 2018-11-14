const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const { omdbApiKey } = require('../../config/keys');

// Get models
const Movies = require('../../models/Movies');

// @route   GET /movies
// @desc    Get all movies from DB
// @access  Public
router.get('/', (req, res) => {
  /***
   * TODO: Filtering / sorting
   */
  Movies.find()
    .sort({ date: -1 }) // https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ noMoviesFound: 'No movies found' }));
});

// @route   POST /movies
// @desc    Create a new movie
// @access  Public
router.post('/', (req, res) => {
  // VALIDATION - title is required
  if (!req.body.title) {
    return res
      .status(400)
      .json({ titleError: 'Title of the movie is required' });
  }

  // GET data from IMDB API
  const apiUrl = `http://www.omdbapi.com/?t=${
    req.body.title
  }&apikey=${omdbApiKey}`;

  axios
    .get(apiUrl)
    .then(response => {
      const newMovie = new Movies({
        title: response.data.Title,
        year: response.data.Year,
        runtime: response.data.Runtime,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        country: response.data.Country,
        ratings: response.data.Ratings,
        // Other schema with MONGOOSE MAPS:
        // ratings: {
        //   rottenTomatoes: "54%",
        //   xxx: "10/10"
        // }
        imdbRating: response.data.imdbRating,
        imdbID: response.data.imdbID
      });
      // Save Movie to DB and send Json response
      newMovie
        .save()
        .then(movie => res.json(movie))
        .catch(err => {
          console.error(err);
          return res.status(400).json({ dbError: err });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ apiError: err });
    });

  // CAN I use new async/await here ???:
  /* try {
    const resApi = await axios.get('apiUrl');
    console.log(resApi);
    return res.json(resApi);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ apiError: err });
  }; */
});

module.exports = router;
