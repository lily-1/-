// pages/yhj/yhj.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.baseUrl,
    yhjList:'',
    currentNavtab: "0",
    navTab: ["未使用", "已使用", "已过期"],
  },
  //切换
  switchTab1: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var open_id = wx.getStorageSync('openid')
    var sumNum = wx.getStorageSync('sumNum')
    wx.request({
      url: app.globalData.webUrl + 'yhj.php?act=getyhjList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        open_id: open_id
      },
      method: 'GET',
      success: function (res) {
        var yhjList = res.data;
        console.log(res);

        for (var i = 0; i < yhjList.length;i++)
        {
          if ((yhjList[i]['yhj_status'] == 0) && (sumNum  >= yhjList[i]['min_amount'] ))
          {
            yhjList[i]['canUse'] = 1;
          } else if ((yhjList[i]['yhj_status'] == 0) && (sumNum < yhjList[i]['min_amount']))
          {
            yhjList[i]['canUse'] = 2;
          }
           else if ((yhjList[i]['yhj_status'] == 1))
          {
            yhjList[i]['canUse'] = 3;
          }
          else if ((yhjList[i]['yhj_status'] == 2)) {
            yhjList[i]['canUse'] = 4;
          }
        }
        that.setData({
          yhjList: yhjList
        })
      }
    })
  },
  // 点击选择的时候
  sureUserYHJ: function (e) {
    var that = this;
    var yhjList = that.data.yhjList

    for (var i = 0; i < yhjList.length;i++)
    {
      if (e.currentTarget.dataset.act_id == yhjList[i]['act_id'])
      {
        wx.setStorageSync('yhj_detail', yhjList[i])
      }
    }

    wx.showToast({
      title: '正在请求，请稍候…',
      icon: "loading"
    })  
    wx.navigateBack({
      url: '/pages/car/car'
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