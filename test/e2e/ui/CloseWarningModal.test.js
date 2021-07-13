const {describe, it} = require('mocha');
const assert = require('assert');


describe('CloseWarningModal', function() {
  it('should be hidden on start', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result =
      await browser.execute(() => {
          return document.getElementById("ira-modal-backdrop").style.display;
      });
    assert.strictEqual("none", result)
  });
  it('should open when time has not ran out when click on close btn', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result =
      await browser.execute(() => {
        document.getElementById("ira-btn-close").click();
        return document.getElementById("ira-modal-backdrop").style.display;
      });
    assert.strictEqual("block", result)
  });

  it('should close on click of backdrop', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result =
      await browser.execute(() => {
        document.getElementById("ira-btn-close").click();
        document.getElementById("ira-modal-backdrop").click();
        return document.getElementById("ira-modal-backdrop").style.display;
      });
    assert.strictEqual("none", result)
  });

  it('should close on click of continue', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const result =
      await browser.execute(() => {
        document.getElementById("ira-btn-close").click();
        document.getElementById("ira-footer-continue").click();
        return document.getElementById("ira-modal-backdrop").style.display;
      });
    assert.strictEqual("none", result)
  });

  it('should call AndroidIRA.onClose on click of close footer opt', async function(done) {
    await browser.url('/withMockedAndroidApi.html?desiredDurationMillis=15000&autoStart=true');
    const prom =
      browser.execute(() => {
        return new Promise((resolve) => {
          InteractionRewardingAds.api.on("onClose", data => {
            resolve(data);
          });
          InteractionRewardingAds.api.on("onClose", data => resolve(data));
          document.getElementById("ira-btn-close").click();
          document.getElementById("ira-footer-close").click();
        });
      });
    const result = await prom;

    assert.strictEqual(true, result.hasOwnProperty("desiredDuration"));
    assert.strictEqual(true, result.hasOwnProperty("desiredInteractionCount"));
    assert.strictEqual(true, result.hasOwnProperty("allInteractions"));
  });
});

