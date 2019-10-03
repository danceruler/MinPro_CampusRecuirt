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
      userImagePath: app.globalData.userInfo.headUrl
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
})