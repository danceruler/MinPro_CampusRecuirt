// pages/user/index.js
var app = getApp()

Page({
  onLoad:function(){
  },
  onShow: function () {
    if (app.globalData.isLogin == 0 || app.globalData.userInfo==null){
      app.myLogin(this)
    }
    console.log(this.data)
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