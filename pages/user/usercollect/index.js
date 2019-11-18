// pages/usercollect/index.js
var app = getApp()
const Apis = require('../../../utils/api.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 我的收藏界面
   */
  data: {
    worklist: [
    ],
    page: 1,
    count: 10,
    isbottom:0
  },

  onLoad:function(){
    this.initData(this.data.page)
  },

  initData:function(page){
    var that = this
    var requstData = {
      "page": that.data.page,
      "count": 10,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.request({
      url: Apis.Urls.MyCollect,
      data: requstData,
      method: 'post',
      dataType: "application/json",
      success:function(result){
        result = JSON.parse(result.data)
        console.log(result)
        for (var index in result.jobs) {
          result.jobs[index].createTime = util.formatstrToShortStr(result.jobs[index].createTime) + '发布'
          var indexString = 'worklist[' + that.data.worklist.length + ']'
          that.setData({
            [indexString]: result.jobs[index]
          })
        } 
        
        if (result.jobs.length < 10){
          that.data.isbottom = 1
        }else{
          that.data.page = that.data.page + 1
        }
      }
    })
  },

  onReachBottom:function(){
    var that = this
    if(that.data.isbottom == 0){
      that.initData(that.data.page)
    }
  }
})