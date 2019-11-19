const fs = require('fs')

//poll轮询
fs.readFile('node/a.txt','utf8',function(err,data){
  console.log(data)
  setTimeout(()=>{
    console.log('timeout')
  },0)
  setImmediate(()=>{
    console.log('setImmediate')
  })
})
//check
setImmediate(()=>{
  console.log('setImmediate1')
})
//timer
setTimeout(()=>{
  console.log('timeout1')
},10)