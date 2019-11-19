function say(){
  console.log('say')
}

Function.prototype.before=function(fn){
  const that = this
  return function(){
    fn()
    that()
  }
}
const newFn = say.before(function(){
  console.log('before')
})
newFn()