const Timer = require('./timer/Timer');
const StatsManager = require('./stats/StatsManager');
const InteractionRecorder = require('./interaction/InteractionRecorder');

const InteractionRewardingAds = class InteractionRewardingAds {
  constructor() {
    this.timer = new Timer();
    this.stats = new StatsManager(this);
    this.recorder = new InteractionRecorder();
  }

  init({desiredDuration, desiredInteractionCount}) {
    this.stats.initStatsObj({desiredDuration, desiredInteractionCount})
  }
  start() {
    this.timer.start();
  }
};

module.exports = InteractionRewardingAds;
