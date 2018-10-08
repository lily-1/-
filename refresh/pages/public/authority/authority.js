//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    toastHidden: true
  },
  onShow: function () {
    
  },
  onGotUserInfo: function (e) {
    wx.setStorageSync('userInfo', e.detail)
  },
 
  /**链接 */
  bindCheckout: function () {
    wx.navigateTo({
      url: '../confirm_order/confirm_order',
    })
  }
})


