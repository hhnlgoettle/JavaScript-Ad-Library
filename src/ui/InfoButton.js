/**
 * @module
 * @type {InfoButton}
 * @class InfoButton
 *
 * @desc creates a html button that toggles info view
 * <p> the buttons id is <b>ira-info-btn</b></p>
 *
 * @property {HTMLDivElement} infoButton - the button
 * @property {HTMLDivElement} infoOverlay - the information overlay
 * @property {HTMLDivElement} backdrop - the backdrop for the information overlay
 * @property {Function} onClickFunc - called when clicked on close button
 *
 *
 */
const InfoButton = class InfoButton {
  /**
   *
   * @constructor
   */
  constructor() {
    this.infoButton = null;
    this.infoOverlay = null;
    this.backdrop = null;
    this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }

  /**
   * @desc injects the html element as child of document.body
   */
  inject() {
    try {
      this.infoButton = this.createInfoButton();
      this.backdrop = this.createBackdrop();
      this.infoOverlay = this.createInfoOverlay();
      document.body.appendChild(this.infoButton);
      document.body.appendChild(this.backdrop);
      this.backdrop.appendChild(this.infoOverlay);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @desc creates the info button
   * @return {HTMLDivElement}
   */
  createInfoButton() {
    const elem = document.createElement('div');
    elem.id = 'ira-info-btn';
    // information icon in unicode
    // https://stackoverflow.com/questions/33878539/is-there-an-html-entity-for-an-info-icon/33878646#33878646
    elem.innerHTML = '&#x1F6C8';
    elem.onclick = this.onInfoButtonClick;
    this.styleInfoButton(elem);
    return elem;
  }

  /**
   * @desc creates the info overlay html element
   * @return {HTMLDivElement}
   */
  createInfoOverlay() {
    const elem = document.createElement('div');
    elem.id = 'ira-info-overlay';
    elem.onclick = this.onClickFunc;
    const closeButton = document.createElement('div');
    closeButton.id = 'ira-info-overlay-btn-close';
    // onBackdropClick closes the overlay, so reuse it here
    closeButton.onclick = this.onBackdropClick;
    closeButton.innerHTML = 'X';
    closeButton.style.textAlign = 'right';
    closeButton.style.color = '#00B0C4';
    elem.innerHTML = `${closeButton.outerHTML}
    <p style="margin-top: 1px">This is an interaction rewarding ad. Interact with the ad to receive additional rewards!</p>
      `;
    this.styleOverlay(elem);
    return elem;
  }

  /**
   * @desc creates the backdrop html element
   * @return {HTMLDivElement}
   */
  createBackdrop() {
    const elem = document.createElement('div');
    elem.id = 'ira-info-backdrop';
    elem.onclick = this.onBackdropClick;
    this.styleBackdrop(elem);
    return elem;
  }

  /**
   * @desc called when user clicks on info button
   * <p> shows overlay
   */
  onInfoButtonClick() {
    this.backdrop.style.display = 'block';
  }

  /**
   * @desc called when user clicks on backdrop
   * <p> hides overlay
   */
  onBackdropClick() {
    this.backdrop.style.display = 'none';
  }

  /**
   * @des styles the info button
   * @param {HTMLDivElement} elem
   */
  styleInfoButton(elem) {
    elem.style.position = 'absolute';
    elem.style.right = '0';
    elem.style.bottom = '0';
    elem.style.zIndex = '100';
    elem.style.fontSize = '1.2em';
    elem.style.margin = '5px';
    elem.style.color = '#00B0C4';
  }

  /**
   * @des styles the backdrop
   * @param {HTMLDivElement} elem
   */
  styleBackdrop(elem) {
    elem.style.display = 'none';
    elem.style.position = 'absolute';
    elem.style.right = '0';
    elem.style.bottom = '0';
    elem.style.left = '0';
    elem.style.top = '0';
    elem.style.zIndex = '10000';
    elem.style.background = 'rgba(150,150,150,0.25)';
  }

  /**
   * @des styles the overlay
   * @param {HTMLDivElement} elem
   */
  styleOverlay(elem) {
    elem.style.position = 'absolute';
    elem.style.right = '0';
    elem.style.bottom = '0';
    elem.style.left = '0';
    // elem.style.height = '200px';
    elem.style.zIndex = '100001';
    elem.style.background = 'white';
    elem.style.borderRadius = '15px 15px 0 0';
    elem.style.borderStyle = 'solid';
    elem.style.borderColor = '#00B0C4 #00B0C4 white #00B0C4';
    elem.style.borderWidth = '2px';

    elem.style.padding = '5px 15px';
    elem.style.color = 'darkgrey';
    elem.style.fontWeight = 'lighter';
    elem.style.fontSize = '1.2em';
  }
};

module.exports = InfoButton;
