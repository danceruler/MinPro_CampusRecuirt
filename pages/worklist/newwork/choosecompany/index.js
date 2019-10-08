// pages/worklist/newwork/choosecompany/index.js
var app = getApp()
const Apis = require('../../../../utils/api.js')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    myList:[],
    allList:[]
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

  onSearch(){
    var that = this
    that.setData({
      list:[]
    })
    var data = {
      "key": this.data.key,
      "page": 1,
      "count": 100,
      "uid": app.globalData.uid,
      "userId": app.globalData.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret(),
    }
    wx.showLoading({
      title: '正在加载',
      mask:true
    })
    wx.request({
      url: Apis.Urls.SearchCompany,
      method:'post',
      data:data,
      dataType:'application/json',
      success:function(result){
        result = JSON.parse(result.data)
        console.log(result)
        for(var index in result.myPublishCompanies){
          var indexString = 'myList[' + that.data.myList.length + ']'
          that.setData({
            [indexString]: result.myPublishCompanies[index]
          })
        }
        for (var index in result.resultCompanies) {
          var indexString = 'allList[' + that.data.allList.length + ']'
          that.setData({
            [indexString]: result.resultCompanies[index]
          })
        }
        wx.hideLoading()
      }
    })
  }
})