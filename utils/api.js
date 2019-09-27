const domain = 'https://wxloginapi.820803.xyz/'

const Apis = {
  //接口文档地址https://wxloginapi.820803.xyz/help
  //修改用户信息
  'ChangeUserInfo': domain+'api/UserCenter/ChangeUserInfo',
  //上传用户头像
  'UploadHeadImg': domain + 'api/UserCenter/UploadHeadImg',
  //我的收藏
  'MyCollect': domain + 'api/UserCenter/MyCollect',
  //我的浏览历史
  'MyHistory': domain + 'api/UserCenter/MyHistory',
  //我发布的职位
  'MyPublishRecruits': domain + 'api/UserCenter/MyPublishRecruits',
  //新增公司信息
  'AddCompany': domain + 'api/Company/AddCompany',
  //上传公司图片
  'UploadCompanyImg': domain + 'api/Company/UploadCompanyImg',
  //搜索公司信息
  'SearchCompany': domain + 'api/Company/SearchCompany',
  //新增或修改面试进度
  'CreateInterview': domain + 'api/Interview/CreateInterview',
  //根据关键字获取收藏的job
  'SearchInCollect': domain + 'api/Interview/SearchInCollect',
  //面试进度列表
  'ListInterview': domain + 'api/Interview/ListInterview',
  //获取面试进度详细信息
  'InterViewDetail': domain + 'api/Interview/InterViewDetail',
  //用户发布校招信息
  'PublishRecruit': domain + 'api/Recruit/PublishRecruit',
  //获取校招信息
  'GetRecruits': domain + 'api/Recruit/GetRecruits',
  //获取详细校招信息(同时记录为用户的足迹)
  'GetRecruitDetail': domain + 'api/Recruit/GetRecruitDetail',
  //添加或取消收藏
  'ChangeCollect': domain + 'api/Recruit/ChangeCollect'
}



module.exports = {
  Urls: Apis
}

