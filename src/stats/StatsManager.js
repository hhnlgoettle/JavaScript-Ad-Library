const StatsManager = class StatsManager {

  /**
   *
   * @param manager: InteractionRewardingAds
   */
  constructor(manager) {
    this.manager = manager;
  }

  /**
   * inits the stats object
   * @param {Number} desiredDuration - the minimum duration in MilliSeconds!
   * @param {Number} desiredInteractionCount
   */
  initStatsObj({ desiredDuration = 0, desiredInteractionCount= 0 }) {
    if(typeof desiredInteractionCount !== 'number') throw new Error("desiredInteractionCount is not a number");
    if(typeof desiredDuration !== 'number') throw new Error("desiredDuration is not a number");
    if(desiredInteractionCount < 0) throw new Error("desiredInteractionCount cannot be below zero");
    if(desiredDuration < 0) throw new Error("desiredDuration cannot be below zero");
    this.stats = {
      hasEarnedReward: false,
      duration: 0,
      desiredDuration: Math.round(desiredDuration),
      interactionCount: 0,
      desiredInteractionCount: Math.round(desiredInteractionCount),
      allInteractions: [],
      validInteractions: [],
      rewardPercentage: 0,
    }
  }

  /**
   * builds the stats object
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
   * returns the reward percentage in a number between 0 and 100
   * @return {number}
   */
  getRewardPercentage() {
    if (this.stats.desiredInteractionCount <= 0) return 0;
    if (this.stats.interactionCount >= this.stats.desiredInteractionCount) return 100;
    return Math.round(100 * (this.stats.interactionCount / this.stats.desiredInteractionCount));
  }

  /**
   * returns the stats
   * @return {{
   * duration: number,
   * desiredInteractionCount: number,
   * desiredDuration: number,
   * hasEarnedReward: boolean,
   * allInteractions: [],
   * interactionCount: number,
   * rewardPercentage: number,
   * validInteractions: []
   * }}
   */
  getStats() {
    this.buildStats();
    return this.stats;
  }
};

module.exports = StatsManager;
