/* eslint-disable no-undef */
const { describe, it } = require('mocha');
const assert = require('assert');

describe('Countdown', () => {
  it('should exist', async () => {
    await browser.url('/?desiredDurationMillis=15000&autoStart=true');
    const result = await browser.execute(() => new Promise((resolve) => {
      InteractionRewardingAds
        .timer.on(InteractionRewardingAds.timer.event.onOneSecondPassed, () => {
          resolve(document.getElementById('ira-txt-countdown').innerHTML);
        });
    }));
    assert.strictEqual('Remaining time: 14', result);
  });

  it('should update text displayed', async () => {
    await browser.url('/?desiredDurationMillis=15000&autoStart=true');
    const result = await browser.execute(() => {
      InteractionRewardingAds.ui.countdownContainer.countdown.setCountdownText('Custom Countdown Text {{timeLeft}}');
      return new Promise((resolve) => {
        InteractionRewardingAds
          .timer.on(InteractionRewardingAds.timer.event.onOneSecondPassed, () => {
            resolve(document.getElementById('ira-txt-countdown').innerHTML);
          });
      });
    });
    assert.strictEqual('Custom Countdown Text 14', result);
  });

  it('should display ready text', async () => {
    await browser.url('/?desiredDurationMillis=1000&autoStart=true');
    const result = await browser.execute(() => new Promise((resolve) => {
      InteractionRewardingAds
        .timer.on(InteractionRewardingAds.timer.event.onCountdownIsZero, () => {
          resolve(document.getElementById('ira-txt-countdown').innerHTML);
        });
    }));
    assert.strictEqual('Close', result);
  });

  it('should display custom ready text', async () => {
    await browser.url('/?desiredDurationMillis=1000&autoStart=true');
    const result = await browser.execute(() => {
      InteractionRewardingAds.ui.countdownContainer.countdown.setReadyText('Custom Ready Text');
      return new Promise((resolve) => {
        InteractionRewardingAds
          .timer.on(InteractionRewardingAds.timer.event.onCountdownIsZero, () => {
            resolve(document.getElementById('ira-txt-countdown').innerHTML);
          });
      });
    });
    assert.strictEqual('Custom Ready Text', result);
  });
});
