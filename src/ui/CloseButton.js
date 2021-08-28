/**
 * @module
 * @type {CloseButton}
 * @class CloseButton
 *
 * @desc creates a html button that closes the creative
 * <p> the buttons id is <b>ira-btn-close</b></p>
 *
 * @property {InteractionRewardingAds} manager holds refs to all instances
 * @property {Timer} timer
 * @property {Function} onClickFunc - called when clicked on close button
 *
 *
 */
const CloseButton = class CloseButton {
  /**
   *
   * @param {InteractionRewardingAds} manager
   */
  constructor(manager) {
    this.manager = manager;
    this.timer = manager.timer;
    this.onClickFunc = this.onClickFunc.bind(this);
  }

  /**
   * @desc injects the html element into children of parent
   * @param {HTMLDivElement} parent
   */
  inject(parent) {
    try {
      this.elem = document.createElement('div');
      this.elem.id = 'ira-btn-close';
      this.elem.innerHTML = 'X';
      this.elem.onclick = this.onClickFunc;
      this.applyStyle(this.elem);
      parent.appendChild(this.elem);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @desc called when user clicks on close button
   * <p> when timer countdown is zero closes immediately</p>
   * <p> otherwise opens CloseModal </p>
   */
  onClickFunc() {
    if (this.timer.getCountdownTime() <= 0) {
      this.manager.close();
    } else {
      this.manager.ui.modal.toggle();
    }
  }

  /**
   * @des styles the element
   * @param {HTMLDivElement} elem
   */
  applyStyle(elem) {
    elem.style.backgroundColor = '#fff';
    elem.style.display = 'block';
    elem.style.borderRadius = '50%';
    elem.style.width = 'clamp(30px, 2vw, 40px)';
    elem.style.textAlign = 'center';
    elem.style.fontWeight = '600';
    elem.style.textDecoration = 'none';
    elem.style.fontSize = '18px';
  }
};

module.exports = CloseButton;
