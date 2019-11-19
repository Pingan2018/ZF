const obj={
  name:'obj name'
}
name = 'window'
function f1(){
  console.log('f1')
}
Function.prototype.myBind = function(ctx,...args){
  const that = this
  const context = ctx ? Object(ctx) : window
  return function(){
    
  }
}