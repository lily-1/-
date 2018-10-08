// pages/fclass/fclass.js
var app = getApp()
var cart = require("../../common/js/cart.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCateList:false,
    baseUrl: app.globalData.baseUrl,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
  },
  //切换
  switchTab1: function (e) {
    var that = this;
    var market_id = wx.getStorageSync('market_id');
    var son_cat_id = e.currentTarget.dataset.son_cat_id
    if (son_cat_id == undefined)
    {
      return false;
    }
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getSonCatGoodsList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        son_cat_id: son_cat_id,
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log('eeeeeee')
        that.setData({
          son_cat_id: res.data.son_cat_id,
          goods_list: res.data.goods_list,
        })
      }
    })
  },
  showCateStatus:function()
  {
    var that = this;
    var showCateList = that.data.showCateList;
    if (showCateList == false)
    {
      that.setData({
        showCateList: true
      })
    }
    else{
      that.setData({
        showCateList: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.winHeight();
    var cat_id = app.globalData.cat_id;
    var market_id = wx.getStorageSync('market_id');
    if (market_id == '')
    {
      wx.showModal({
        title: '提示',
        content: '该地区附近无菜市场，请更换地址！',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          } 
        }
      })
      return false;
    }
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getCatListAndSonCat',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        cat_id: cat_id,
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log('12121212121211212')
        that.setData({
          cat_list: res.data.cat_list,
          son_list: res.data.son_list,
          cat_id: res.data.cat_id,
          son_cat_id: res.data.son_cat_id,
          goods_list: res.data.goods_list,
        })
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
    var that = this
    that.winHeight();
    var cat_id = app.globalData.cat_id;
    var market_id = wx.getStorageSync('market_id');
    console.log(market_id);
    console.log('market_id');
    //return false;
    if (market_id == '') {
      wx.showModal({
        title: '提示',
        content: '该地区附近无菜市场，请更换地址！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
      return false;
    }
    app.globalData.cat_id = '';
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getCatListAndSonCat',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        cat_id: cat_id,
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          cat_list: res.data.cat_list,
          son_list: res.data.son_list,
          cat_id: res.data.cat_id,
          son_cat_id: res.data.son_cat_id,
          goods_list: res.data.goods_list,
        })
      }
    })
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
  // 滚动切换标签样式
    switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击最大类分类的时候
  swichNav: function (e) {
    console.log(e);
    // return false;
    var that = this
    var cat_id = e.currentTarget.dataset.cat_id;
    var market_id = wx.getStorageSync('market_id')
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getSonCatList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        cat_id: cat_id,
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        that.showCateStatus();
        console.log(res)
        console.log('ppppp')
        if (res.data.success == false)
        {
          wx.showToast({
            title: res.data.msg,
            icon: "loading"
          })  
          that.setData({
            cat_id: res.data.cat_id,
            son_list: res.data.cat_id,
            son_cat_id: res.data.cat_id,
            goods_list: res.data.goods_list,
          })
        }
        else
        {
          wx.showToast({
            title: res.data.msg,
            icon: "loading"
          })  
          that.setData({
            son_list: res.data.son_list,
            cat_id: res.data.cat_id,
            son_cat_id: res.data.son_cat_id,
            goods_list: res.data.goods_list,
            

          })
        }
      }
    })
  },
  addCart: function (e) {
    var that = this;
    cart.addCart(that,e)
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  detailURL: function (e) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goods_supplier_id=' + e.currentTarget.dataset.goods_supplier_id + '&goods_id=' + e.currentTarget.dataset.goods_id
    })
  },
  winHeight:function()
  {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
  }
})