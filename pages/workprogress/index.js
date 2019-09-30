// pages/workprogress/index.js
var app = getApp()
const Apis = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
  data: {
    condition: {
      key: "",
      type: "",
      city: -1,
      cityName: "",
      isExistsIntroCode: -1
    },
    page: 1,
    count: 10,
    maxTime: "",
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  async testapi() {
    var data = {
      "key": this.data.condition.key,
      "type": this.data.condition.type,
      "cityId": this.data.condition.city,
      "isExistsIntroCode": this.data.condition.isExistsIntroCode,
      "page": this.data.page,
      "count": this.data.count,
      "maxTime": this.data.maxTime,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    await wx.request({
      url: Apis.Urls.GetRecruits,
      data: data,
      method: 'post',
      dataType: 'application/json',
      success: function (res) {
        console.log(1, res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    await wx.request({
      url: Apis.Urls.GetRecruits,
      data: data,
      method: 'post',
      dataType: 'application/json',
      success: function (res) {
        console.log(2, res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    await wx.request({
      url: Apis.Urls.GetRecruits,
      data: data,
      method: 'post',
      dataType: 'application/json',
      success: function (res) {
        console.log(3, res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad: function () {

  },

})