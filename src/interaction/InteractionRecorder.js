const InteractionRecorder = class InteractionRecorder {
  constructor() {
    this.interactions = [];
  }

  recordInteraction({timestamp, posX, posY, target}) {
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
