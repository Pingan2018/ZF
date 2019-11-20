const util = require('util')
const fs = require('fs')
const path = require('path')

const newRead = util.promisify(fs.readFile)
newRead(path.resolve(__dirname,'./a.js')).then(data=>{
  console.log(data)
})

function promisify(fn){
  return function(...args){
    return new Promise(function(resolve,reject){
      fn(...args,function(err,data){
        if(err) reject(err)
        resolve(data)
      })
    })
  }
}


console.log({}==={}) //false
console.log(util.isDeepStrictEqual({},{})) //true