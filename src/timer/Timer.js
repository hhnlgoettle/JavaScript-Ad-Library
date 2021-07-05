/**
 * @class Timer
 *
 * time related functions
 *
 * @constructor {
 *  @param {Number} countdown - number at which countdown starts
 * }
 */


const Timer = class Timer {

  event = {
    onCountdownIsZero: "onCountdownIsZero",
    onOneSecondPassed: "onOneSecondPassed"
  };

  constructor(countdown = 30) {
    this.countdown = countdown;
    this.startedAtMillis = this.getCurrentMillis();;
    this.onOneSecondHandler = null;
    this.cb = {};
  }

  /**
   * register a callback for a given event
   * @param {String} eventKey
   * @param {Function} cb
   *
   *
   * Notes:
   * CALLING THIS METHOD WILL CLEAR EXISTING CALLBACKS FOR A GIVEN EVENTKEY
   */
  on (eventKey, cb) {
    if(eventKey == null || typeof eventKey !== 'string') throw new Error('invalid eventKey: '+eventKey)
    if(cb == null) throw new Error('cb cannot be null');
    if(typeof cb !== "function") throw new Error("cb is not a function");
    this.cb[eventKey] = cb
  }

  /**
   * clear the callback for given eventKey
   * @param {String} eventKey
   */
  off (eventKey) {
    this.cb[eventKey] = null;
  }

  /**
   * emit an event
   * @param {String} eventKey
   * @param {*} data
   */
  emit(eventKey, data) {
    if (this.cb[eventKey]) {
      this.cb[eventKey](data)
    }
  }

  /**
   * start the timer
   */
  start() {
    this.startedAtMillis = this.getCurrentMillis();
    const context = this;
    this.onOneSecondHandler = setTimeout(function() {context.onOneSecond()}, 1000);
  }

  /**
   * get the passed time in milliseconds
   * @return {number}
   */
  getPassedTime() {
    return this.getCurrentMillis() - this.startedAtMillis;
  }

  /**
   * get current time in milliseconds
   * @return {number}
   */
  getCurrentMillis() {
    return (new Date().getTime());
  }

  /**
   * called when one second is passed
   * decrements countdown and emits events
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