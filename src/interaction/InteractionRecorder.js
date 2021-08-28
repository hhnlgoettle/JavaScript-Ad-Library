/**
 * @module
 * @description Records Interactions done by the user
 * @class InteractionRecorder
 * @type {InteractionRecorder}
 * @property {Timer} timer used to timestamp interactions
 * @property {Array} interactions all interactions recorded by this class
 */
const InteractionRecorder = class InteractionRecorder {
  /**
   * @param {Timer} timer
   */
  constructor(timer) {
    this.timer = timer;
    this.interactions = [];
  }

  /**
   * @description records a single interactions
   * @param {Number} posX - the x position on the screen
   * @param {Number} posY - the y position on the screen
   * @param {String | Object} target - the target of the interaction
   * @param {Boolean} isValid - if interaction is valid, e.g. was intended by the advertiser
   * a click on the body is probably not valid, a click on a button may be valid
   */
  recordInteraction({
    posX, posY, target, isValid = false,
  }) {
    const timestamp = this.timer.getPassedTime();
    this.interactions.push({
      timestamp, posX, posY, target, isValid,
    });
  }

  /**
   * @description returns a copy of all interactions
   * @return {Array}
   */
  getAllInteractions() {
    return Object.assign([], this.interactions);
  }

  /**
   * returns a copy of all valid interactions
   * @return {Array}
   */
  getValidInteractions() {
    return Object.assign([], this.interactions.filter((i) => i && i.isValid));
  }
};

module.exports = InteractionRecorder;
