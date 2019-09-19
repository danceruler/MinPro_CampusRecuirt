//app.js
App({ 
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.myLogin()
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
  },
  globalData: {
    userInfo: null,
    testApiDomain:'http://localhost:60461/',
    myApiDomain:'https://wxloginapi.820803.xyz/'
  },
  myLogin: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var iv = res.iv
        var encryptedData = res.encryptedData
        wx.login({
          success: function (res) {
            wx.request({
              url: that.globalData.myApiDomain+'api/WxLogin?appid=wxeb64182a8c14a216&secret=987defe5cd1ef5e1b1728fab4e53c730&iv=' + iv + '&secretCode=' + encryptedData + '&code=' + res.code,
              method: 'post',
              dataType: "application/json",
              success: function (data) {
                console.log(JSON.parse(data.data))
                if(JSON.parse(data.data).State == 0){
                  that.myLogin()
                }
              },
              fail:function(){
                this.myLogin()
              }
            })
          }
        })
      }
    })
  }
})