// app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          //获取请求头信息
          if (wx.getStorageSync('session_id')) {
            wx.removeStorageSync('session_id');
          }
          wx.request({
            url: that.globalData.webUrl + 'login.php?act=getHeader',
            success: function (res) {
              that.globalData.userInfo = wx.getStorageSync('userInfo');
              var session_id = res.data;
              wx.setStorage({
                key: 'session_id',
                data: session_id,
              })
              wx.request({
                url: that.globalData.webUrl + 'login.php?act=sessionKey',
                data: {
                  code: code,
                  encryptedData: that.globalData.userInfo.encryptedData,
                  iv: that.globalData.userInfo.iv,
                  AppID: that.globalData.AppID,
                  AppSecret: that.globalData.AppSecret,
                  session_id: session_id
                },
                // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                method: 'GET',
                //设置请求的 header
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id
                },
                success: function (res) {
                  wx.setStorage({
                    key: 'openid',
                    data: res.data.openid,
                  })
                }
              })
            }
          })
        } else {
          console.log('获取code失败');
        }
      }, fail: function () {
        console.log('登录失败');
      }
    })
  },
  globalData: {
    AppID: 'wx4f40833108e719fa',
    AppSecret: 'ce601176453508949f9af3411a1d2a3f',
    mch_id: '1356652002',
    mch_key: 'eqweqwq32JJnJKHuihwqiehwqeiwqeiw',
    openid: null,
    userInfo: null, //用户信息
    baseUrl: 'https://www.lsxian.cn/',
    webUrl: 'https://www.lsxian.cn/xiaochengxuKeHu/',
    headImageUrl: 'https://www.lsxian.cn/data/afficheimg/',
    cateImageUrl: 'https://www.lsxian.cn/data/catflashimg/',
    autoplay: true,
    interval: 1000,
    powerBy: " 技术支持：Mr.sanike;18856423648",
    classifyList: {},  //商品列表
    carts: [],       //购物车信息
    cartTotal: 0,     //购物车数量
    cartTotalPrice: 0,  //购物车价值
    cartAllIn: false,   //购物车是否全选
    cat_id:''
  }
})