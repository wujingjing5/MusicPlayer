// pages/index/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    topList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 请求banner数据
    let bannerListData = await request('/banner',{type:2});
    // 请求歌单数据
    let recommendListData = await request('/personalized',{limit:10});
    // console.log(recommendListData)
    // 请求排行榜数据
    let index = 0;
    let resultArr = [];
    while(index<5){
      let topListData = await request('/top/list', { idx: index++ });
      let topListItem = {name: topListData.playlist.name,tracks:topListData.playlist.tracks.slice(0,3)};
      resultArr.push(topListItem);
      this.setData({
        topList: resultArr,
      })
    };

    // console.log(topListData)

    this.setData({
      bannerList:bannerListData.banners,
      recommendList: recommendListData.result,
      // topList:resultArr,
    })
  },

// 跳转至recommendsong页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})