// components/worklist/work-item/index.js
const app = getApp()

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
      //console.log(edata)
      wx:wx.navigateTo({
        url: '/pages/worklist/work/work?workInfo=' + edata,
      })
    }
  },
})
