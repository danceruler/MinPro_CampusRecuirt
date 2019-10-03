// pages/worklist/newwork/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positiontypes: [
      { id: 0, name: '产品' },
      { id: 1, name: '技术' },
      { id: 2, name: '运营' },
      { id: 3, name: '设计' },
      { id: 4, name: '市场' },
      { id: 5, name: '职能' },
    ],
    cities: [
      { id: 0, name: '北京' },
      { id: 1, name: '上海' },
      { id: 2, name: '广州' },
      { id: 3, name: '深圳' },
      { id: 4, name: '杭州' },
      { id: 5, name: '其他' },
    ],
    typeindex: 0,
    cityindex: 0,
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },


  bindTypeChange: function(e) {
    this.setData({
      typeindex: e.detail.value
    })
  },
  bindCityChange: function (e) {
    this.setData({
      cityindex: e.detail.value
    })
  },
})