const EventEmitter = require('./myEvent')
// const EventEmitter = require('events')
const util = require('util')
function Girl(){}

// 继承
// Girl.prototype.__proto__ = EventEmitter.prototype
// ES6
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype)

//node 工具包继承
util.inherits(Girl,EventEmitter)

const girl = new Girl()
girl.on('newListener',function(type){
  process.nextTick(()=>{
    girl.emit(type,'谁')
  })
})
// girl.on('brokenhearted',function(who){
//   console.log(who, '哭')
// })
// girl.on('brokenhearted',function(who){
//   console.log(who, '吃')
// })
// girl.emit('brokenhearted','谁')
function fn1 () {
  console.log(who, '哭')
}
girl.once('brokenhearted',fn1)
girl.once('brokenhearted',function(who){
  console.log(who, '吃')
})
girl.off('brokenhearted',fn1)