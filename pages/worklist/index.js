// pages/worklist/index.js
var app = getApp()
const Apis = require('../../utils/api.js')
Page({
  onLoad:function(){

  },
  onShow: function () {
    var that = this
    if(this.data.list.length == 0){
      wx.request({
        url: Apis.Urls.GetRecruits,
        data: {
          "key": that.data.condition.key,
          "type": that.data.condition.type,
          "cityId": that.data.condition.city,
          "isExistsIntroCode": that.data.condition.isExistsIntroCode,
          "page": 1,
          "count": 10,
          "maxTime": "",
          "uid": app.globalData.userInfo.uid,
          "userId": app.globalData.userInfo.id,
          "requestTime": "2019-09-23T20:11:50.7709533+08:00"
        },
        method: 'post',
        dataType: "application/json",
        success:function(result){
          result = JSON.parse(result.data)
          console.log(result.jobs)
          for (var index in result.jobs){
            var indexString = 'list['+that.data.list.length+']'
            that.setData({
              [indexString]: {
                jobName: result.jobs[index].jobName
              }
            })
          }
        }
      })
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  data:{
    //筛选条件
    condition:{
      key:"",
      type:"",
      city:-1,
      isExistsIntroCode:-1
    },
    list:[
    ]
  }
})