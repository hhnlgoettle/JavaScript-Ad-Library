const {describe, it} = require('mocha');
const assert = require('assert');
const InteractionRecorder = require('../../../src/interaction/InteractionRecorder');
const Timer = require('../../../src/timer/Timer');

describe('InteractionRecorder Unit Test', function() {

  describe('#recordInteraction()', function () {
    it('records an interaction', function () {
      const recorder = new InteractionRecorder(new Timer(30));
      recorder.recordInteraction({timestamp: 0, posX: 5, posY: 12, target: 'someBtn'});
      const interactions = recorder.getAllInteractions();
      assert.strictEqual(1, interactions.length);
      assert.strictEqual(0, interactions[0].timestamp);
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

