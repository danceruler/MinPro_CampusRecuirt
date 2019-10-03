// components/user/user-info/index.js
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    userName: 'Default',
    userAvaterPath: '/image/user.png',
    schoolIconPath: '/image/school.png',
    positionIconPath: '/image/position.png',
    editIconPath: '/image/edit.png'
  },

  pageLifetimes: {
    show: function() {
      console.log(app)
      this.setData({
        userName: app.globalData.userInfo.nickname,
        userAvaterPath: app.globalData.userInfo.headUrl
      })
    }
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    config: function() {
      wx:wx.navigateTo({
        url: '/pages/user/userconfig/index'
      })
    }
  }
})
