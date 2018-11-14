const request = require('supertest');
const movies = require('../../../routes/api/movies');

/* describe('Test the movies path', () => {
  test('It should response the GET method', done => {
    request(movies)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
}); */

describe('Test the movies path', () => {
  beforeAll(() => {
    const mongoose = require('mongoose');
    // DB Config
    const db = require('../../../config/keys').mongoURI;

    // Connect to MongoDB
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.error(err));
  });

  test('It should response the GET method', () => {
    request(movies)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });
});
