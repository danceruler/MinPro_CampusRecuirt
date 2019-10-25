// pages/worklist/newwork/index.js
var app = getApp()
const util = require('../../../utils/util.js')
const Apis = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positiontypes: [
      {
        id: 1,
        name: "产品"
      },
      {
        id: 2,
        name: "技术"
      },
      {
        id: 3,
        name: "运营"
      },
      {
        id: 4,
        name: "设计"
      },
      {
        id: 5,
        name: "市场"
      },
      {
        id: 6,
        name: "职能"
      }
    ],
    cities: [
      {
        id: 1,
        name: "北京"
      },
      {
        id: 2,
        name: "上海"
      },
      {
        id: 3,
        name: "深圳"
      },
      {
        id: 4,
        name: "广州"
      },
      {
        id: 5,
        name: "杭州"
      },
      {
        id: 6,
        name: "其它"
      }
    ],
    typeindex: 1,
    cityindex: 1,
    "companyName": "",
    "companyId": 0,
    "jobName": "",
    "jobTypes": "",
    "cityId": 0,
    "officialWeb": "",
    "isExistsIntroCode": 0,
    "IntroCode": "",
    "jobDescription": "",
  },

  onShow:function(){
    console.log(this.data)
  },

  formSubmit: function (e) {
    var that = this
    var requestData = {
      "companyName": that.data.companyName,
      "companyId": that.data.companyId,
      "jobName": that.data.jobName,
      "jobTypes": that.data.typeindex > 0 ? that.data.positiontypes[that.data.typeindex].name:'',
      "city": that.data.cityindex > 0 ? that.data.cities[that.data.cityindex].name : '',
      "cityId": that.data.cityindex > 0 ? that.data.cities[that.data.cityindex].id : 0,
      "officialWeb": that.data.officialWeb,
      "isExistsIntroCode": that.data.IntroCode==''?0:1,
      "IntroCode": that.data.IntroCode,
      "jobDescription": that.data.jobDescription,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret(),
    }
    console.log(requestData)
    if (requestData.companyId == 0){
      return this.errorToast("未选择公司")
    }
    if (requestData.jobName == '') {
      return this.errorToast("未填写工作名称")
    }
    if (requestData.jobDescription == '') {
      return this.errorToast("未填写工作名称描述")
    }
    wx.showLoading({
      title: '正在提交',
      mask:true
    })
    wx.request({
      url: Apis.Urls.PublishRecruit,
      method: 'post',
      data: requestData,
      dataType: 'application/json',
      success: function (result) {
        result = JSON.parse(result.data)
        if (result.State == 0){
          wx.showToast({
            title: result.Message,
          })
        }else{
          wx.navigateBack({
            
          })
          wx.showToast({
            title: '上传成功',
          })
        }
        wx.hideLoading()
      }
    })
  },
  formReset: function () {
  },
  chooseCompany:function(){
    wx.navigateTo({
      url: 'choosecompany/index',
    })
  },


  bindTypeChange: function(e) {
    console.log(e.detail)
    this.setData({
      typeindex: e.detail.value
    })
  },
  bindCityChange: function (e) {
    this.setData({
      cityindex: e.detail.value
    })
  },
  positionNameChange:function(e){
    this.setData({
      jobName: e.detail.value
    })
  },
  officialWebChange: function (e) {
    this.setData({
      officialWeb: e.detail.value
    })
  }, 
  IntroCodeChange: function (e) {
    this.setData({
      IntroCode: e.detail.value
    })
  },
  jobDescriptionChange: function (e) {
    this.setData({
      jobDescription: e.detail.value
    })
  },
  errorToast(msg){
    wx.showToast({
      title: msg,
    })
  }
})