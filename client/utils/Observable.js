export default class Observable {
  constructor(value) {
    this.value = value;
    this.callbacks = { data: [] };
  }

  set(value) {
    this.fire('data', { value, prevValue: this.value });
    this.value = value;
  }

  on(event, callback) {
    if (typeof callback === 'function') {
      if (this.callbacks[event]) {
        this.callbacks[event].push(callback);
      } else {
        this.callbacks[event] = [callback];
      }
    }
  }

  fire(event, value) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(value));
    }
  }
}
