// components/worklist/work-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclick: function (value) {
      let data = JSON.stringify(value)
      wx:wx.navigateTo({
        url: '/pages/worklist/work/work?workInfo=' + data,
      })
    }
  },
})
