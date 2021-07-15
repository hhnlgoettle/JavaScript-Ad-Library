const Timer = require('./timer/Timer');
const StatsManager = require('./stats/StatsManager');
const InteractionRecorder = require('./interaction/InteractionRecorder');
const InteractionRecorderOverlay = require('./ui/InteractionRecorderOverlay');
const CloseWarningModal = require('./ui/CloseWarningModal');
const CountdownContainer = require('./ui/CountdownContainer');

const InteractionRewardingAds = class InteractionRewardingAds {
  constructor() {
    this.timer = new Timer();
    this.stats = new StatsManager(this);
    this.recorder = new InteractionRecorder(this.timer);
    this.ui = {
      clickOverlay: new InteractionRecorderOverlay(this.recorder),
      countdownContainer: new CountdownContainer(this),
      modal: new CloseWarningModal(this),
    };
    this.api = null;
  }

  /**
   * initialize
   * @param {Number} desiredDurationMillis - how much time is desired to pass. In Milliseconds
   * @param {Number} desiredInteractionCount - how many interactions are desired
   * @param {Boolean = false} autoStart - should the
   */
  init({desiredDurationMillis, desiredInteractionCount, autoStart= true} = {}) {
    this.stats.initStatsObj({desiredDuration: desiredDurationMillis, desiredInteractionCount});
    this.getAndroidApi();
    if(autoStart !== false) {
      this.start();
    }
  }

  /**
   * start timer and inject clickOverlay
   */
  start() {
    const countdown = Math.round(this.stats.stats.desiredDuration / 1000);
    this.timer.start(countdown);
    this.ui.clickOverlay.inject();
    this.ui.countdownContainer.inject();
    this.ui.modal.inject();
    this.api.onStart();
  }

  getAndroidApi() {
    try {
      this.api = AndroidIRA;
    } catch (err) {
      console.error("android api not available");
    }
  }

  close() {
    const statsJSON = JSON.stringify(this.stats.getStats());
    console.log({statsJSON})
    this.api.onClose(statsJSON);
  }

  closeOnError(error) {
    this.api.onCloseOnError(error.message, this.stats.getStats());
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
