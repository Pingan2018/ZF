

//原型继承  自己的原型丢了
function Animal(){
  this.name = 'Animal'
}

Animal.prototype.say=function(){
  console.log('Animal say')
}

function Cat(age){
  this.age = age
}
Cat.prototype.say=function(){
  console.log('Cat say')
}
Cat.prototype= new Animal()
let mao = new Cat(19)
mao.say()
console.log(mao.name)
console.log(mao)