const {describe, it} = require('mocha');
const assert = require('assert');
const InteractionRecorder = require('../../../src/interaction/InteractionRecorder');
const Timer = require('../../../src/timer/Timer');

describe('InteractionRecorder Unit Test', function() {

  describe('#recordInteraction()', function () {
    it('records an interaction, valid blank', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      recorder.recordInteraction({timestamp: 0, posX: 5, posY: 12, target: 'someBtn'});
      assert.strictEqual(1, recorder.getAllInteractions().length);
      assert.strictEqual(0, recorder.getValidInteractions().length);
    });
    it('records an interaction, valid false', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      recorder.recordInteraction({timestamp: 0, posX: 5, posY: 12, target: 'someBtn', isValid: false});
      assert.strictEqual(1, recorder.getAllInteractions().length);
      assert.strictEqual(0, recorder.getValidInteractions().length);
    });
    it('records valid interaction', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      recorder.recordInteraction({timestamp: 0, posX: 5, posY: 12, target: 'someBtn', isValid: true});
      assert.strictEqual(1, recorder.getAllInteractions().length);
      assert.strictEqual(1, recorder.getValidInteractions().length);
    });

    it('records multiple interactions, mixed valid and invalid', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      for(let i = 0; i < 10; i++) {
        recorder.recordInteraction({timestamp: 0, posX: i, posY: i, target: 'someBtn', isValid: i % 2 === 0});
      }
      assert.strictEqual(10, recorder.getAllInteractions().length);
      assert.strictEqual(5, recorder.getValidInteractions().length);
    });

    it('filters unwanted properties', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      recorder.recordInteraction({timestamp: 0, timestamp2: 12});
      const interactions = recorder.getAllInteractions();
      assert.strictEqual(1, interactions.length);
      assert.strictEqual(0, interactions[0].timestamp);
      assert.strictEqual(undefined, interactions[0].timestamp2);
    });
  });
});

