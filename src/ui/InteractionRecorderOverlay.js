/**
 * @module
 * @class InteractionRecorderOverlay
 *
 * @desc creates an Listener that records all click events with ad
 *
 * @type {InteractionRecorderOverlay}
 *
 * @property {InteractionRecorder} recorder the interaction recorder
 */
const InteractionRecorderOverlay = class InteractionRecorderOverlay {
  /**
   * @constructor
   * @param {InteractionRecorder} eventRecorder
   */
  constructor(eventRecorder) {
    this.recorder = eventRecorder;
  }

  /**
   * @desc adds an EventListener to document
   * <p>each interaction will be recorded and passed to this.recorder</p>
   */
  inject() {
    try {
      document.addEventListener('click', (data) => {
        const interaction = {};
        interaction.target = JSON.stringify(data.target);
        interaction.posX = data.x;
        interaction.posY = data.y;
        interaction.isValid = data.isValid;
        this.recorder.recordInteraction(interaction);
      });
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = InteractionRecorderOverlay;
