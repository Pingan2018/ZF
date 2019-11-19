const fs = require('fs')

//方式一：{ '10': '10', name: 'name' }
// function after(obj){
//   return function(key){
//     obj[key]=key
//     if(Object.keys(obj).length===2){
//       console.log(obj)
//     }
//   }
// }
// let school={}
// const out = after(school)
// fs.readFile('promise/a.txt','utf8',function(err,data){
//   out(data)
// })
// fs.readFile('promise/b.txt','utf8',function(err,data){
//   out(data)
// })


class Event {
  constructor() {
    this.ary = []
  }
  emit(f) {
    this.ary.push(f)
  }
  on() {
    this.ary.forEach(f => f())
  }
}
const e = new Event()
let school = {}
e.on()
function getKey(key) {
  school[key] = key
  if (Object.keys(school).length === 2) {
    console.log(school)
  }
}
fs.readFile('promise/a.txt', 'utf8', function (err, data) {
  e.emit(getKey(data))
})
fs.readFile('promise/b.txt', 'utf8', function (err, data) {
  e.emit(getKey(data))
})