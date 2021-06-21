const {describe, it} = require('mocha');
const assert = require('assert');

describe('Test Func Unit', function() {
  describe('#function()', function() {
    it('should do sth. with the function', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});

