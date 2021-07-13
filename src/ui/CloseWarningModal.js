/**
 * @class CloseButton
 *
 * creates an Button that closes the creative
 *
 * @type {CloseButton}
 */
const CloseWarningModal = class CloseWarningModal {
  /**
   *
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
  }

  /**
   * hides the Modal when click event originates from modal backdrop
   * @param {MouseEvent} event
   */
  hideModal(event) {
    // prevent modal from closing when click was not on backdrop
    if (event && event.target && event.target.id === this.backdrop.id) {
      this.backdrop.style.display = "none";
    }
  }

  /**
   * toggles visibility of the modal
   */
  toggle() {
    if(this.backdrop.style.display !== "none") {
      this.backdrop.style.display = "none"
    } else {
      this.backdrop.style.display = "block"
    }
  }

  /**
   * function for the close option of modal
   */
  onClose() {
    this.manager.close();
  }

  /**
   * function for the continue option of modal
   */
  onContinue() {
    this.toggle()
  }


  /**
   * creates the modal (backdrop, modalcontent, footer)
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
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * adds modal content
   * @param {HTMLDivElement} modal
   */
  addModalContent(modal) {
    const innerModal = document.createElement('div');
    innerModal.style.display = "inline-block";
    innerModal.style.padding = "2vw 2vw 2vw 2vw";
    innerModal.style.width = "auto";
    innerModal.style.margin = "0";
    innerModal.style.maxHeight = "40vh";
    innerModal.innerHTML = "<h1 style='color: cadetblue; margin-top: 5px;'>Warning</h1>" +
      "<p style='font-weight: bold'>Closing this ad will cause you to lose your reward</p>"

    modal.appendChild(innerModal);
  }

  /**
   * adds the modal's footer to the modal
   * @param {HTMLDivElement} modal
   */
  addModalFooter(modal) {
    const footer = this.createFooter();

    const optClose = document.createElement('p');
    optClose.id = "ira-footer-close";
    optClose.innerHTML = "Close";
    optClose.onclick = this.onClose;

    const optContinue = document.createElement('p');
    optContinue.id = "ira-footer-continue";
    optContinue.innerHTML = "Continue";
    optContinue.onclick = this.onContinue;

    this.styleFooterOption(optContinue);
    this.styleFooterOption(optClose);

    modal.appendChild(footer);
    footer.appendChild(optContinue);
    footer.appendChild(optClose);
  }

  /**
   * applys the style to the footer option
   * @param {HTMLParagraphElement} opt
   */
  styleFooterOption(opt) {
    opt.style.display = "inline";
    opt.style.fontWeight = "bold";
    opt.style.textTransform = "uppercase";
    opt.style.textDecoration = "none";
    opt.style.padding = "0 1.5em";
    opt.style.lineHeight = "40px";
    opt.style.margin = "0";
    opt.style.color = "white";
  }

  /**
   * styles the element
   * @param {HTMLDivElement} elem
   */
  styleModal(elem) {
    elem.style.display = 'flex';
    elem.style.flexDirection = 'column';
    elem.style.margin = "50% auto";
    elem.style.backgroundColor = "white";
    elem.style.width = "80%";
    elem.style.maxWidth = "600px";
    elem.style.minWidth = "200px";
    elem.style.boxShadow = "0 -8px 40px rgba(0,0,0,.20)";
    elem.style.border = "border: 1px solid #eee";
    elem.style.borderRadius = "10px 10px";
  }

  /**
   * styles the element
   * @param {HTMLDivElement} elem
   */
  styleBackdrop(elem) {
    elem.style.display = 'none';
    elem.style.position = "absolute";
    elem.style.top = "0";
    elem.style.right = "0";
    elem.style.left = "0";
    elem.style.bottom = "0";
    elem.style.top = "0";
    elem.style.overflow = "hidden";
    elem.style.zIndex = "99995";
    elem.style.fontFamily = "'Open Sans',Arial,sans-serif";
    elem.style.background = "rgb(255,255,255,0.85)"
  }

  /**
   * creates the backdrop element
   * @return {HTMLDivElement}
   */
  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = "ira-modal-backdrop";
    backdrop.onclick = this.hideModal;
    this.styleBackdrop(backdrop);
    return backdrop;
  }

  /**
   * creates the modal
   * @return {HTMLDivElement}
   */
  createModal() {
    const modal = document.createElement('div');
    modal.id = "ira-modal-content";
    this.styleModal(modal);
    return modal;
  }

  /**
   * creates the footer
   * @return {HTMLDivElement}
   */
  createFooter() {
    const footer = document.createElement('div');
    footer.style.width = "100%";
    footer.style.margin = "0";
    footer.style.maxHeight = "40px";
    footer.style.background = "cadetblue";
    footer.style.textDecoration = "none";
    footer.style.textAlign = "right";
    footer.style.borderRadius = "0 0 10px 10px";
    return footer;
  }
};

module.exports = CloseWarningModal;
