// pages/worklist/codition/condition.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:null,
    screen:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      condition: JSON.parse(options.conditionStr),
      screen: app.globalData.screen
    })
  },
  chooseJobType:function(e){
    if (this.data.condition.type == e.currentTarget.dataset.name){
      this.data.condition.type = ""
    }else{
      this.data.condition.type = e.currentTarget.dataset.name
    }
    this.setData({
      condition:this.data.condition
    })
  },
  chooseCity:function(e){
    if (this.data.condition.city == e.currentTarget.dataset.id){
      this.data.condition.city = -1
    }else{
      this.data.condition.city = e.currentTarget.dataset.id
    }
    this.setData({
      condition: this.data.condition
    })
  },
  chooseIntroCode:function(e){
    if (this.data.condition.isExistsIntroCode == e.currentTarget.dataset.value){
      this.data.condition.isExistsIntroCode = -1
    }else{
      this.data.condition.isExistsIntroCode = e.currentTarget.dataset.value
    }
    this.setData({
      condition: this.data.condition
    })
  },
  onSave:function(){
    var pages = getCurrentPages()
    var prePage = pages[pages.length - 2]
    prePage.setData({
      condition: this.data.condition
    })
    console.log(prePage.data)
    wx.navigateBack({

    })
  }
})