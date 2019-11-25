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


function copy(source,target,callback){
  let buffer = Buffer.alloc(5)
  let readOffset = 0
  let writeOffset = 0
  fs.open(source,'r',function(err,rfd){
    fs.open(target,'w',function(err,wfd){
      function next(){
        fs.read(rfd,buffer,0,buffer.length,readOffset,function(err,bytesRead){
          readOffset += bytesRead
          if(bytesRead){
            fs.write(wfd,buffer,0,bytesRead,writeOffset,function(err,write){
              writeOffset += write
              next()
            })
          }else{
            fs.close(wfd,function(){})
            fs.close(rfd,function(){})
            callback()
          }
        })
      }
      next()
    })
  })
}
copy(path.resolve(__dirname,'a.js'),path.resolve(__dirname,'cd.js'),function(){
  console.log('拷贝成功')
})


const fs = require('fs')
function mkdirSync(path){
  let arr = path.split('/')
  arr.forEach((item,index)=>{
    let current = arr.slice(0,index+1).join('/')
    if(!fs.existsSync(current)) fs.mkdirSync(current)
  })
}
mkdirSync('a/b/v/b/v')
const fs = require('fs')
fs.stat('./a',function(err){
  console.log(err)
})


const fs = require('fs')
const path = require('path')
function rmdirSync(p){
  let dirs = fs.readdirSync(p)
  dirs = dirs.map(dir=>path.join(p,dir))
  for(let i=0;i<dirs.length;i++){
    let current = dirs[i]
    let statObj = fs.statSync(current)
    if(statObj.isDirectory(current)){
      fs.rmdirSync(current)
    }else{
      fs.unlinkSync(current)
    }
  }
  fs.rmdirSync(p)
}
rmdirSync('a')