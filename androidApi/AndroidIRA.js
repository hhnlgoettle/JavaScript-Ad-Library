/**
 * @class AndroidIRA
 *
 * mocks the API provided by the Interaction Rewarding Ads Android Library
 * @type {AndroidIRA}
 */
class AndroidIRA {

  events = {
    onStart: 'onStart',
    onClose: 'onClose',
    onCloseOnError: 'onCloseOnError',
  };

  constructor() {
    this.cb = {};
  }

  on(event, cb) {
    if(this.cb[event] == null) {this.cb[event] = []}
    this.cb[event].push(cb);
  }

  emit(event, data) {
    if(this.cb[event]) {
      this.cb[event].forEach(cb => {
        try {
          cb(data)
        } catch(err) {
          console.error(err)
        }
      });
    }
  }

  onStart() {
    this.emit(this.events.onStart)
  }

  onClose(json) {
    this.emit(this.events.onClose, json)
  }

  onCloseOnError(errorReason, json) {
    this.emit(this.events.onCloseOnError, {errorReason, json})
  }
};

module.exports = new AndroidIRA();
