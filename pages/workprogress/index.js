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
    var that = this
    var data = await {
      "key": that.data.condition.key,
      "type": that.data.condition.type,
      "cityId": that.data.condition.city,
      "isExistsIntroCode": that.data.condition.isExistsIntroCode,
      "page": that.data.page,
      "count": that.data.count,
      "maxTime": that.data.maxTime,
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
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    await console.log(1)
    await wx.request({
      url: Apis.Urls.GetRecruits,
      data: data,
      method: 'post',
      dataType: 'application/json',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    await console.log(2)
    await wx.request({
      url: Apis.Urls.GetRecruits,
      data: data,
      method: 'post',
      dataType: 'application/json',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    await console.log(3)
  },
  onLoad: function () {

  },

})