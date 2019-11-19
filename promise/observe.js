class Observer{
  constructor(name){
    this.name = name
  }
  updated(name,status){
    console.log(name+'告诉'+this.name+'ta'+status)
  }
}


class Watcher{

  constructor(name){
    this.ary = []
    this.name = name
  }
  attach(o){
    this.ary.push(o)
  }
  updated(status){
    this.ary.forEach(o=>o.updated(this.name,status))
  }
}

const o1 = new Observer('我')
const o2 = new Observer('媳妇')
const w1 = new Watcher('大宝')
const w2 = new Watcher('小宝')
w1.attach(o1)
w1.attach(o2)
w2.attach(o1)
w2.attach(o2)
w1.updated('想吃饭')
w2.updated('想喝水')