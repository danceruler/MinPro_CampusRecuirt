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
        "id": 0,
        "jobId": 0,
        "companyName": "",
        "jobName": "",
        "state": 1,
        "createTime": "",
        "updateTime": "",
        "companyId": 1,
        "uid": "",
      },
      "interviewSteps": [
        // {
        //   "id": 1,
        //   "interviewId": 1,
        //   "date": "2019-11-28T15:38:35.6176506+08:00",
        //   "description": "sample string 2",
        //   "createTime": "2019-11-28T15:38:35.6176506+08:00"
        // },
        // {
        //   "id": 1,
        //   "interviewId": 1,
        //   "date": "2019-11-28T15:38:35.6176506+08:00",
        //   "description": "sample string 2",
        //   "createTime": "2019-11-28T15:38:35.6176506+08:00"
        // }
      ],
      "uid": "sample string 1",
      "userId": 2,
      "requestTime": "2020-02-10T11:23:28.8430819+08:00",
      "secret": "sample string 4"
    },
    steps: [
    ],
    active: 4,
    show: false,
    popshow:false,
    canchangejobinfo:false,
    date: '',
    description: '',
    collectJobs:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var detail = that.data.detail
    detail.interview.uid = app.globalData.userInfo.uid
    detail.uid = app.globalData.userInfo.uid
    detail.userId = app.globalData.userInfo.id
    this.setData({
      detail:detail
    })

    //请求收藏信息
    var requstData = {
      "page": 1,
      "count": 100,
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
      success: function (result) {
        result = JSON.parse(result.data)
        console.log(result)
        for (var index in result.jobs) {
          result.jobs[index].createTime = util.formatstrToShortStr(result.jobs[index].createTime) + '发布'
          var indexString = 'collectJobs[' + that.data.collectJobs.length + ']'
          that.setData({
            [indexString]: result.jobs[index]
          })
        }

        // if (result.jobs.length < 10) {
        //   that.data.isbottom = 1
        // } else {
        //   that.data.page = that.data.page + 1
        // }
      }
    })
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
  changeCompanyName(e){
    var detail = this.data.detail
    detail.interview.companyName = e.detail
    this.setData({
      detail: detail
    })
  },
  changeJobName(){
    var detail = this.data.detail
    detail.interview.jobName = e.detail
    this.setData({
      detail: detail
    })
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
  save:function(e){
    var data = this.data
    if (data.detail.interview.companyName == ''){
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none'
      })
      return
    }
    if (data.detail.interview.jobName == '') {
      wx.showToast({
        title: '职位名称不能为空',
        icon: 'none'
      })
      return
    }
    if (data.detail.interviewSteps.length == 0){
      wx.showToast({
        title: '至少添加一个进度',
        icon:'none'
      })
      return
    }
    //提交新的面试进度
    var postData = this.data.detail
    postData.requestTime = util.formatTime(new Date())
    postData.secret = app.createSecret()
    console.log(postData)
    wx.request({
      url: Apis.Urls.CreateInterview,
      data: postData,
      method: 'post',
      dataType: "application/json",
      success: function (result) {
        result = JSON.parse(result.data)
        console.log(result)
        if(result.State == 1){
          wx.showToast({
            title: '保存成功',
          })
          //返回主页
          wx.navigateBack({
            
          })

        }else{
          wx.showToast({
            title: '服务器异常，请稍后再试',
            mask:'fail'
          })
        }
      }
    })
  },
  showPopup(){
    this.setData({
      popshow: true
    })
  },
  closePopup(){
    this.setData({
      popshow:false
    })
  },
  choosecollect(e){
    var tempdata = this.data
    // console.log(e.currentTarget.dataset.item)
    tempdata.canchangejobinfo = true
    tempdata.detail.interview.jobId = e.currentTarget.dataset.item.id
    tempdata.detail.interview.companyId = e.currentTarget.dataset.item.companyId
    tempdata.detail.interview.jobName = e.currentTarget.dataset.item.jobName
    tempdata.detail.interview.companyName = e.currentTarget.dataset.item.companyName
    this.setData({
      canchangejobinfo: tempdata.canchangejobinfo,
      detail: tempdata.detail,
      popshow: false
    })
    console.log(this.data)
  }
})