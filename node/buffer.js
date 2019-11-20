//base64

function strToBase64(str) {
  let base64Str = ''
  let base64Encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  base64Encoding += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()
  base64Encoding += '0123456789+/'
  let buffer = Buffer.from(str)
  let str2 = ''
  buffer.forEach(item => {
    str2 += item.toString(2)
  })
  let ary = []
  for (let i = 0; i < str2.length; i += 6) {
    ary.push(parseInt(str2.slice(i, i + 6), 2))
  }
  ary.forEach(item => {
    base64Str += base64Encoding[item]
  })
  return base64Str
}
// console.log(strToBase64('分众传媒'))

// let buf1 = Buffer.alloc(10)
// let buf2 = Buffer.allocUnsafe(10)
// console.log(buf1,buf2)

let buf1 = Buffer.from('分众')
let buf2 = Buffer.from('传媒')
let buf3 = Buffer.alloc(12)
buf1.copy(buf3,0)
buf2.copy(buf3,6)
console.log(buf3.toString())
console.log(Buffer.concat([buf1,buf2]).toString())
