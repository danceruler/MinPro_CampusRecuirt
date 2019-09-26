//app.js
const Apis = require('/utils/api.js')
const Secret = require('/utils/secret.js')
const util = require('/utils/util.js')
App({ 
  onLaunch: function () {
    console.log(Apis.Urls.ChangeUserInfo)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.createSecret()
  },
  onShow:function(){
  },
  globalData: {
    userInfo: {
      uid:"",
      id:0
    },
    testApiDomain:'http://localhost:60461/api/',
    myApiDomain:'https://wxloginapi.820803.xyz/api/',
    isLogin:0
  },
  myLogin: function (obj) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var iv = res.iv
        var encryptedData = res.encryptedData
        wx.login({
          success: function (res) {
            wx.request({
              url: that.globalData.myApiDomain+'WxLogin?appid=wxeb64182a8c14a216&secret=987defe5cd1ef5e1b1728fab4e53c730&iv=' + iv + '&secretCode=' + encryptedData + '&code=' + res.code,
              method: 'post',
              dataType: "application/json",
              success: function (data) {
                console.log(JSON.parse(data.data))
                if(JSON.parse(data.data).State == 0){
                  that.myLogin(obj)
                }else{
                  that.globalData.isLogin = 1
                  that.globalData.userInfo = JSON.parse(data.data).user
                  obj.setData({ isLogin: 1, user: JSON.parse(data.data).user }) 
                  console.log(obj.data)
                  return JSON.parse(data.data).user
                }
              },
              fail:function(){
                that.myLogin(obj)
              }
            })
          }
        })
      }
    })
  },
  createSecret:function(){
    var data = {
      date: util.formatTime(new Date()),
      uid: this.globalData.userInfo.uid,
      id: this.globalData.userInfo.id
    }
    return Secret.Encrypt(JSON.stringify(data))
  }
})