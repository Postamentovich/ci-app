const assert = require('chai').assert;

describe('github', () => {
    it('should find hermione', function () {
      return this.browser
        .url('https://github.com/gemini-testing/hermione')
        .getText('#readme h1')
        .then(title => {
          assert.equal(title[0], 'Hermione');
        });
    });
  });