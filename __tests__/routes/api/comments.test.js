const request = require('supertest');
const comments = require('../../../routes/api/comments');

/* describe('Test the comments path', () => {
  test('It should response the GET method', done => {
    request(comments)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
}); */

describe('Test the /comments path', () => {
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

  test('It should response the GET method with 200 status code and with response body', () => {
    request(comments)
      .get('/')
      .then(response => {
        expect(response.statusCode, 'response status Code should be 200').toBe(
          200
        );
        expect(response.body, 'response body should exist').toBeDefined();
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
  test('It should response the GET method with 200 status code and with comments for one movie', () => {
    request(comments)
      .get('/5becb1fc707a510015828486')
      .then(response => {
        expect(response.statusCode, 'response status Code should be 200').toBe(
          200
        );
        expect(
          response.body.length,
          'response body should contain one element'
        ).toEqual(1);
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
