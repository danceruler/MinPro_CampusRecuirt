// pages/worklist/work/work.js
const util = require('../../../utils/util.js')
const app = getApp()
const Apis = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobDes: `
        岗位职责：
          1、以项目运作和支撑为主要职责；
          2、参与通信运营商管理提升类项目，负责各类前端采集数据的整理和统计、分析工作；
        任职资格：
          1、本科学历，数学、统计学或相关领域的专业及经验背景优先；
          2、具备一定的数据统计分析能力；熟练掌握EXCEL等统
        计计算工具的用法；
          3、较强沟通与文字应用能力；
          4、工作认真踏实，能承受一定的工作压力；责任心强，团队合
        作精神强`,
    workInfo: {
      "id": 1,
      "companyName": "sample string 2",
      "jobName": "sample string 3",
      "jobTypes": "sample string 4",
      "city": "",
      "cityId": 1,
      "deliverEmail": "sample string 6",
      "officialWeb": "sample string 7",
      "isExistsIntroCode": 1,
      "IntroCode": "sample string 8",
      "jobDescription": "sample string 9",
      "publishUserId": "sample string 10",
      "companyId": 1,
      "createTime": "2019-10-25T11:13:02.1646313+08:00",
      "companyImg": "sample string 11"
    },
    isCollect:0
  },

  onLoad: function(options) {
    var that = this
    var workinfo = JSON.parse(options.workInfo)
    console.log(app.globalData.screen)
    workinfo.city = workinfo.cityId == 0 ? '' : app.globalData.screen.cities[workinfo.cityId-1].name
    this.setData({
      workInfo: workinfo
    })

    //记录足迹
    var requestData = {
      "recruitId": that.data.workInfo.id,
      "isRecord": 1,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.request({
      url: Apis.Urls.GetRecruitDetail,
      method:'post',
      data:requestData,
      dataType:"application/json",
      success:function(result){
        result = JSON.parse(result.data)
        that.setData({
          isCollect:result.isCollect
        })
      }
    })
  },

  collect:function(){
    var that = this
    if (app.globalData.userInfo.id == 0){
      wx.showToast({
        title: '请您先授权登录',
        icon:'none',
      })
    }else{
      var requestData = {
        "recruitId": that.data.workInfo.id,
        "uid": app.globalData.userInfo.uid,
        "userId": app.globalData.userInfo.id,
        "requestTime": util.formatTime(new Date()),
        "secret": app.createSecret()
      }
      wx.request({
        url: Apis.Urls.ChangeCollect,
        method: 'post',
        data: requestData,
        dataType: "application/json",
        success: function (result) {
          result = JSON.parse(result.data)
          if(result.State == 1){
            wx.showToast({
              title: result.isCollect == 1?'收藏成功':'取消收藏成功',
            })
            that.setData({
              isCollect: result.isCollect
            })
          }else{
            wx.showToast({
              title: '服务器异常，请联系管理员',
            })
          }
        }
      })
    }
  },

  copyText:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.copytext,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  }

})