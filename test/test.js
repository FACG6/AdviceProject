const test = require('tape');
const supertest = require('supertest');
const router = require('./../src/router');

test('Home route returns a status code of 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Should return status 200');
      t.end();
    });
});

test('Any Route did not in the router ', (t) => {
  supertest(router)
    .get('/abc')
    .expect(404)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, '<h1>Page Not Found </h1>', 'should return Page Not Found ');
      t.end();
    });
});
