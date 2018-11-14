const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    index: true // faster searching by title
  },
  year: Number,
  runtime: String,
  genre: String,
  actors: String,
  plot: String,
  country: String,
  ratings: [Object],
  // Other possible Schema with MONGOOSE MAP:
  // ratings: {
  //   type: Map, // 'ratings' is a key/value store for string keys
  //   of: String // Values must be strings
  // },
  imdbRating: Number,
  imdbID: String,
  comments: [
    {
      text: {
        type: String,
        required: [true, "Comment's text field is required"],
        maxlength: [3000, 'Maximum length of a comment is 3000 characters']
      },
      userName: {
        type: String,
        default: 'Anonymous',
        trim: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  commentsCount: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;
