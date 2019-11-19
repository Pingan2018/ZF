setTimeout(()=>{
  console.log('time 1')
  Promise.resolve().then(()=>{
    console.log('then 3')
  })
},0)
setTimeout(()=>{
  console.log('time 2')
},0)
Promise.resolve().then(()=>{
  console.log('then 1')
})

Promise.resolve().then(()=>{
  console.log('then 2')
})
new Promise((resolve,reject)=>{
  console.log('resolve')
  resolve(0)
  console.log('reject')
}).then(data=>{
  console.log(data)
}).then(()=>{
  console.log('bug')
})

console.log(1)

//1 then 1   then 2  time 1 then 3  time 2