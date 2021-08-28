/**
 * @module
 * @class Stats
 * @description class to represent the stats of the impression
 * @property {Boolean} hasEarnedReward - has the user earned an reward
 * @property {Number} duration - how long the impression was
 * @property {Number} desiredDuration - how long the advertiser wanted the impression to be
 * @property {Number} interactionCount - how many times user has interacted with ad
 * @property {Number} desiredInteractionCount -
 * how many times the advertiser wanted the user to interact
 * @property {Array} allInteractions - all Interactions
 * @property {Array} validInteractions - only Interactions the advertiser deemed valid
 * @property {Number} rewardPercentage - how many percent of the additional reward the user receives
 */
const Stats = class Stats {
  constructor({ desiredDuration, desiredInteractionCount }) {
    this.hasEarnedReward = false;
    this.duration = 0;
    this.desiredDuration = Math.round(desiredDuration);
    this.interactionCount = 0;
    this.desiredInteractionCount = Math.round(desiredInteractionCount);
    this.allInteractions = [];
    this.validInteractions = [];
    this.rewardPercentage = 0;
  }
};

module.exports = Stats;
