// pages/shopcar/shopcar.js
var app = getApp()
var getLunBoList = require("../../common/js/getLunBo.js");
var cart = require("../../common/js/cart.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headImageUrl: app.globalData.headImageUrl,
    // 轮播图所需参数 start
    autoplay: true,
    interval: 2000,
    duration: 1000,
    baseUrl: app.globalData.baseUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用轮播图
    wx.showToast({
      title: '正在请求…',
      icon: "loading"
    })  
    var that = this
    getLunBoList.getLunBoList(that, 1);
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getYiYuanCaiList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })  
        if (res.data.success == true)
        {
          that.setData({
            list: res.data.list
          })
        }
        else
        {
          that.setData({
            list: res.data.list
          })
        }
      }
    })
  },
  addCart: function (e) {
    var that = this;
    cart.addCart(that, e)
    console.log(e);
    console.log('22222222')
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
  
  },
  // 链接
  detailURL: function (e) {
    wx.navigateTo({
      url: '../choujiandetail/choujiandetail?goods_id=' + e.currentTarget.id
    })
  },
})