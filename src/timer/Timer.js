/**
 * @module
 * @class Timer
 *
 * @description time related functions
 * @property {Object} event - events fired by this class
 * @property {Number} startedAtMillis timestamp at which Timer was started
 * @property {Function} onOneSecondHandler called every time one second has passed
 * @property {Object} cb registered callbacks for events
 * @property {Number} countdown start time in seconds from which countdown counts down
 */
const Timer = class Timer {

  event = {
    onCountdownIsZero: "onCountdownIsZero",
    onOneSecondPassed: "onOneSecondPassed"
  };

  /**
   * @constructor
   * @param {Number} countdown start time from which to countdown
   */
  constructor(countdown = 30) {
    this.startedAtMillis = this.getCurrentMillis();
    this.onOneSecondHandler = null;
    this.cb = {};
    this.countdown = countdown;
  }

  /**
   * @description register a callback for a given event
   * @param {String} eventKey the event to subscribe to
   * @param {Function} cb the callback function
   */
  on (eventKey, cb) {
    if(eventKey == null || typeof eventKey !== 'string') throw new Error('invalid eventKey: '+eventKey);
    if(cb == null) throw new Error('cb cannot be null');
    if(typeof cb !== "function") throw new Error("cb is not a function");
    if(this.cb[eventKey] == null) {
      this.cb[eventKey] = [];
    }
    this.cb[eventKey].push(cb);
  }

  /**
   * @description clears all callbacks for a given eventKey
   * @param {String} eventKey the eventKey to clear
   */
  off (eventKey) {
    this.cb[eventKey] = null;
  }

  /**
   * @description emits an event
   * @param {String} eventKey the eventKey of the event
   * @param {*} data
   */
  emit(eventKey, data) {
    if (this.cb[eventKey]) {
      try {
        this.cb[eventKey].forEach(cb => cb(data));
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * @desc start the timer with countdown
   * @param {Number} countdown - in seconds
   */
  start(countdown = null) {
    if(countdown || countdown === 0) {this.countdown = countdown;}
    this.startedAtMillis = this.getCurrentMillis();
    const context = this;
    this.onOneSecondHandler = setInterval(function() {context.onOneSecond()}, 1000);
  }

  /**
   * @description get the passed time in milliseconds
   * @return {number}
   */
  getPassedTime() {
    return this.getCurrentMillis() - this.startedAtMillis;
  }

  /**
   * @desc get the current countdown
   * @return {Number}
   */
  getCountdownTime() {
    return this.countdown;
  }

  /**
   * @desc get current time in milliseconds
   * @return {number}
   */
  getCurrentMillis() {
    return (new Date().getTime());
  }

  /**
   * @desc called when one second is passed
   * <p>decrements countdown</p>
   * <p>emits event when one second is passed</p>
   * <p>clears timeout when countdown is equal or less than 0</p>
   */
  onOneSecond() {
    this.countdown--;
    this.emit(this.event.onOneSecondPassed, this.countdown);
    if (this.countdown <= 0) {
      this.emit(this.event.onCountdownIsZero, this.countdown);
      clearTimeout(this.onOneSecondHandler);
      this.onOneSecondHandler = null;
    }
  }
};

module.exports = Timer;
