/**
 * @module
 * @class LiveReward
 * @description class to represent the current reward the user has earned
 */
const LiveReward = class LiveReward {
  /**
   * @constructor
   * @param {InteractionRewardingAds} manager - the ad manager
   * @param {Number} rewardAmount - the maximum amount the user will be
   * rewarded through interactions
   * @param {String} rewardType - the reward type the user will receive
   */
  constructor(manager, rewardAmount = 0, rewardType = 'Rewards') {
    this.manager = manager;
    this.rewardAmount = rewardAmount;
    this.rewardType = rewardType;
  }

  /**
   * @description initializes this LiveReward object
   * @param {Number} rewardAmount - the maximum amount the user will be
   * rewarded through interactions
   * @param {String} rewardType - the reward type the user will receive
   */
  init({ rewardAmount = this.rewardAmount, rewardType = this.rewardType }) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(rewardAmount)) throw Error('rewardAmount has to be valid number');
    if (rewardAmount <= 0) throw Error('rewardAmount can only be positive');
    this.rewardAmount = Math.floor(rewardAmount);
    this.rewardType = rewardType;
  }

  /**
   * @description returns the current reward the user has received
   * @return {number | null}
   */
  getCurrentRewardAmount() {
    try {
      return Math.round((this.rewardAmount) * (this.getCurrentRewardPercentage() / 100));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * @description returns the current percentage of the maximum reward the user has earned
   * @return {number} Number between 0 and 100
   */
  getCurrentRewardPercentage() {
    const { desiredInteractionCount } = this.manager.stats.stats;
    const validInteractionCount = this.manager.recorder.getValidInteractions().length;
    if (desiredInteractionCount <= 0) return 0;
    return Math.min(100, Math.round(100 * (validInteractionCount / desiredInteractionCount)));
  }

  /**
   * @description returns the reward type
   * @return {String} the reward type
   */
  getRewardType() {
    return this.rewardType;
  }
};

module.exports = LiveReward;
