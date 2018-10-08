// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var userData = wx.getStorageSync('userData')
    that.getCountYouhuijuan()
    //获取充值卡
    that.getChongZhiCard();
    that.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      userData: userData
    })
    
    console.log(userInfo);
  },

  getCountYouhuijuan: function () {
    var that = this
    wx.request({
      url: app.globalData.webUrl + 'yhj.php?act=getCountYouhuijuan',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {},
      method: 'POST',
      success: function (res) {
      
          that.setData({
            yhjNumber: res.data
          })
      
      }
    })
  },

  viewMoreOrder:function(){
    wx.navigateTo({
      url: '/pages/myorder/myorder',
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
  getChongZhiCard:function(){
    var that = this 
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getChongZhiCard',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {},
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        if (res.data.success == true) {
          that.setData({
            cartList: res.data.list
          })
        }
        else {
          that.setData({
            cartList: res.data.list
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  lijichongzhi:function(e)
  {
    console.log(e);
  },
  // 链接
  yhj_URL: function () {
    wx.navigateTo({
      url: '../yhj/yhj'
    })
  },
  // yhj_URL: function () {
  //   wx.navigateTo({
  //     url: '../yhj/yhj'
  //   })
  // },
})