function Animal(name) {
  this.name = name
}
Animal.prototype.say= function(){
  console.log(this.name + ' say hello')
}
function myNew(){
  const ctx = [].splice.call(arguments,0,1)[0]
  const obj = {}
  obj.__proto__ = ctx.prototype
  ctx.apply(obj,arguments)
  return obj
}
const a = myNew(Animal,'动物')
console.log(a.name)
a.say()