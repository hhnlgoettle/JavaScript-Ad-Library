const Countdown = require('./Countdown');
const CloseButton = require('./CloseButton');

/**
 * @module
 * @class CountdownContainer
 *
 * @desc creates an Parent UI Element for Countdown and CloseButton
 *
 * @type {CountdownContainer}
 *
 * @property {InteractionRewardingAds} manager holds refs to all instances
 * @property {Countdown} countdown - the countdown to be displayed
 * @property {CloseButton} closeButton - the closebutton to be displayed
 * @property {HTMLDivElement} elem - the html element itself
 */
const CountdownContainer = class CountdownContainer {
  /**
   * @constructor
   * @param {InteractionRewardingAds} manager
   */
  constructor(manager) {
    this.manager = manager;
    this.countdown = new Countdown(manager.timer);
    this.closeButton = new CloseButton(manager);
    this.elem = null;
  }

  /**
   * @desc injects container as child of body
   */
  inject() {
    try {
      this.elem = document.createElement('div');
      this.elem.id = 'ira-container-countdown';
      this.applyStyle(this.elem);
      document.body.appendChild(this.elem);
      this.countdown.inject(this.elem);
      this.closeButton.inject(this.elem);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @desc styles the element
   * @param {HTMLDivElement} elem
   */
  applyStyle(elem) {
    elem.style.display = 'flex';
    elem.style.flexDirection = 'row';
    elem.style.alignItems = 'center';
    elem.style.justifyContent = 'center';
    elem.style.position = 'absolute';
    elem.style.top = '2vh';
    elem.style.right = '2vw';
    elem.style.fontFamily = "'Open Sans',Arial,sans-serif";
    elem.style.backgroundColor = 'rgba(200, 200, 200, 0.9)';
    elem.style.padding = '2px 5px 2px 5px';
    elem.style.borderRadius = '10px';
    elem.style.lineHeight = '30px';
    elem.style.zIndex = '100000';
  }
};

module.exports = CountdownContainer;
