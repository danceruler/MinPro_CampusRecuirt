// pages/user/index.js
var app = getApp()

Page({
  onLoad:function(){
    if (app.globalData.isLogin == 1) {
      app.myLogin(this)
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  data:{
    isLogin:0,
    user:null
  }, 
  getUserInfo: function (e) {
    app.myLogin(this)
    app.globalData.isLogin = 1
    this.onShow()
  }
})