const InteractionRecorder = class InteractionRecorder {
  /**
   *
   * @param {Timer} timer
   */
  constructor(timer) {
    this.timer = timer;
    this.interactions = [];
  }

  recordInteraction({posX, posY, target, isValid = false}) {
    const timestamp = this.timer.getPassedTime();
    this.interactions.push({timestamp, posX, posY, target, isValid});
  }
  getAllInteractions() {
    return Object.assign([], this.interactions);
  }
  getValidInteractions() {
    return Object.assign([], this.interactions.filter(i => i && i.isValid));
  }
};

module.exports = InteractionRecorder;
