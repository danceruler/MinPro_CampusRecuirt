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
    var that = this;
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
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //页面事件
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  loadDoingList: function(){
    var that = this
    var requestDate = {
      "page": doinglistPage,
      "count": 10,
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
        result = JSON.parse(result)
        for (var index in result.interviews) {
          //result.interviews[index].createTime = util.formatstrToShortStr(result.interviews[index].createTime) + '发布'
          var indexString = 'doinglist[' + that.data.doinglist.length + ']'
          that.setData({
            [indexString]: result.doinglist[index]
          })
        }
        if (result.interviews.length < 10){
          that.data.isDoingListBottom = 1;
        }
      }
    })
  },
  loadSuccessList: function(){

  },
  loadFailList: function(){

  },
  onReachBottom:function(){
    console.log(this.data.currentTab)
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