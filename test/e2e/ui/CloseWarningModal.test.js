/* eslint-disable no-undef,no-prototype-builtins */
const { describe, it } = require('mocha');
const assert = require('assert');

describe('CloseWarningModal', () => {
  it('should be hidden on start', async () => {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result = await browser.execute(() => document.getElementById('ira-modal-backdrop').style.display);
    assert.strictEqual('none', result);
  });
  it('should open when time has not ran out when click on close btn', async () => {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result = await browser.execute(() => {
      document.getElementById('ira-btn-close').click();
      return document.getElementById('ira-modal-backdrop').style.display;
    });
    assert.strictEqual('block', result);
  });

  it('should close on click of backdrop', async () => {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=1000&autoStart=true');
    const result = await browser.execute(() => {
      document.getElementById('ira-btn-close').click();
      document.getElementById('ira-modal-backdrop').click();
      return document.getElementById('ira-modal-backdrop').style.display;
    });
    assert.strictEqual('none', result);
  });

  it('should close on click of continue', async () => {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result = await browser.execute(() => {
      document.getElementById('ira-btn-close').click();
      document.getElementById('ira-footer-continue').click();
      return document.getElementById('ira-modal-backdrop').style.display;
    });
    assert.strictEqual('none', result);
  });

  it('should call AndroidIRA.onClose on click of close footer opt', async () => {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const prom = browser.execute(() => new Promise((resolve) => {
      InteractionRewardingAds.api.on('onClose', (data) => {
        resolve(data);
      });
      InteractionRewardingAds.api.on('onClose', (data) => resolve(data));
      document.getElementById('ira-btn-close').click();
      document.getElementById('ira-footer-close').click();
    }));
    const tmp = await prom;
    const result = JSON.parse(tmp);

    assert.strictEqual(true, result.hasOwnProperty('desiredDuration'));
    assert.strictEqual(true, result.hasOwnProperty('desiredInteractionCount'));
    assert.strictEqual(true, result.hasOwnProperty('allInteractions'));
  });
});
