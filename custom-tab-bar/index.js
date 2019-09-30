// components/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/worklist/index",
        iconPath: "/image/list.png",
        selectedIconPath: "/image/list_HL.png"
      },
      {
        pagePath: "/pages/workprogress/index",
        iconPath: "/image/app.png",
        selectedIconPath: "/image/app_HL.png"
      },
      {
        pagePath: "/pages/user/index",
        iconPath: "/image/user.png",
        selectedIconPath: "/image/user_HL.png"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      //console.log(data)
      const url = data.path
      wx.switchTab({
        url: url,
      })
      this.setData({
        selected: data.index
      })
    }
  }
})
