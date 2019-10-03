// components/user/user-buttons/index.js
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
    list: [
      {
        name: '我的收藏',
        iconPath: '/image/user.png',
        riconPath: '/image/right_arrow.png',
        info: '您收藏的都在这',
        url: '/pages/usercollect/index'
      },
      {
        name: '我的发布',
        iconPath: '/image/user.png',
        riconPath: '/image/right_arrow.png',
        info: '您发布的都在这',
        url: '/pages/userpublish/index'
      },
      {
        name: '浏览历史',
        iconPath: '/image/user.png',
        riconPath: '/image/right_arrow.png',
        info: '您浏览过的求职信息',
        url: '/pages/userhistory/index'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openNewPage: function(e){
      wx:wx.navigateTo({
        url: e.target.dataset.url
      })
    },
  }
})
