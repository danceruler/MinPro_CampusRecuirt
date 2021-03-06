
//转为接口标准日期
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute, second].map(formatNumber).join(':')
}




const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const strToDate = str =>{
  str = str.substring(0,24)
  var timeArr = str.split("T")
  var d = timeArr[0].split("-")
  var t = timeArr[1].split(":")
  return new Date(d[0], d[1]-1, d[2], t[0], t[1], t[2].split('Z')[0])
}

//yyyy-MM-dd HH:mm:ss
const strToDateStr = str => {
  str = str.substring(0, 24)
  var timeArr = str.split("T")
  var d = timeArr[0].split("-")
  var t = timeArr[1].split(":")
  return d[0] + '-' + d[1]  + '-' + d[2] + ' ' + t[0] + ':' + t[1] + ':' + t[2].split('Z')[0]
}

//MM月dd日
const strToDateStr2 = str => {
  str = str.substring(0, 24)
  var timeArr = str.split("T")
  var d = timeArr[0].split("-")
  var t = timeArr[1].split(":")
  return d[1] + '月' + d[2]+'日'
}


module.exports = {
  formatTime: formatTime,
  formatstrToDate: strToDate,
  formatstrToDateStr: strToDateStr,
  formatstrToShortStr: strToDateStr2,
}
