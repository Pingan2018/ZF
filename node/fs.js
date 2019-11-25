const fs = require('fs')
const path = require('path')
// fs.readFile(path.resolve(__dirname,'a.js'),'utf8',function(err,data){
//   if(err){
//     return console.log(err)
//   }
//   fs.writeFile(path.resolve(__dirname,'b.txt'),data,function(err){
//     if(err){
//       return console.log(err)
//     }
//     console.log('写入成功!')
//   })
// })


// let buffer = Buffer.alloc(3)

// fs.open(path.resolve(__dirname,'a.js'),'r',function(err,fd){
//   console.log(fd)
//   fs.read(fd,buffer,0,3,2,function(err,bytesRead){
//     fs.close(fd,function(err){
//       console.log('关闭成功')
//     })
//   })
// })


function copy(source, target, callback) {
  let buffer = Buffer.alloc(5)
  let readOffset = 0
  let writeOffset = 0
  fs.open(source, 'r', function (err, rfd) {
    fs.open(target, 'w', function (err, wfd) {
      function next() {
        fs.read(rfd, buffer, 0, buffer.length, readOffset, function (err, bytesRead) {
          readOffset += bytesRead
          if (bytesRead) {
            fs.write(wfd, buffer, 0, bytesRead, writeOffset, function (err, write) {
              writeOffset += write
              next()
            })
          } else {
            fs.close(wfd, function () { })
            fs.close(rfd, function () { })
            callback()
          }
        })
      }
      next()
    })
  })
}
copy(path.resolve(__dirname, 'a.js'), path.resolve(__dirname, 'cd.js'), function () {
  console.log('拷贝成功')
})


const fs = require('fs')
function mkdirSync(path) {
  let arr = path.split('/')
  arr.forEach((item, index) => {
    let current = arr.slice(0, index + 1).join('/')
    if (!fs.existsSync(current)) fs.mkdirSync(current)
  })
}
mkdirSync('a/b/v/b/v')
const fs = require('fs')
fs.stat('./a', function (err) {
  console.log(err)
})


const fs = require('fs')
const path = require('path')
function rmdirSync(p) {
  let dirs = fs.readdirSync(p)
  dirs = dirs.map(dir => path.join(p, dir))
  for (let i = 0; i < dirs.length; i++) {
    let current = dirs[i]
    let statObj = fs.statSync(current)
    if (statObj.isDirectory()) {
      if (fs.readdirSync(current).length) {
        rmdirSync(current)
      } else {
        fs.rmdirSync(current)
      }
    } else {
      fs.unlinkSync(current)
    }
  }
  fs.rmdirSync(p)
}
rmdirSync('a')







//异步串行
const fs = require('fs')
const path = require('path')
function rmdir(p, cb) {
  fs.stat(p, function (err, statObj) {
    if (statObj.isDirectory()) {
      fs.readdir(p, function (err, dirs) {
        dirs = dirs.map(dir => path.join(p, dir))
        let i = 0
        console.log(dirs,i,'dirs') 
        function next() {
          if(i===dirs.length){
            return fs.rmdir(p,cb)
          }
          let current = dirs[i]
          console.log(current,'current',i)
          rmdir(current,next)
          i +=1
        }
        next()
      })
    } else {
      fs.unlink(p, cb)
    }
  })
}
rmdir('a', function () {
  console.log('删除成功')
})



//异步并行
const fs = require('fs')
const path = require('path')
function rmdir(p, cb) {
  fs.stat(p, function (err, statObj) {
    if (statObj.isDirectory()) {
      fs.readdir(p, function (err, dirs) {
        dirs = dirs.map(dir => path.join(p, dir))
        if(dirs.length ===0){
          return fs.rmdir(p,cb)
        }
        let index = 0
        function done(){
          index++
          if(index === dirs.length){
            fs.rmdir(p,cb)
          }
        }
        for(let i=0;i<dirs.length;i++){
          rmdir(dirs[i],done)
        }
      })
    } else {
      fs.unlink(p, cb)
    }
  })
}
rmdir('a', function () {
  console.log('删除成功')
})


//Promise.all
const fs = require('fs')
const path = require('path')
function rmdir(p) {
  return new Promise((resolve,reject)=>{
    fs.stat(p, function (err, statObj) {
      if (statObj.isDirectory()) {
        fs.readdir(p, function (err, dirs) {
          dirs = dirs.map(dir => rmdir(path.join(p, dir)))
          Promise.all(dirs).then(data=>{
            fs.rmdir(p,resolve)
          })
        })
      } else {
        fs.unlink(p, resolve)
      }
    })
  })
}
rmdir('a').then(data=>{
  console.log('删除成功')
})


const fs = require('fs').promises
const path = require('path')
async function rmdir(p) {
  let statObj = await fs.stat(p)
  if (statObj.isDirectory()){
    let dirs = await fs.readdir(p)
    dirs = dirs.map(dir => rmdir(path.join(p, dir)))
    await Promise.all(dirs)
    await fs.rmdir(p)
  }else{
    await fs.unlink(p)
  }
}
rmdir('a').then(data=>{
  console.log('删除成功')
})