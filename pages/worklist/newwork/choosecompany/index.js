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
    allList:[],
    showDialog: false,
    icons:{
      close: '../../../../image/ico/close/close(1).png',
      upload:'../../../../image/ico/upload/upload(1).png'
    },
    addCompany:{
      name:'',
      imgUrl:''
    }
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
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
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
  },

  onClickItem(id){
    console.log(id)
  },
  showDialog(){
    this.setData({
      showDialog: true
    });
  },
  closeDialog(){
    this.setData({
      showDialog: false
    });
  },
  uploadImg(){
    var that = this
    var FSM = wx.getFileSystemManager()
    wx.chooseImage({
      success: function(res) {
        if (res.errMsg == "chooseImage:ok"){
          var tempAddCompany = that.data.addCompany
          FSM.readFile({
            filePath: res.tempFilePaths[0],
            encoding: "base64",
            success: function (data) {
              var uploadData = {
                "imgBase64Str": data.data,
                "uid": app.globalData.userInfo.uid,
                "userId": app.globalData.userInfo.id,
                "requestTime": util.formatTime(new Date()),
                "secret": app.createSecret(),
              }
              wx.showLoading({
                title: '图片上传中',
                mask:true
              })
              wx.request({
                url: Apis.Urls.UploadCompanyImg,
                method:'post',
                dataType: "application/json",
                data: uploadData,
                success: function (result){
                  result = JSON.parse(result.data)
                  console.log(result)
                  if(result.State == 0){
                    wx.showToast({
                      title: result.Message,
                    })
                  }else{
                    tempAddCompany.imgUrl = result.Message
                    that.setData({
                      addCompany: tempAddCompany
                    })
                  }
                  wx.hideLoading()
                }
              })
            }
          })
        }
      },
    })
  },
  addCompany(){
    var that = this
    var requestData = {
      "name": this.selectComponent("#addCompanyName").__data__.value,
      "description": "",
      "headUrl": that.data.addCompany.imgUrl,
      "uid": app.globalData.userInfo.uid,
      "userId": app.globalData.userInfo.id,
      "requestTime": util.formatTime(new Date()),
      "secret": app.createSecret()
    }
    wx.showLoading({
      title: '正在添加公司信息',
      mask:true
    })
    wx.request({
      url: Apis.Urls.AddCompany,
      method: 'post',
      data: requestData,
      dataType: 'application/json',
      success: function (result) {
        result = JSON.parse(result.data)
        if(result.State == 0){
          wx.showToast({
            title: result.Message,
          })
        }else{
          that.backPage()
        }
        wx.hideLoading()
      }
    })
  },
  backPage(){
    this.closeDialog()
    this.onSearch()
  }
})