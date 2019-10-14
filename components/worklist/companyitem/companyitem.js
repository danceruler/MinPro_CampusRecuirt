// components/worklist/companyitem/companyitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyId:{
      type: String,
      value:0
    },
    imgUrl: {
      type: String,
      value: ''
    },
    companyName: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgUrl:'',
    // companyName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclickItem(){
      console.log(this.data)

      var pages = getCurrentPages()
      var prePage = pages[pages.length - 2]
      prePage.setData({
        companyName: this.data.companyName,
        companyId:this.data.companyId
      })
      wx.navigateBack({

      })
    }
  }
})
