class EventEmitter {
  constructor() {
    this.$events = Object.create(null)
  }
  on(eventName, callback) {
    if (!this.$events) this.$events = Object.create(null)
    if (eventName !== 'newListener') {
      if (this.$events['newListener']) {
        this.emit('newListener', eventName)
      }
    }
    let stack = this.$events[eventName] || []
    stack.push(callback)
    this.$events[eventName] = stack
  }
  once(eventName, callback) {
    const one = (...args) => {
      callback(...args)
      this.off(eventName, one)
    }
    one.fn = callback
    this.on(eventName, one)
  }
  off(eventName, callback) {
    if (this.$events[eventName]) {
      this.$events[eventName] = this.$events[eventName].filter(item => item !== callback && item.fn !== callback)
    }
  }
  emit(eventName, ...args) {
    if (this.$events[eventName]) {
      this.$events[eventName].forEach(cb => cb(...args))
    }
  }
}

module.exports = EventEmitter