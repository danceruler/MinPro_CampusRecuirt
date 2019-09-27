//app.js
const Apis = require('/utils/api.js')
const Secret = require('/utils/secret.js')
const util = require('/utils/util.js')
App({ 
  globalData: {
    userInfo: {
      uid: "",
      id: 0
    },
    testApiDomain: 'http://localhost:60461/api/',
    myApiDomain: 'https://wxloginapi.820803.xyz/api/',
    isLogin: 0,
    //筛选条件
    screen:{
      jobTypes: [
        {
          id: 1,
          name: "产品"
        },
        {
          id: 2,
          name: "技术"
        },
        {
          id: 3,
          name: "运营"
        },
        {
          id: 4,
          name: "设计"
        },
        {
          id: 5,
          name: "市场"
        },
        {
          id: 6,
          name: "职能"
        }
      ],
      cities: [
        {
          id: 1,
          name: "北京"
        },
        {
          id: 2,
          name: "上海"
        },
        {
          id: 3,
          name: "深圳"
        },
        {
          id: 4,
          name: "广州"
        },
        {
          id: 5,
          name: "杭州"
        },
        {
          id: 6,
          name: "其它"
        }
      ]
    }
  },
  onLaunch: function () {
    //console.log(this.createSecret())
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow:function(){
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