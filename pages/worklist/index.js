// pages/worklist/index.js
var app = getApp()
const Apis = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data:{
    //筛选条件
    condition:{
      key:"",
      type:"",
      city:-1,
      isExistsIntroCode:-1
    },
    list:[
    ],
    page:1,
    count:10
  },
  onLoad: function () {
    this.getMoreList()
  },
  onShow: function () {
    var that = this
    if (this.data.list.length == 0) {
      
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  //搜索框事件
  onChange(e) {
    this.data.condition.key = e.detail
    this.setData({
      condition: this.data.condition
    });
  },
  onSearch(event) {
    this.setData({
      page:1,
      list:[]
    })
    this.getMoreList()
  },
  onCancel() {
  },
  onClear() {
  },
  //列表事件
  getMoreList(){
    var that = this
    wx.request({
      url: Apis.Urls.GetRecruits,
      data: {
        "key": that.data.condition.key,
        "type": that.data.condition.type,
        "cityId": that.data.condition.city,
        "isExistsIntroCode": that.data.condition.isExistsIntroCode,
        "page": that.data.page,
        "count": that.data.count,
        "maxTime": "",
        "uid": app.globalData.userInfo.uid,
        "userId": app.globalData.userInfo.id,
        "requestTime": util.formatTime(new Date())
      },
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        result = JSON.parse(result.data)
        for (var index in result.jobs) {
          var indexString = 'list[' + that.data.list.length + ']'
          that.setData({
            [indexString]: result.jobs[index]
          })
        }
      }
    })
  },
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
})