/**
 * @module
 * @class Countdown
 *
 * @desc creates an UI Element that displays remaining time
 *
 * @type {Countdown}
 *
 * @property {Timer} timer
 * @property {String} countdownText text that is displayed while countdown is not 0
 * @property {String} readyText text displayed when countdown is 0
 * @property {HTMLDivElement} elem the html element
 */
const Countdown = class Countdown {
  /**
   * @constructor
   * @param {Timer} timer
   */
  constructor(timer) {
    this.timer = timer;
    this.countdownText = 'Remaining time: {{timeLeft}}';
    this.readyText = 'Close';
    this.elem = null;
  }

  /**
   * @desc sets countdown text
   * @param {String} text the text to display
   */
  setCountdownText(text) {
    this.countdownText = text;
  }

  /**
   * @desc sets the ready text
   * @param text the text to display
   */
  setReadyText(text) {
    this.readyText = text;
  }

  /**
   * @desc injects html element into parent's childElements
   * @param {HTMLDivElement} parent the parent html element
   */
  inject(parent) {
    try {
      this.elem = document.createElement('div');
      this.elem.id = 'ira-txt-countdown';
      this.applyStyle(this.elem);
      this.subscribeToTimerEvents(this.elem);
      parent.appendChild(this.elem);
    } catch (err) {
      console.error(err);
    }
  }

  // solution from
  // https://stackoverflow.com/questions/43261798/javascript-how-to-use-template-literals-with-json
  /**
   * @desc processes a template html string
   * @param {String} expression the template string
   * @param {Object} valueObj has values to be injected into template string
   * @return {String} the processed string
   */
  processTemplate(expression, valueObj) {
    const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    return expression.replace(templateMatcher, (substring, value) => {
      value = valueObj[value];
      return value;
    });
  }

  /**
   * @desc subscribes an elem to timer events
   * @param {HTMLDivElement} elem
   */
  subscribeToTimerEvents(elem) {
    this.timer.on(this.timer.event.onOneSecondPassed, (timeLeft) => {
      if (timeLeft > 0) {
        elem.innerHTML = this.processTemplate(this.countdownText, { timeLeft });
      } else {
        elem.innerHTML = this.readyText;
      }
    });
    this.timer.on(this.timer.event.onCountdownIsZero, (timeLeft) => {
      if (timeLeft > 0) {
        elem.innerHTML = this.processTemplate(this.countdownText, { timeLeft });
      } else {
        elem.innerHTML = this.readyText;
      }
    });
  }

  /**
   * @desc styles the element
   * @param {HTMLDivElement} elem
   */
  applyStyle(elem) {
    elem.style.fontFamily = "'Open Sans',Arial,sans-serif";
    elem.style.marginRight = 'clamp(3px, 2vw, 20px)';
    elem.style.display = 'table-cell';
    elem.style.verticalAlign = 'middle';
  }
};

module.exports = Countdown;
