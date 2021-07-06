const {describe, it} = require('mocha');
const assert = require('assert');

describe('InteractionRecorderOverlay', function() {
  describe('#inject()', function() {
    it('should record clicks on body', async function(done) {
      await browser.url('/');
      const result = await browser.execute(() => {
          InteractionRewardingAds.ui.clickOverlay.inject();
          document.body.click();
          return InteractionRewardingAds.recorder;
        });
      assert.strictEqual(1, result.interactions.length);
    });
  });
});

