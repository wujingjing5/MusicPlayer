import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取表单内容
  handleInput(event){
// console.log(event)
    let type = event.currentTarget.id;
    this.setData({
      [type]:event.detail.value,
    })
  },
  // 登录事件
  async login(){
    let {phone, password} = this.data;
    // 前端验证
    if(!phone){
      wx.showToast({
        title: '账号不能为空',
        icon: "none"
      })
      return;
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式不正确，请确认',
        icon:'none'
      })
      return;
    }
    // 手机号正确，验证密码
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:'none'
      })
      return;
    }
    
    // 后端验证/login/cellphone
    let result = await request('/login/cellphone',{phone,password,isLogin:true});
    // console.log(result);
    if(result.code == 200){
      // 请求成功
      wx.showToast({
        title: '登录成功',
        icon:'none'
      })
      console.log(result);
      // 将用户信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile));
      // 跳转到个人中心页面
      wx.reLaunch({
        url: '/pages/personal/personal',

      })

    } else if (result.code==400) {
      // 手机号错误
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })

    } else if (result.code==502){
      // 密码错误
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })

    } else {
      // 其他错误
      wx.showToast({
        title: '登录失败，请重新登录',
        icon:'none'
      })
    }

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