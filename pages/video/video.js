import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:"",
    videoList:[],
    videoId:'',
    videoUpdataTime:[],//记录视频播放的时长
    isTriggered:false//标识下拉刷新是否被触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData();
  },

// 获取视频导航数据
async getVideoGroupListData(){
  let viderGroupListData = await request('/video/group/list');
  this.setData({
    videoGroupList: viderGroupListData.data.slice(0,14),
    //获取初始id
    navId: viderGroupListData.data[0].id,
  })
  // 需要有id才能获取当前视频列表
  this.getVideoListData(this.data.navId);
},

// 点击切换导航active
changeNav(event){
  let navId = event.currentTarget.id;
  this.setData({
    navId,
    videoList:[]
  })
  // 显示加载提示
  wx.showLoading({
    title: '正在加载...',
  })
  // 动态获取当前导航对应的视频数据
  this.getVideoListData(this.data.navId);
}, 

// 获取视频数据
async getVideoListData(id){
  let videoListData = await request('/video/group',{id});
  // 关闭加载提示框
  wx.hideLoading();
  this.setData({
    videoList: videoListData.datas,
    isTriggered:false,
  })
},

// 处理一次只能播放一个视频，播放/继续播放
handlePlay(event){
  // 播放新视频之前需要关闭之前播放的视频
  let vid = event.currentTarget.id;

  // 关闭上一次的视频
  this.vid != vid && this.videoContext && this.videoContext.stop();
 
  this.vid = vid;
  // 更新视频id
  this.setData({
    videoId:vid,
  })
   // 创建video标签的实例对象
  this.videoContext = wx.createVideoContext(vid);
  // 进行从哪开始播放的判断
  let { videoUpdataTime} = this.data;
  let videoItem = videoUpdataTime.find(item=>item.vid === vid);
  // 如果之前播放过，则继续播放
  if(videoItem){
    this.videoContext.seek(videoItem.currentTime)
  }
  this.videoContext.play();
},

// 监听视频播放进度
handleTimeUpdata(event){
  let videoTimeObj = {
    vid:event.currentTarget.id,
    currentTime:event.detail.currentTime
    }
  let { videoUpdataTime} = this.data;
  // 判断当前播放的视频之前是否播放过
  let videoItem = videoUpdataTime.find(item=>item.vid === videoTimeObj.vid);
  // 如果播放过，直接记录当前播放位置
  if(videoItem){
    videoItem.currentTime = event.detail.currentTime;
  } else {
    videoUpdataTime.push(videoTimeObj);
  }

  this.setData({
    videoUpdataTime
  })
},

// 视频播放结束的回调
  handleEnded(event){
    // 要移除记录播放时长数组中当前视频的对象
    let { videoUpdataTime} = this.data;
    let index = videoUpdataTime.findIndex(item=>item.id===event.currentTarget.id);
    videoUpdataTime.splice(index,1);
    this.setData({
      videoUpdataTime
    })
  },

  // 下拉刷新回调
  handleRefresher(){
    // 目的就是要再次发数据请求
    this.getVideoListData(this.data.navId);
  },

  // 上拉处理
  handleToLower(){
    console.log("发送请求 || 在前端截取最新的数据追加到视频列表的后方");
    // 模拟数据
    let newVideoList = [
      
    ]
  },

// 跳转到搜索页面
toSearch(){
  wx.reLaunch({
    url: '/pages/search/search',
  })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面的下拉刷新')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面的上拉刷新')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})