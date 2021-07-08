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

  /**
   * initialize
   * @param {Number} desiredDurationMillis - how much time is desired to pass. In Milliseconds
   * @param {Number} desiredInteractionCount - how many interactions are desired
   * @param {Boolean = false} autoStart - should the
   */
  init({desiredDurationMillis, desiredInteractionCount, autoStart= true} = {}) {
    this.stats.initStatsObj({desiredDuration: desiredDurationMillis, desiredInteractionCount});
    if(autoStart !== false) {
      this.start();
    }
  }

  /**
   * start timer and inject clickOverlay
   */
  start() {
    this.timer.start();
    this.ui.clickOverlay.inject();
  }

  /**
   * mark an event as valid
   * @param {MouseEvent} event
   */
  isValidEvent(event) {
    event.isValid = true;
  }
};

module.exports = InteractionRewardingAds;
