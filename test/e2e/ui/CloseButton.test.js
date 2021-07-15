const {describe, it} = require('mocha');
const assert = require('assert');


describe('CloseButton', function() {
  it('should close when timer is zero', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=0&autoStart=false');
    const prom =
      browser.execute(() => {
        return new Promise((resolve) => {
          InteractionRewardingAds.api.on("onClose", data => {
            resolve(data);
          });
          InteractionRewardingAds.start();
          document.getElementById("ira-btn-close").click();
        })
    });
    const tmp = await prom;
    const result = JSON.parse(tmp);
    assert.strictEqual(true, result != null);
    // check if its actually a stats object
    assert.strictEqual(0, result.desiredDuration);
    assert.strictEqual(0, result.allInteractions.length);
    assert.strictEqual(0, result.desiredInteractionCount);
    assert.strictEqual(true, result.hasEarnedReward);
  });

  it('should show a popup when timer is not zero', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=0&autoStart=false');
    const prom =
      browser.execute(() => {
        return new Promise((resolve) => {
          InteractionRewardingAds.api.on("onClose", data => {
            resolve(data);
          });
          InteractionRewardingAds.start();
          document.getElementById("ira-btn-close").click();
        })
      });
    const tmp = await prom;
    const result = JSON.parse(tmp);
    assert.strictEqual(true, result != null);
    // check if its actually a stats object
    assert.strictEqual(0, result.desiredDuration);
    assert.strictEqual(0, result.allInteractions.length);
    assert.strictEqual(0, result.desiredInteractionCount);
    assert.strictEqual(true, result.hasEarnedReward);
  });
});

