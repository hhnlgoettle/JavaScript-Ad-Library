const { describe, it } = require('mocha');
const assert = require('assert');
const InteractionRewardingAds = require('../../../src/InteractionRewardingAds');

describe('LiveReward Unit Test', () => {
  describe('#init()', () => {
    it('initializes the LiveReward', () => {
      const manager = new InteractionRewardingAds();
      manager.initLiveReward({ rewardAmount: 100, rewardType: 'coin' });
      manager.stats.initStatsObj({ desiredDuration: 30, desiredInteractionCount: 10 });
      assert.strictEqual(manager.liveReward.getRewardType(), 'coin');
      assert.strictEqual(manager.liveReward.getCurrentRewardAmount(), 0);
    });

    it('initializes LiveReward with invalid rewardAmount', () => {
      const manager = new InteractionRewardingAds();
      assert.throws(() => {
        manager.initLiveReward({ rewardAmount: -5, rewardType: 'coin' });
      }, new Error('rewardAmount can only be positive'));
    });
  });

  describe('#getCurrentRewardAmount()', () => {
    it('returns currentRewardAmount after no interactions', () => {
      const manager = new InteractionRewardingAds();
      manager.initLiveReward({ rewardAmount: 100, rewardType: 'coin' });
      manager.stats.initStatsObj({ desiredDuration: 30, desiredInteractionCount: 10 });
      assert.strictEqual(manager.liveReward.getCurrentRewardAmount(), 0);
    });

    it('returns currentRewardAmount after some interactions', () => {
      const manager = new InteractionRewardingAds();
      manager.initLiveReward({ rewardAmount: 100, rewardType: 'coin' });
      manager.stats.initStatsObj({ desiredDuration: 30, desiredInteractionCount: 10 });
      manager.recorder.recordInteraction({
        posX: 10, posY: 5, target: 'unknown', isValid: true,
      });
      // one interaction / 10 desired
      assert.strictEqual(manager.liveReward.getCurrentRewardAmount(), 10);
    });
  });
});
