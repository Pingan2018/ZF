function after(times,fn){
  return function(){
    if(--times === 0){
      fn()
    }
  }
}
function f1(){
  console.log('f1')
}
const f2 = after(2,f1)
f2()
f2()

function sum(){
  let m = 0
  return function(n){
    console.log(m+n)
    m+=n
  }
}
sum = sum()
sum(1)
sum(10)
sum(100)