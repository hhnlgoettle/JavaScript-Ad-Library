const {describe, it} = require('mocha');
const assert = require('assert');

describe('InteractionRecorderOverlay', function() {
  describe('#inject()', function() {
    it('should record clicks on body', async function(done) {
      await browser.url('/');
      const result = await browser.execute(() => {
          document.body.click();
          return InteractionRewardingAds.recorder;
        });
      assert.strictEqual(1, result.interactions.length);
    });

    it('should record clicks on divs', async function(done) {
      await browser.url('/');
      const result = await browser.execute(() => {
        document.getElementById('valid-div').click();
        document.getElementById('invalid-div').click();
        return InteractionRewardingAds.recorder;
      });
      assert.strictEqual(2, result.interactions.length);
      assert.strictEqual(true, result.interactions[0].isValid);
    });
  });
});

