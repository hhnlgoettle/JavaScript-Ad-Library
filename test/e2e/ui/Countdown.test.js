const {describe, it} = require('mocha');
const assert = require('assert');


describe('Countdown', function() {
    it('should exist', async function(done) {
      await browser.url('/?desiredDurationMillis=15000&autoStart=true');
      const result = await browser.execute(() => {
        return new Promise((resolve) => {
          InteractionRewardingAds.timer.on(InteractionRewardingAds.timer.event.onOneSecondPassed, function () {
              resolve(document.getElementById("ira-txt-countdown").innerHTML)
          })
        })
      });
      assert.strictEqual("Remaining time: 14", result);
    });

    it('should update text displayed', async function(done) {
      await browser.url('/?desiredDurationMillis=15000&autoStart=true');
      const result = await browser.execute(() => {
        InteractionRewardingAds.ui.countdown.setCountdownText("Custom Countdown Text {{timeLeft}}")
        return new Promise((resolve) => {
          InteractionRewardingAds.timer.on(InteractionRewardingAds.timer.event.onOneSecondPassed, function () {
            resolve(document.getElementById("ira-txt-countdown").innerHTML)
          })
        })
      });
      assert.strictEqual("Custom Countdown Text 14", result);
    });

    it('should display ready text', async function(done) {
      await browser.url('/?desiredDurationMillis=1000&autoStart=true');
      const result = await browser.execute(() => {
        return new Promise((resolve) => {
          InteractionRewardingAds.timer.on(InteractionRewardingAds.timer.event.onCountdownIsZero, function () {
            resolve(document.getElementById("ira-txt-countdown").innerHTML)
          })
        })
      });
      assert.strictEqual("Close", result);
    });

    it('should display custom ready text', async function(done) {
      await browser.url('/?desiredDurationMillis=1000&autoStart=true');
      const result = await browser.execute(() => {
        InteractionRewardingAds.ui.countdown.setReadyText("Custom Ready Text")
        return new Promise((resolve) => {
          InteractionRewardingAds.timer.on(InteractionRewardingAds.timer.event.onCountdownIsZero, function () {
            resolve(document.getElementById("ira-txt-countdown").innerHTML)
          })
        })
      });
      assert.strictEqual("Custom Ready Text", result);
    });
});

