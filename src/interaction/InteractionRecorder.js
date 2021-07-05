const InteractionRecorder = class InteractionRecorder {
  /**
   *
   * @param {Timer} timer
   */
  constructor(timer) {
    this.timer = timer;
    this.interactions = [];
  }

  recordInteraction({posX, posY, target}) {
    const timestamp = this.timer.getPassedTime();
    this.interactions.push({timestamp, posX, posY, target});
  }
  getAllInteractions() {
    return Object.assign([], this.interactions);
  }
  getValidInteractions() {
    return Object.assign([], this.interactions);
  }
};

module.exports = InteractionRecorder;
