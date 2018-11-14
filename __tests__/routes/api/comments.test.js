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

describe('Test the comments path', () => {
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
    request(comments)
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
