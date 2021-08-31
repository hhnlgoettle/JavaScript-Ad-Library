/**
 * @module
 * @class InteractionRewardingAds
 * @type {InteractionRewardingAds}
 * @description Manager that holds references to all other classes
 */

/* eslint-disable class-methods-use-this */
const LiveReward = require('./livereward/LiveReward');

const Timer = require('./timer/Timer');
const StatsManager = require('./stats/StatsManager');
const InteractionRecorder = require('./interaction/InteractionRecorder');
const InteractionRecorderOverlay = require('./ui/InteractionRecorderOverlay');
const CloseWarningModal = require('./ui/CloseWarningModal');
const CountdownContainer = require('./ui/CountdownContainer');
const InfoButton = require('./ui/InfoButton');

const InteractionRewardingAds = class InteractionRewardingAds {
  /**
   * @constructor
   */
  constructor() {
    this.timer = new Timer();
    this.stats = new StatsManager(this);
    this.recorder = new InteractionRecorder(this.timer);
    this.liveReward = new LiveReward(this);
    this.ui = {
      clickOverlay: new InteractionRecorderOverlay(this.recorder),
      countdownContainer: new CountdownContainer(this),
      modal: new CloseWarningModal(this),
      infoButton: new InfoButton(),
    };
    this.api = null;
  }

  /**
   * @description initialize objects
   * @param {Number} desiredDurationMillis - how much time is desired to pass. In Milliseconds
   * @param {Number} desiredInteractionCount - how many interactions are desired
   * @param {Boolean} autoStart - start immediately
   */
  init({ desiredDurationMillis, desiredInteractionCount, autoStart = true } = {}) {
    this.stats.initStatsObj({ desiredDuration: desiredDurationMillis, desiredInteractionCount });
    this.getAndroidApi();
    if (autoStart !== false) {
      this.start();
    }
  }

  /**
   * @description inits the LiveReward Object
   * @param {Number} rewardAmount - the maximum amount the user will be
   * rewarded through interactions
   * @param {String} rewardType - the reward type the user will receive
   */
  initLiveReward({ rewardAmount, rewardType }) {
    if (this.liveReward) {
      this.liveReward.init({ rewardAmount, rewardType });
    }
  }

  /**
   * @description <p>starts countdown and injects ui elements</p>
   * <p>calls the api's onStart method for onStart-hooks</p>
   */
  start() {
    const countdown = Math.round(this.stats.stats.desiredDuration / 1000);
    this.timer.start(countdown);
    this.ui.clickOverlay.inject();
    this.ui.countdownContainer.inject();
    this.ui.modal.inject();
    this.ui.infoButton.inject();
    try {
      this.api.onStart();
    } catch (err) {
      console.error({ err });
    }
  }

  getAndroidApi() {
    try {
      // eslint-disable-next-line no-undef
      this.api = AndroidIRA;
      console.log('detected API: ', this.api);
    } catch (err) {
      console.error('android api not available');
    }
  }

  close() {
    this.stats.getStats();
    this.api.onClose(JSON.stringify(this.stats.getStats()));
  }

  closeOnError(error) {
    this.api.onCloseOnError(error.message, this.stats.getStats());
  }

  /**
   * mark an event as valid
   * @param {MouseEvent} event
   */
  isValidEvent(event) {
    // eslint-disable-next-line no-param-reassign
    event.isValid = true;
  }
};

module.exports = InteractionRewardingAds;
