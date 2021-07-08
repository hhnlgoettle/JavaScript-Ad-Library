/**
 * @class InteractionRecorderOverlay
 *
 * creates an UI Element that records all interactions
 *
 * @type {InteractionRecorderOverlay}
 */
const InteractionRecorderOverlay = class InteractionRecorderOverlay {
  /**
   *
   * @param {InteractionRecorder} eventRecorder
   */
  constructor(eventRecorder) {
    this.recorder = eventRecorder;
  }

  inject() {
    try {
      document.addEventListener('click', data => {
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
