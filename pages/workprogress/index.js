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
      isExistsIntroCode: -1,
      addflag: true,  //判断是否显示搜索框右侧部分
      addimg: '../../image/ico/close/close.png',
      searchstr: 'sadsad',
    },
    page: 1,
    count: 10,
    navbar: ['进行中', '拿offer', '已被拒'],
    currentTab: 0,
    scrollTop:0,
    doinglistPage:1,
    successlistPage:1,
    faillistPage:1,
    isDoingListBottom:0,
    isSuccessListBottom: 0,
    isFailListBottom: 0,
    doinglist:[

    ],
    successlist:[

    ],
    faillist:[

    ]
  },
  onLoad: function () {
    var that = this
    this.loadDoingList()
    // this.createInterview()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  navbarTap: function (e) {
    var that = this
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(that.data.currentTab)
    var nowTab = that.data.currentTab
    switch (nowTab) {
      case 0:
        if (that.data.doinglist.length == 0) {
          that.loadDoingList()
        }
        break
      case 1:
        if (that.data.successlist.length == 0) {
          that.loadSuccessList()
        }
        break
      case 2:
        if (that.data.faillist.length == 0) {
          that.loadFailList();
        }
        break;
      default:
        break;
    }
  },

  //页面事件
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  onPullDownRefresh: function () {
    var that = this
    var nowTab = that.data.currentTab
    switch (nowTab) {
      case 0:
        that.setData({
          doinglist: [],
          isDoingListBottom:0,
          doinglistPage:1
        })
        that.loadDoingList()
        break
      case 1:
        that.setData({
          successlist: [],
          isSuccessListBottom:0,
          successlistPage:1
        })
        that.loadSuccessList()
        break
      case 2:
        that.setData({
          faillist: [],
          isFailListBottom: 0,
          faillistPage: 1
        })
        that.loadFailList();
        break;
      default:
        break;
    }
  },
  loadDoingList: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var requestDate = {
      "page": that.data.doinglistPage,
      "count": 10,
      "state":1,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    
    //console.log(JSON.stringify(requestDate))
    wx.request({
      url: Apis.Urls.ListInterview,
      data: requestDate,
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        result = JSON.parse(result.data)
        console.log(result)
        for (var index in result.interviews) {
          result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime)
          //result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime) + '发布'
          var indexString = 'doinglist[' + that.data.doinglist.length + ']'
          that.setData({
            [indexString]: result.interviews[index]
          })
        }
        
        if (result.interviews.length < 10){
          that.data.isDoingListBottom = 1;
        }

        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  loadSuccessList: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var requestDate = {
      "page": that.data.successlistPage,
      "count": 10,
      "state": 2,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.request({
      url: Apis.Urls.ListInterview,
      data: requestDate,
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        result = JSON.parse(result.data)
        console.log(result)
        for (var index in result.interviews) {
          result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime)
          //result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime) + '发布'
          var indexString = 'successlist[' + that.data.successlist.length + ']'
          that.setData({
            [indexString]: result.interviews[index]
          })
        }

        if (result.interviews.length < 10) {
          that.data.isSuccessListBottom = 1;
        }

        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  loadFailList: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var requestDate = {
      "page": that.data.faillistPage,
      "count": 10,
      "state": 0,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.request({
      url: Apis.Urls.ListInterview,
      data: requestDate,
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        result = JSON.parse(result.data)
        console.log(result)
        for (var index in result.interviews) {
          result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime)
          //result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime) + '发布'
          var indexString = 'faillist[' + that.data.faillist.length + ']'
          that.setData({
            [indexString]: result.interviews[index]
          })
        }

        if (result.interviews.length < 10) {
          that.data.isFailListBottom = 1;
        }

        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom:function(){
    var that = this
    console.log(that.data.currentTab)
    var nowTab = that.data.currentTab
    switch(nowTab){
      case 0:
        if(that.data.isDoingListBottom == 0){
          that.loadDoingList()
        }
        break
      case 1:
        if (that.data.isSuccessListBottom == 0){
          that.loadSuccessList()
        }
        break
      case 2:
        if (that.data.isFailListBottom == 0){
          that.loadFailList();
        }
        break;
      default:
        break;
    }

  },




  createInterview:function(){
    var requestDate = {
      "interview": {
        "id": 0,
        "jobId": 37,
        "companyName": "123",
        "jobName": "2",
        "state": 2,
        "createTime": "",
        "updateTime": "",
        "companyId": 9,
        "uid": app.globalData.userInfo.uid,
      },
      "interviewSteps": [
        {
          "id": 0,
          "interviewId": 0,
          "date": "2019-11-20T20:03:53.8404428+08:00",
          "description": "test",
          "createTime": ""
        }
      ],
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.request({
      url: Apis.Urls.CreateInterview,
      data: requestDate,
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        console.log(result.data)
      }
    })
  },
  //儿子的同步请求测试方法
  async api() {
    let request = (time) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(time)
        }, time)
      })
    }
    let res = []
    let a1 = await request(1000)
    res.push(a1)
    let a2 = await request(500)
    res.push(a2)
    let a3 = await request(2000)
    res.push(a3)
    return res
  },
  async testapi() {
    this.api().then(res => {
      console.log(res)
    })
  },

})