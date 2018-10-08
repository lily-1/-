// pages/shopdetail/shopdetail.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    autoplay: true,
    interval: 2000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var goods_id = options.goods_id;
    var goods_supplier_id = options.goods_supplier_id;
    wx.request({
      url: app.globalData.webUrl + 'order.php?act=getOrderDtail',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        goods_id: goods_id,
        goods_supplier_id: goods_supplier_id
      },
      method: 'POST',
      success: function (res) {
        WxParse.wxParse('content', 'html', res.data.info.goods_descA, that, 10);
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        if (res.data.success == true) {
          that.setData({
            info: res.data.info
          })
        }
        else
        {
          that.setData({
            info: res.data.info
          })
        }
      }
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
  
  },
  // 链接
  car_url: function () {
    wx.switchTab({
      url: '../car/car'
    })
  },
})