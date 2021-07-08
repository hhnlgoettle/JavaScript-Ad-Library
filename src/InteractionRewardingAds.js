const Timer = require('./timer/Timer');
const StatsManager = require('./stats/StatsManager');
const InteractionRecorder = require('./interaction/InteractionRecorder');
const InteractionRecorderOverlay = require('./ui/InteractionRecorderOverlay');
const Countdown = require('./ui/Countdown');

const InteractionRewardingAds = class InteractionRewardingAds {
  constructor() {
    this.timer = new Timer();
    this.stats = new StatsManager(this);
    this.recorder = new InteractionRecorder(this.timer);
    this.ui = {
      clickOverlay: new InteractionRecorderOverlay(this.recorder),
      countdown: new Countdown(this.timer)
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
    const countdown = Math.round(this.stats.stats.desiredDuration / 1000);
    console.log(countdown)
    this.timer.start(countdown);
    this.ui.clickOverlay.inject();
    this.ui.countdown.inject();
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
