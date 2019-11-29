// pages/workprogress/detail/index.js
var app = getApp()
const Apis = require('../../../utils/api.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      "interview": {
        "id": 1,
        "jobId": 2,
        "companyName": "sample string 3",
        "jobName": "sample string 4",
        "state": 5,
        "createTime": "2019-11-28T15:38:35.6166762+08:00",
        "updateTime": "2019-11-28T15:38:35.6166762+08:00",
        "companyId": 1,
        "uid": "sample string 6"
      },
      "interviewSteps": [
        {
          "id": 1,
          "interviewId": 1,
          "date": "2019-11-28T15:38:35.6176506+08:00",
          "description": "sample string 2",
          "createTime": "2019-11-28T15:38:35.6176506+08:00"
        },
        {
          "id": 1,
          "interviewId": 1,
          "date": "2019-11-28T15:38:35.6176506+08:00",
          "description": "sample string 2",
          "createTime": "2019-11-28T15:38:35.6176506+08:00"
        }
      ],
      "State": 1,
      "Message": "sample string 2"
    },
    steps: [
      {
        text: '步骤一',
        desc: '描述信息阿萨德撒大多撒多按时大大爱上大发电房'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ],
    active: 4,
    show: false,
    date: '',
    description: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  changeState(e) {
    var detail = this.data.detail
    detail.interview.state = e.currentTarget.dataset.state
    this.setData({
      detail: detail
    })
    console.log(this.data.detail.interview.state)
  },
  //点击更新进度按钮
  showCustomDialog() {
    this.setData({
      show: true,
      date: util.formatTime(new Date()).substring(0, 10),
      description: ''
    });
  },
  //关闭dialog
  onClose(event) {
    this.setData({
      show: false
    });
  },
  //dialog添加按钮事件
  addStep() {
    console.log('addstep')
    var that = this
    console.log(that.data)
    var newstep = {
      "id": 0,
      "interviewId": 0,
      "date": that.data.date,
      "description": that.data.description,
      "createTime": ""
    }
    var newpagestep = {
      text: that.data.date,
      desc: that.data.description
    }
    var detail = that.data.detail
    var steps = that.data.steps
    detail.interviewSteps[detail.interviewSteps.length] = newstep
    steps[steps.length] = newpagestep
    var nowstepnum = steps.length
    that.setData({
      detail: detail,
      steps: steps,
      active: nowstepnum
    })
    console.log(that.data.detail)
  },
  //改变描述事件
  chengeDescription(e) {
    this.setData({
      description: e.detail
    })
  },
  //日期选择器选择事件
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})