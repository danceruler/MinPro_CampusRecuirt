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
      cityName:"",
      isExistsIntroCode:-1
    },
    list:[
    ],
    page:1,
    count:10,
    maxTime:"",
    isNoMoreData:0,
    scrollTop: 0,
    isUpSliding: 0,
    isDownSliding: 0,
    icons:{
      condition:'/image/ico/shaixuan/shaixuan.png'
    }
  },
  onLoad: function () {
    this.getMoreList()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onReady:function(){
    console.log(this.data)
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
      list:[],
      maxTime: "",
      isNoMoreData:0
    })
    this.getMoreList()
  },
  onCancel() {
  },
  onClear() {
  },
  //列表事件
  getMoreList(isbottom){
    var that = this
    //当没有更多数据时执行操作
    if(that.data.isNoMoreData){
    }
    //加载更多数据
    else{
      wx.showLoading({
        title: '努力加载中',
        mask:true
      })
      var data = {
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
      console.log(data)
      wx.request({
        url: Apis.Urls.GetRecruits,
        data: data,
        method: 'post',
        dataType: "application/json",
        success: function (result) {
          result = JSON.parse(result.data)
          for (var index in result.jobs) {
            result.jobs[index].createTime = util.formatstrToShortStr(result.jobs[index].createTime)+'发布'
            var indexString = 'list[' + that.data.list.length + ']'
            that.setData({
              [indexString]: result.jobs[index]
            })
          }
          console.log(that.data.list) // 对应数据填补去work-item里面的wxml调
          that.setData({
            page:that.data.page+1,
            maxTime: result.minTime
          })

          if (isbottom == 1){
            //当没有更多数据
            if (result.jobs.length < that.data.count) {
              that.setData({
                isNoMoreData:1
              })
            }
          }

          wx.hideLoading()
          wx.stopPullDownRefresh()
          
        }
      })
    }
  },
  onClickItem:function(e){
  },
  selectCondition:function(){
    var conditionStr = JSON.stringify(this.data.condition) 
    wx.navigateTo({
      url: 'codition/condition?conditionStr=' + conditionStr,
    })
  },
  clearCondition: function(){
    this.setData({
      condition: {
        key: "",
        type: "",
        city: -1,
        cityName: "",
        isExistsIntroCode: -1
      },
    })
    this.onSearch()
  },
  //页面事件
  onPageScroll: function (e) {//监听页面滚动
    //上滑
    if(e.scrollTop >this.data.scrollTop){
      this.setData({
        isDownSliding:1,
        isUpSliding:0
      })
    }
    //下滑
    else{
      this.setData({
        isDownSliding: 0,
        isUpSliding: 1
      })
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onPullDownRefresh:function(){
    this.onSearch()
  },
  onReachBottom:function(){
    this.getMoreList(1)
  },

  openNewWork: function() {
    if (app.globalData.userInfo.id == 0){
      wx.showToast({
        title: '请先授权登录',
        icon: 'none',
      })
    }else{
      wx: wx.navigateTo({
        url: 'newwork/index',
      })
    }
  }

})