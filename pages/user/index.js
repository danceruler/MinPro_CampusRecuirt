// pages/user/index.js
import Page from '../../common/page'
import Toast from '../../dist/toast/toast'

var app = getApp()

Page({
  onLoad:function(){
    var that = this
    if (app.globalData.isLogin == 1) {
      app.myLogin(this)
    }else{
      // 获取用户授权信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            app.myLogin(that)
          } else {
            //没有获取授权的事件
          }
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.setData({
      user: app.globalData.userInfo
    })
  },
  data:{
    isLogin:0,
    user:null,
    basic: false,
    minDate: new Date(2018, 0, 1).getTime(),
    currentDate1: new Date(2018, 2, 31).getTime(),
    loading: false
  }, 
  getUserInfo: function (e) {
    app.myLogin(this)
    this.onShow()
  },
  toggle(type, show) {
    this.setData({
      [`show.${type}`]: show
    });
  },
  showBasic() {
    this.toggle('basic', true);
  },
  hideBasic() {
    this.toggle('basic', false);
  },
  showTop() {
    this.toggle('top', true);
  },

  hideTop() {
    this.toggle('top', false);
  },

  showLeft() {
    this.toggle('left', true);
  },

  hideLeft() {
    this.toggle('left', false);
  },

  showRight() {
    this.toggle('right', true);
  },

  hideRight() {
    this.toggle('right', false);
  },

  showBottom() {
    this.toggle('bottom', true);
  },

  hideBottom() {
    this.toggle('bottom', false);
  },

  onInput(event) {
    const { detail, currentTarget } = event;
    const result = this.getResult(detail, currentTarget.dataset.type);
    Toast(result);
  },

  getResult(time, type) {
    const date = new Date(time);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return time;
      default:
        return '';
    }
  }
})