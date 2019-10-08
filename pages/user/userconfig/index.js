// pages/userconfig/index.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImagePath: "/image/user.png"
  },

  onLoad: function() {
    this.setData({
      userImagePath: app.globalData.userInfo.headUrl,
      user: app.globalData.userInfo
    })
  },
  sexchange:function(e){
    if (e.detail.value == "man"){
      this.data.user.sex = 1
    }else{
      this.data.user.sex = 0
    }
  },
  schoolchange:function(e){
    this.data.user.schoolName = e.detail.value
  },
  wishjobchange: function (e) {
    this.data.user.wishJob = e.detail.value
  },
  phonenumchange: function (e) {
    this.data.user.phoneNum = e.detail.value
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    app.changeUserInfo(this.data.user)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
})