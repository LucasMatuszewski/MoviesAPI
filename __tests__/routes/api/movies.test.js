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

describe('Test the /movies path', () => {
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
  afterAll(done => {
    mongoose.connection.close(done);
  });

  test('It should response the GET method with status code 200 and with response body', () => {
    request(movies)
      .get('/')
      .then(response => {
        expect(response.statusCode, 'response status Code should be 200').toBe(
          200
        );
        expect(response.body, 'response body should exist').toBeDefined();
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  test('It should POST movie title and get response with movie year and code 200', () => {
    request(movies)
      .post('/')
      .send('title=pi')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
    /* .then(response => {
        expect(response.statusCode, 'response status Code should be 200').toBe(
          200
        );
        expect(response.body, 'response body should exist').toBeDefined();
        expect(response.body.year, 'response body should contain year').toEqual(
          1998
        );
        done();
      })
      .catch(err => {
        console.error(err);
      }); */
  });
});
