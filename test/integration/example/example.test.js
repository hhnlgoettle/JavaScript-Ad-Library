const {describe, it} = require('mocha');
const assert = require('assert');

describe('Test Func Integration', function() {
  describe('#function()', function() {
    it('should do sth. with the function', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});

