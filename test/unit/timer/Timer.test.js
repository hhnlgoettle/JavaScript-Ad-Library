const {describe, it} = require('mocha');
const assert = require('assert');
const Timer = require('../../../src/timer/Timer');

describe('timer Unit Test', function() {
  describe('#constructor()', function () {
    it('should init with correct time', function () {
      const timer = new Timer(25);
      assert.strictEqual(25, timer.countdown);
      assert.strictEqual(true, timer.startedAtMillis !== 0)
    });
  });
  describe('#on()', function () {
    it('should register onOneSecondPassed callback', async function () {
      const timer = new Timer(25);
      const promise = new Promise(resolve => {
        timer.on(timer.event.onOneSecondPassed, function (data) {
          resolve(data);
        });
        timer.start();
      });
      const result = await promise;
      assert.strictEqual(24, result);
    });

    it('should register onCountdownIsZero callback', async function () {
      const timer = new Timer(1);
      const promise = new Promise(resolve => {
        timer.on(timer.event.onCountdownIsZero, function (data) {
          resolve(data);
        });
        timer.start();
      });
      const result = await promise;
      assert.strictEqual(0, result);
    })
  });
  describe('#getCurrentMillis()', function () {
    it('should return current time in milliseconds', async function () {
      const timer = new Timer(30);
      timer.start();
      const currentTime = timer.getCurrentMillis();
      const diff = Math.abs(new Date().getTime() - currentTime)
      assert.strictEqual(true, diff <= 1)
    })
  });
  describe('#getPassedTime()', function () {
    it('returns passed time since timer started', async function () {
      const timer = new Timer(30);
      const promise = new Promise(resolve => {
        timer.start();
        timer.on(timer.event.onOneSecondPassed, function (data) {
          resolve(timer.getPassedTime())
        });
      });
      const result = await promise;
      assert.strictEqual(true, result >= 1000)
    })
  })

});

