// pages/usercenter/usercenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  
})