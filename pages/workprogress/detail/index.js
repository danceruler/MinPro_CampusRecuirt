// pages/workprogress/detail/index.js
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
        desc: '描述信息'
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
    active:4,
    show:false
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

  changeState(e){
    var detail = this.data.detail
    detail.interview.state = e.currentTarget.dataset.state
    this.setData({
      detail: detail
    })
    console.log(this.data.detail.interview.state)
  },

  showCustomDialog(){
    this.setData({ show: true });
  },
  onClose(event) {
    this.setData({
      show: false
    });
  },
  addStep() {
    console.log('addstep')
  },
})