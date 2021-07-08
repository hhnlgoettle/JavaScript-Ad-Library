/**
 * @class Countdown
 *
 * creates an UI Element that displays remaining time
 *
 * @type {Countdown}
 */
const Countdown = class Countdown {
  /**
   *
   * @param {Timer} timer
   */
  constructor(timer) {
    this.timer = timer;
    this.countdownText = 'Remaining time: {{timeLeft}}';
    this.readyText = 'Close';
    this.elem = null;
  }

  setCountdownText(text) {
    this.countdownText = text;
  }

  setReadyText(text) {
    this.readyText = text;
  }



  inject() {
    try {
      this.elem = document.createElement('div');
      this.elem.id = "ira-txt-countdown";
      this.applyStyle(this.elem);
      this.subscribeToTimerEvents(this.elem);
      document.body.appendChild(this.elem);
    } catch (err) {
      console.error(err);
    }

  }

  // solution from
  // https://stackoverflow.com/questions/43261798/javascript-how-to-use-template-literals-with-json
  processTemplate(expression, valueObj) {
    const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    const text = expression.replace(templateMatcher, (substring, value) => {
      value = valueObj[value];
      return value;
    });
    return text;
  }

  /**
   * subscribes an elem to timer events
   * @param {HTMLDivElement} elem
   */
  subscribeToTimerEvents(elem) {
    this.timer.on(this.timer.event.onOneSecondPassed, (timeLeft) => {
      if(timeLeft > 0) {
        elem.innerHTML = this.processTemplate(this.countdownText, {timeLeft});
      } else {
        elem.innerHTML = this.readyText;
      }
    });
    this.timer.on(this.timer.event.onCountdownIsZero, (timeLeft) => {
      if(timeLeft > 0) {
        elem.innerHTML = this.processTemplate(this.countdownText, {timeLeft});
      } else {
        elem.innerHTML = this.readyText;
      }
    });
  }

  /**
   * styles the element
   * @param {HTMLDivElement} elem
   */
  applyStyle(elem) {
    elem.style.position = 'absolute';
    elem.style.top = "2vh";
    elem.style.right = "2vw";
  }
};

module.exports = Countdown;
