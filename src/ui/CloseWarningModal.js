/* eslint-disable no-param-reassign,class-methods-use-this */
/**
 * @module
 * @class CloseWarningModal
 *
 * @description creates a Modal that asks user again to end impression
 * @property {InteractionRewardingAds} manager holds refs to other instances
 * @property {Timer} timer
 * @property {Function} onContinue called when user clicks on continue watching
 * @property {Function} onClose called when user clicks on close ad
 * @property {Function} hideModal hides the modal
 * @property {HTMLDivElement} backdrop the backdrop of the modal
 * @property {HTMLDivElement} modal the modal itself
 * @property {HTMLDivElement} modalContentCurrentReward html element that displays text.
 * text informs user how much they will lose on prematurely closing ad
 *
 */
const CloseWarningModal = class CloseWarningModal {
  /**
   * @constructor
   * @param {InteractionRewardingAds} manager
   */
  constructor(manager) {
    this.manager = manager;
    this.timer = manager.timer;
    this.onContinue = this.onContinue.bind(this);
    this.onClose = this.onClose.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.backdrop = null;
    this.modal = null;
    this.modalContentCurrentReward = null;
  }

  /**
   * @description hides the Modal when click event originates from modal backdrop
   * @param {MouseEvent} event
   */
  hideModal(event) {
    // prevent modal from closing when click was not on backdrop
    if (event && event.target && event.target.id === this.backdrop.id) {
      this.backdrop.style.display = 'none';
    }
  }

  /**
   * @description shows the modal
   */
  showModal() {
    if (this.modalContentCurrentReward) {
      this.updateModalContentCurrentRewardText();
    }
    this.backdrop.style.display = 'block';
  }

  /**
   * @desc updates the current reward text
   * <p>only sets text if rewardAmount is greater than 0</p>
   */
  updateModalContentCurrentRewardText() {
    try {
      const rewardType = this.manager.liveReward.getRewardType();
      const rewardAmount = this.manager.liveReward.getCurrentRewardAmount();
      if (rewardAmount > 0) {
        this.modalContentCurrentReward.innerHTML = `You already earned <i style="color: darkgoldenrod">${rewardAmount} ${rewardType}</i>`;
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description toggles visibility of the modal
   */
  toggle() {
    if (this.backdrop.style.display !== 'none') {
      this.backdrop.style.display = 'none';
    } else {
      this.showModal();
    }
  }

  /**
   * @description function for the close option of modal
   */
  onClose() {
    this.manager.close();
  }

  /**
   * @description function for the continue option of modal
   */
  onContinue() {
    this.toggle();
  }

  /**
   * @description creates the modal (backdrop, modalcontent, footer)
   * modal is by default display: none
   */
  inject() {
    try {
      this.backdrop = this.createBackdrop();

      this.modal = this.createModal();

      this.addModalContent(this.modal);
      this.addModalFooter(this.modal);

      document.body.appendChild(this.backdrop);
      this.backdrop.appendChild(this.modal);
      this.modalContentCurrentReward = document.getElementById('ira-modal-current-reward');
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @description adds modal content
   * @param {HTMLDivElement} modal
   */
  addModalContent(modal) {
    const innerModal = document.createElement('div');
    innerModal.id = 'ira-modal-content-text';
    innerModal.style.display = 'inline-block';
    innerModal.style.padding = '2vw 2vw 2vw 2vw';
    innerModal.style.width = 'auto';
    innerModal.style.margin = '0';
    innerModal.style.maxHeight = '40vh';
    innerModal.innerHTML = "<h1 style='color: cadetblue; margin-top: 5px;'>Warning</h1>"
      + "<p style='font-weight: bold'>Closing this ad will cause you to lose your reward</p>"
    + "<p id='ira-modal-current-reward' style='font-weight: bold'></p>";

    modal.appendChild(innerModal);
  }

  /**
   * @description adds the modal's footer to the modal
   * @param {HTMLDivElement} modal
   */
  addModalFooter(modal) {
    const footer = this.createFooter();

    const optClose = document.createElement('p');
    optClose.id = 'ira-footer-close';
    optClose.innerHTML = 'Close Ad';
    optClose.onclick = this.onClose;

    const optContinue = document.createElement('p');
    optContinue.id = 'ira-footer-continue';
    optContinue.innerHTML = 'Continue Watching';
    optContinue.onclick = this.onContinue;

    this.styleFooterOption(optContinue);
    this.styleFooterOption(optClose);

    modal.appendChild(footer);
    footer.appendChild(optContinue);
    footer.appendChild(optClose);
  }

  /**
   * @description applys the style to the footer option
   * @param {HTMLParagraphElement} opt
   */
  styleFooterOption(opt) {
    opt.style.display = 'inline';
    opt.style.fontWeight = 'bold';
    opt.style.textTransform = 'uppercase';
    opt.style.textDecoration = 'none';
    opt.style.lineHeight = '40px';
    opt.style.margin = '0';
    opt.style.marginRight = '1em';
    opt.style.color = 'white';
    opt.style.fontSize = '0.9em';
  }

  /**
   * @description styles the element
   * @param {HTMLDivElement} elem
   */
  styleModal(elem) {
    elem.style.display = 'flex';
    elem.style.flexDirection = 'column';
    elem.style.margin = '50% auto';
    elem.style.backgroundColor = 'white';
    elem.style.width = '80%';
    elem.style.maxWidth = '600px';
    elem.style.minWidth = '200px';
    elem.style.boxShadow = '0 -8px 40px rgba(0,0,0,.20)';
    elem.style.border = 'border: 1px solid #eee';
    elem.style.borderRadius = '10px 10px';
  }

  /**
   * @description styles the element
   * @param {HTMLDivElement} elem
   */
  styleBackdrop(elem) {
    elem.style.display = 'none';
    elem.style.position = 'absolute';
    elem.style.top = '0';
    elem.style.right = '0';
    elem.style.left = '0';
    elem.style.bottom = '0';
    elem.style.top = '0';
    elem.style.overflow = 'hidden';
    elem.style.zIndex = '99995';
    elem.style.fontFamily = "'Open Sans',Arial,sans-serif";
    elem.style.background = 'rgb(255,255,255,0.85)';
  }

  /**
   * @description creates the backdrop element
   * @return {HTMLDivElement}
   */
  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'ira-modal-backdrop';
    backdrop.onclick = this.hideModal;
    this.styleBackdrop(backdrop);
    return backdrop;
  }

  /**
   * @description creates the modal
   * @return {HTMLDivElement}
   */
  createModal() {
    const modal = document.createElement('div');
    modal.id = 'ira-modal-content';
    this.styleModal(modal);
    return modal;
  }

  /**
   * @description creates the footer
   * @return {HTMLDivElement}
   */
  createFooter() {
    const footer = document.createElement('div');
    footer.style.width = '100%';
    footer.style.margin = '0';
    footer.style.maxHeight = '40px';
    footer.style.background = 'cadetblue';
    footer.style.textDecoration = 'none';
    footer.style.textAlign = 'right';
    footer.style.borderRadius = '0 0 10px 10px';
    return footer;
  }
};

module.exports = CloseWarningModal;
