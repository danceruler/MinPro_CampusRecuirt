// pages/worklist/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobDes: `
        岗位职责：
          1、以项目运作和支撑为主要职责；
          2、参与通信运营商管理提升类项目，负责各类前端采集数据的整理和统计、分析工作；
        任职资格：
          1、本科学历，数学、统计学或相关领域的专业及经验背景优先；
          2、具备一定的数据统计分析能力；熟练掌握EXCEL等统
        计计算工具的用法；
          3、较强沟通与文字应用能力；
          4、工作认真踏实，能承受一定的工作压力；责任心强，团队合
        作精神强`,
    
  },

  onLoad: function(options) {
    this.setData({
      workInfo: options.workInfo
    })
  }
})