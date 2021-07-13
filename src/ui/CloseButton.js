/**
 * @class CloseButton
 *
 * creates an Button that closes the creative
 *
 * @type {CloseButton}
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

  inject(parent) {
    try {
      this.elem = document.createElement('div');
      this.elem.id = "ira-btn-close";
      this.elem.innerHTML = "X";
      this.elem.onclick = this.onClickFunc;
      this.applyStyle(this.elem);
      parent.appendChild(this.elem);
    } catch (err) {
      console.error(err);
    }
  }

  onClickFunc() {
    if(this.timer.getCountdownTime() <= 0) {
      this.manager.close();
    } else {
      this.manager.ui.modal.toggle();
    }
  }

  /**
   * styles the element
   * @param {HTMLDivElement} elem
   */
  applyStyle(elem) {
    elem.style.backgroundColor = '#fff';
    elem.style.display = "block";
    elem.style.borderRadius = "50%";
    elem.style.width = "clamp(30px, 2vw, 40px)";
    elem.style.textAlign = "center";
    elem.style.fontWeight = "600";
    elem.style.textDecoration = "none";
    elem.style.fontSize = "18px";
  }
};

module.exports = CloseButton;
