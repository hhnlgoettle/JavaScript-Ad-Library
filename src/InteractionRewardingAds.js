const Timer = require('./timer/Timer');
const StatsManager = require('./stats/StatsManager');
const InteractionRecorder = require('./interaction/InteractionRecorder');
const InteractionRecorderOverlay = require('./ui/InteractionRecorderOverlay');

const InteractionRewardingAds = class InteractionRewardingAds {
  constructor() {
    this.timer = new Timer();
    this.stats = new StatsManager(this);
    this.recorder = new InteractionRecorder(this.timer);
    this.ui = {
      clickOverlay: new InteractionRecorderOverlay(this.recorder)
    }
  }

  init({desiredDuration, desiredInteractionCount, autoStart= false} = {}) {
    this.stats.initStatsObj({desiredDuration, desiredInteractionCount});
    if(autoStart !== false) {
      this.start();
    }
  }
  start() {
    this.timer.start();
  }
};

module.exports = InteractionRewardingAds;
