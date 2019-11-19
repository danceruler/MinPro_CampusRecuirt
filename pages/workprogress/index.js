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
    navbar: ['进行中', '拿offer', '已被拒'],
    currentTab: 0,
    scrollTop:0,
    list:[
      {
        positionName:1
      },{
        positionName: 2
      },{
        positionName: 3
      },{
        positionName: 4
      },{
        positionName: 5
      },{
        positionName: 6
      }
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