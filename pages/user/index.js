// pages/user/index.js
import Page from '../../common/page'
import Toast from '../../dist/toast/toast'

var app = getApp()

Page({
  onLoad:function(){
    var that = this
    if (app.globalData.isLogin == 1) {
      app.myLogin(this)
    }else{
      // 获取用户授权信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            app.myLogin(that)
          } else {
            //没有获取授权的事件
          }
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  data:{
    isLogin:0,
    user:null,
    basic: false,
    minDate: new Date(2018, 0, 1).getTime(),
    currentDate1: new Date(2018, 2, 31).getTime(),
    loading: false,
    isUpSliding: 0,
    scrollTop: 0,
  },
  getUserInfo: function (e) {
    app.myLogin(this)
    this.onShow()
  },
})