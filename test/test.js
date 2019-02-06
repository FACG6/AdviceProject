/* eslint-disable no-unused-vars */
const test = require('tape');
// eslint-disable-next-line import/no-unresolved
const supertest = require('supertest');
const router = require('./../src/router');
const {
  getMessage,
  getAdvice,
  getSlips,
  findMessage,
} = require('./../public/js/logic');

const message = {
  message: {
    text: 'No advice slips found matching that search term.',
    type: 'notice',
  },
};
const slip = {
  advice: 'A common regret in life is wishing one had the courage to be ones true self.',
  slip_id: '118',
};
const advices = {
  total_results: '1',
  query: '',
  slips: [{
    advice: 'Don\'t judge a book by its cover, unless it has a synopsis on the back.',
    slip_id: '18',
  }],
};

test('Test All Logic Functions', (t) => {
  t.equal(getMessage(message), 'No advice slips found matching that search term.', 'The messages not matching');
  t.deepEqual(getAdvice(advices), [{
    advice: 'Don\'t judge a book by its cover, unless it has a synopsis on the back.',
    slip_id: '18',
  }], 'the advices must return array of advices');
  t.deepEqual(findMessage(message), {
    text: 'No advice slips found matching that search term.',
    type: 'notice',
  }, 'the object of message not matching');
  t.equal(getSlips(slip), 'A common regret in life is wishing one had the courage to be ones true self.', 'the slips must matching');
  t.end();
});
