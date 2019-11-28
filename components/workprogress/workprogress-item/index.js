// components/workprogress/workprogress-item/index.js
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
    onclick: function (e) {
      let edata = JSON.stringify(e.currentTarget.dataset.data)
      console.log(edata)
      wx: wx.navigateTo({
        url: '/pages/workprogress/detail/index',
      })
    }
  }
})
