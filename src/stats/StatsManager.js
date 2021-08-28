const Stats = require('./Stats');

/**
 * @module
 * @class StatsManager
 * @type {StatsManager}
 * @description manages the stats of the impression
 * @property {InteractionRewardingAds.js} manager the Parent
 * @property {Stats} stats the Parent
 * Object that holds refs to all other objects
 */
const StatsManager = class StatsManager {
  /**
   * @param {InteractionRewardingAds.js} manager InteractionRewardingAds
   */
  constructor(manager) {
    this.manager = manager;
    this.stats = null;
  }

  /**
   * @description inits the stats object
   * @param {Number} desiredDuration - the minimum duration in MilliSeconds!
   * @param {Number} desiredInteractionCount
   */
  initStatsObj({ desiredDuration = 0, desiredInteractionCount = 0 }) {
    if (typeof desiredInteractionCount !== 'number') throw new Error('desiredInteractionCount is not a number');
    if (typeof desiredDuration !== 'number') throw new Error('desiredDuration is not a number');
    if (desiredInteractionCount < 0) throw new Error('desiredInteractionCount cannot be below zero');
    if (desiredDuration < 0) throw new Error('desiredDuration cannot be below zero');
    this.stats = new Stats({ desiredDuration, desiredInteractionCount });
  }

  /**
   * @description builds the stats object
   */
  buildStats() {
    if (this.stats == null) this.initStatsObj({});
    this.stats.duration = this.manager.timer.getPassedTime();
    this.stats.hasEarnedReward = this.stats.duration >= (this.stats.desiredDuration);
    this.stats.allInteractions = this.manager.recorder.getAllInteractions();
    this.stats.validInteractions = this.manager.recorder.getValidInteractions();
    this.stats.interactionCount = this.stats.validInteractions.length;
    this.stats.rewardPercentage = this.getRewardPercentage();
  }

  /**
   * @description returns the reward percentage in a number between 0 and 100
   * <p> returns 0 when this.stats.desiredInteractionCount is less or equal to 0 </p>
   * <p> return 100 when this.stats.interactionCount is equal or greater
   * than this.stats.desiredInteractionCount</p>
   * @return {number} the reward percentage
   */
  getRewardPercentage() {
    if (this.stats.desiredInteractionCount <= 0) return 0;
    if (this.stats.interactionCount >= this.stats.desiredInteractionCount) return 100;
    return Math.round(100 * (this.stats.interactionCount / this.stats.desiredInteractionCount));
  }

  /**
   * @description builds and returns the stats of the impression
   * @returns {Stats} the stats object
   */
  getStats() {
    this.buildStats();
    return this.stats;
  }
};

module.exports = StatsManager;
