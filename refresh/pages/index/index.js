// pages/index1/index1.js
var app = getApp();
var getLunBoList = require("../../common/js/getLunBo.js");
var adduserDetail = require("../../common/js/addUser.js");
var cart = require("../../common/js/cart.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [
      '绿时鲜品质生鲜商城震撼上线！',
      '绿时鲜品质生鲜商城震撼上线！',
    ],
    // 获取全局变量  start
    headImageUrl: app.globalData.headImageUrl,
    baseUrl: app.globalData.baseUrl,
    cateImageUrl: app.globalData.cateImageUrl,
    market_name:'',
    market:'',
    // 获取全局变量 end
    // 加载授权信息所需参数 start
    privateShow:true,
    openSettingShow1:false,
    messagePrivate:'是否获取微信用户的信息!',
    getUserInfoMation:'获取用户信息',
    openSetDataPrivate:"打开授权设置页面",
    // 加载授权信息所需参数 end
    // 获取权限参数end
    myClass: '',

    // 轮播图所需参数 start
    autoplay: true,
    interval: 2000,
    duration: 1000,
    // 轮播图所需参数 end
  },
  addCart: function (e) {
    var that = this;
    cart.addCart(that, e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync("userInfo");
    var market = wx.getStorageSync('market');
    if (market == '') {
      that.setData({
        market_name: '暂无数据'
      })
      wx.showModal({
        title: '提示',
        content: '该地区附近无菜市场，请更换地址！',
        success: function (res) {
          if (res.confirm) {
            that.gotoAddress();
          }
        }
      })
    }
    else 
    {
      that.setData({
        market_name: market.market_name
      })
    }
    if (market == '')
    {
      that.setData({
        market_name: '暂无数据'
      })
    }
    else
    {
      that.setData({
        market_name: market.market_name
      })
    }
    
    // 调用轮播图
    getLunBoList.getLunBoList(that,0);
    that.getGoodsIndexList();
    adduserDetail.adduserDetail(that);
    // 获取分类
    that.getCategoryList();
    if (!userInfo)
    {
      that.setData({
        privateShow: that.data.privateShow,
      })
    }
    else
    {
      app.getUserInfo(function (userInfo) {
      });
      that.setData({        
        privateShow: !that.data.privateShow,
      })
    }  
    wx.showToast({
      title: '正在请求，请稍候…',
      icon: "loading"
    })  
  },
  getGoodsIndexList(){
    var that = this
    var market_id = wx.getStorageSync('market_id')
    console.log(market_id)
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getGoodsIndexList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        console.log('qwqweqweqweqwe');
        that.setData({
          list: res.data.list
        })
      }
    })
  },
  gotoAddress:function()
  {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        wx.setStorageSync('addresInfo', res)
        wx.request({
          url: app.globalData.webUrl + 'login.php?act=mostDistinced',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            userName: res.userName,
            postalCode: res.postalCode,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            nationalCode: res.nationalCode,
            telNumber: res.telNumber
          },
          method: 'GET',
          success: function (res) {
            wx.showToast({
              title: '正在请求，请稍候…',
              icon: "loading"
            }) 
            if(res.data.success == true)
            {
              wx.showToast({
                title: res.data.msg,
                icon: "loading"
              }) 
              var market_id = res.data.market.market_id;
              var market = res.data.market;
              var distence = res.data.distence;
              wx.setStorageSync('market_id', market_id);
              wx.setStorageSync('market', market);
              wx.setStorageSync('distence', distence); 
              that.setData({
                market_name: market.market_name
              })
            }
            else
            {
              wx.setStorageSync('market_id', '');
              wx.setStorageSync('market', '');
              wx.setStorageSync('distence', '');
              that.setData({
                market_name: '暂无数据'
              })
              wx.showModal({
                title: '提示',
                content: '该地区附近无菜市场，请更换地址！',
                success: function (res) {
                  if (res.confirm) {
                    that.gotoAddress();
                  } 
                }
              })
            }
          }
        })
      },
      fail:function()
      {
        wx.getSetting({
            success: (res) => {
              var address = res.authSetting['scope.address'];
              if (address == false)
              {
                that.setData({
                  openSettingShow1:true
                })
              }
              else
              {
                openSettingShow1: false
              }
             
            }
        })
      
      }
    })
  },
  // 获取分类
  getCategoryList:function()
  {
    var that = this
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getCategoryList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {},
      method: 'POST',
      success: function (res) {
        that.setData({
          cateList: res.data
        })
      }
    })
  },
  onGotUserInfo: function (e) {
    var that = this 
    wx.setStorageSync('userInfo', e.detail.userInfo)
    app.getUserInfo(function (userInfo) {
    });
    that.setData({
      privateShow: !that.data.privateShow,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  search: function(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync("userInfo");

    var that = this;
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync("userInfo");
    var market = wx.getStorageSync('market');
   
    if (market == '') {
      that.setData({
        market_name: '暂无数据'
      })
    }
    else {
      that.setData({
        market_name: market.market_name
      })
    }

    that.getGoodsIndexList();
    adduserDetail.adduserDetail(that);
    // 获取分类
    that.getCategoryList();
    
    wx.showToast({
      title: '正在请求，请稍候…',
      icon: "loading"
    })
  },
  getGoodsIndexList() {
    var that = this
    var market_id = wx.getStorageSync('market_id')
    console.log(market_id)
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getGoodsIndexList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        market_id: market_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        console.log('qwqweqweqweqwe');
        that.setData({
          list: res.data.list
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
  /**链接 */
  fclass_url: function (e) {
    var that = app.globalData.cat_id;
    var cat_id = e.currentTarget.dataset.cat_id;
    app.globalData.cat_id = cat_id;
    wx.switchTab({
      url: '../fclass/fclass',
    })
  },
  choujian: function (e) {
    wx.navigateTo({
      url: '/pages/choujian/choujian',
    })
  },
  // 链接
  detailURL: function (e) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goods_supplier_id=' + e.currentTarget.dataset.goods_supplier_id + '&goods_id=' + e.currentTarget.dataset.goods_id
    })
  },
  yiyuancai:function(e)
  {
    wx.navigateTo({
      url: '/pages/yiyuancai/yiyuancai',
    })
  }
})