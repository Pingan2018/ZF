const obj={
  name:'obj name'
}
name = 'window'
function f1(){
  console.log('f1')
}
function f2(){
  console.log('f2')
}
Function.prototype.myCall = function(ctx,...args){
  const that = this
  const context = ctx ? Object(ctx) : window
  context.fn = that
  context.fn(args)
  delete context.fn
}
f1.myCall.myCall.myCall(f2)