// 引入服务器
import config from './config.js'
// 发送Ajax请求
export default (url,data={},method='GET')=>{
  // new promise初始化promise实例的状态为pending
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync("cookies")?wx.getStorageSync("cookies").find(item =>item.indexOf('MUSIC_U')!==-1):'',
      },
      success: (res) => {
        // console.log(res);
        if(data.isLogin){//登录请求
        // 将用户cookie存入本地
        wx.setStorage({
          key: 'cookies',
          data: res.cookies,
        })

        }
        resolve(res.data);//修改promise状态为成功状态

      },
      fail: (err) => {
        // console.log(err)
        reject(err);//修改promise状态为失败状态
      }
    })
  }
    
  )
}