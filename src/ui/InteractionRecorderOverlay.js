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
    document.addEventListener('click', data => {
      const interaction = {};
      interaction.target = JSON.stringify(data.target);
      interaction.posX = data.x;
      interaction.posY = data.y;
      this.recorder.recordInteraction(interaction);
    });
  }
};

module.exports = InteractionRecorderOverlay;
