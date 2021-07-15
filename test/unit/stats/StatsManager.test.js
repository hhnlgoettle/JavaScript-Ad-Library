const {describe, it} = require('mocha');
const assert = require('assert');
const InteractionRewardingAds = require('../../../src/InteractionRewardingAds');

describe('StatsManager Unit Test', function() {

  describe('#constructor()', function () {
    it('construct via InteractionRewardingAds.js', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      assert.strictEqual(manager, stats.manager);
      assert.strictEqual(null, stats.stats)
    });
  });

  describe('#initStats()', function () {
    it('inits the stats object with default values', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      stats.initStatsObj({});
      assert.strictEqual(0, stats.stats.desiredInteractionCount);
      assert.strictEqual(0, stats.stats.desiredDuration);
    });

    it('inits the stats object with custom values', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      stats.initStatsObj({desiredInteractionCount: 10, desiredDuration: 15});
      assert.strictEqual(10, stats.stats.desiredInteractionCount);
      assert.strictEqual(15, stats.stats.desiredDuration);
    });

    it('inits the stats object with custom decimal values', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      stats.initStatsObj({desiredInteractionCount: 10.4, desiredDuration: 15.2});
      assert.strictEqual(10, stats.stats.desiredInteractionCount);
      assert.strictEqual(15, stats.stats.desiredDuration);
    });


    it('inits the stats object with faulty values throws error', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      assert.throws(() => stats.initStatsObj({desiredInteractionCount: null}), {message: "desiredInteractionCount is not a number"});
      assert.throws(() => stats.initStatsObj({desiredDuration: null}), {message: "desiredDuration is not a number"});
      assert.throws(() => stats.initStatsObj({desiredInteractionCount: -20}), {message: "desiredInteractionCount cannot be below zero"});
      assert.throws(() => stats.initStatsObj({desiredDuration: -1}), {message: "desiredDuration cannot be below zero"});
    });
  });
  describe('#buildStats()', async function () {
    it('builds stats with empty interactions', function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      stats.initStatsObj({});
      stats.buildStats();
      const buildStats = stats.getStats();
      assert.strictEqual(true, buildStats.hasEarnedReward);
      assert.strictEqual(0, buildStats.interactionCount);
      assert.strictEqual(0, buildStats.rewardPercentage);
    });

    it('builds stats with interactions 10, 20 desired', async function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      // desiredDuration: 300ms
      stats.initStatsObj({desiredInteractionCount: 20, desiredDuration: 300});

      const ctx = manager;
      const prom = new Promise(resolve => {
        setInterval(function () {
          ctx.recorder.recordInteraction({
            timestamp: ctx.timer.getPassedTime(),
            posX: Math.round(Math.random()*100),
            posY: Math.round(Math.random()*100),
            target: "target: "+ctx.recorder.getAllInteractions().length,
            isValid: true,
          });
          if(ctx.recorder.getAllInteractions().length >= 10) {
            resolve(true);
            clearTimeout(this);
          }
        }, 40);
      });
      await prom;
      stats.buildStats();
      const buildStats = stats.getStats();
      assert.strictEqual(true, buildStats.hasEarnedReward);
      assert.strictEqual(true, buildStats.duration >= 400);
      assert.strictEqual(50, buildStats.rewardPercentage);
      assert.strictEqual(10, buildStats.allInteractions.length);
    });

    it('builds stats with more interaction than desired', async function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      // desiredDuration: 20ms
      stats.initStatsObj({desiredInteractionCount: 5, desiredDuration: 20});

      const ctx = manager;
      const prom = new Promise(resolve => {
        setInterval(function () {
          ctx.recorder.recordInteraction({
            timestamp: ctx.timer.getPassedTime(),
            posX: Math.round(Math.random()*100),
            posY: Math.round(Math.random()*100),
            target: "target: "+ctx.recorder.getAllInteractions().length,
            isValid: true,
          });
          if(ctx.recorder.getAllInteractions().length >= 7) {
            resolve(true);
            clearTimeout(this);
          }
        }, 5);
      });
      await prom;
      stats.buildStats();
      const buildStats = stats.getStats();
      assert.strictEqual(true, buildStats.hasEarnedReward);
      assert.strictEqual(100, buildStats.rewardPercentage);
      assert.strictEqual(7, buildStats.allInteractions.length);
    });


    it('builds stats with interactions, duration smaller than desired', async function () {
      const manager = new InteractionRewardingAds();
      const stats = manager.stats;
      // desiredDuration: 300ms
      stats.initStatsObj({desiredInteractionCount: 3, desiredDuration: 300});

      const ctx = manager;
      const prom = new Promise(resolve => {
        setInterval(function () {
          ctx.recorder.recordInteraction({
            timestamp: ctx.timer.getPassedTime(),
            posX: Math.round(Math.random()*100),
            posY: Math.round(Math.random()*100),
            target: "target: "+ctx.recorder.getAllInteractions().length,
            isValid: true,
          });
          if(ctx.recorder.getAllInteractions().length >= 1) {
            resolve(true);
            clearTimeout(this);
          }
        }, 40);
      });
      await prom;
      stats.buildStats();
      const buildStats = stats.getStats();
      assert.strictEqual(false, buildStats.hasEarnedReward);
      assert.strictEqual(33, buildStats.rewardPercentage);
      assert.strictEqual(1, buildStats.allInteractions.length);
    });
  });

});

