//=> process 进程对象 platform  系统平台 argv 参数列表   cwd 当前工作目录  env(cross-env)  当前环境
// console.log(Object.keys(process))
// console.log(process.platform)
// console.log(process.argv)

//=> commander 包用法
// npm install commander
// let program = require('commander')
// program.parse(process.argv)
// program.on('--help',callback)
// program.option(...)

// console.log(process.cwd())
console.log(arguments)  //exports require module __filename __dirname