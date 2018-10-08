//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    sumNum: 0,
    list: [],
    selected:true,
    selectedAllStatus:false,
    cartList:[],
    j:0
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var that = this;
    var open_id = wx.getStorageSync('openid');
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getCartList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        open_id: open_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        that.xiaojiAddTotal(that, res.data.list)
      }
    })
  },
  deleteCars:function(e)
  {
    var that = this;
    var rec_id = e.currentTarget.dataset.rec_id;
    var goods_supplier_id = e.currentTarget.dataset.goods_supplier_id;
    var open_id = wx.getStorageSync('openid');
    wx.showModal({
      title: '提示',
      content: '您确定删除该商品！',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.webUrl + 'index.php?act=deleteGoodsCart',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              rec_id: rec_id,
              open_id: open_id
            },
            method: 'GET',
            success: function (res) {
              console.log(res);
              wx.showToast({
                title: res.data.msg,
                icon: "loading"
              })
              if (res.data.success == true) {
                that.xiaojiAddTotal(that, res.data.list)
              }
            }
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  onShow: function () {
    wx.removeStorageSync('yhj_detail')
    wx.removeStorageSync('cartList')
    var selectedAllStatus = false;
    var that = this;
    var open_id = wx.getStorageSync('openid');
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getCartList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        open_id: open_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          selectedAllStatus: false,
          list:res.data.list
        })
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        that.xiaojiAddTotal(that, res.data.list)
        
      }
    })
  },
  bindMinus: function (e) {
    var that = this;
    var rec_id = e.currentTarget.dataset.rec_id;
    var goods_number = e.currentTarget.dataset.goods_number;
    var goods_supplier_id = e.currentTarget.dataset.goods_supplier_id;
    var open_id = wx.getStorageSync('openid');
    console.log(e);
    if (goods_number == 1)
    {
      wx.showModal({
        title: '提示',
        content: '您确定删除该商品！',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.webUrl + 'index.php?act=deleteGoodsCart',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                rec_id: rec_id,
                open_id: open_id
              },
              method: 'GET',
              success: function (res) {
                console.log(res);
                wx.showToast({
                  title: res.data.msg,
                  icon: "loading"
                })
                if (res.data.success == true) {
                  that.xiaojiAddTotal(that, dataList)
                }
              }
            })
          } else if (res.cancel) {
            return false;
          }
        }
      })
      return false;
    }
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getMinusGoodsCart',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        rec_id: rec_id,
        open_id: open_id,
        goods_number: goods_number,
        goods_supplier_id: goods_supplier_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        if (res.data.success == true) {
          var dataList = res.data.list;
          var list = that.data.list;
          if (list)
          {
            for (var i = 0; i < list.length; i++) {
              if (list[i].selected == true) {
                for (var j = 0; j < dataList.length; j++) {
                  if (list[i].rec_id == dataList[j].rec_id) {
                    dataList[j].selected = true;
                  }
                }
              }
            }
          }
          
          that.xiaojiAddTotal(that, res.data.list)
        }
      }
    })
  },
  //点击加好的时候添加数量
  bindPlus: function (e) {
    var that = this;
    var rec_id = e.currentTarget.dataset.rec_id;
    var brand_id = e.currentTarget.dataset.brand_id;
    var goods_id = e.currentTarget.dataset.goods_id;
    var goods_number = e.currentTarget.dataset.goods_number;
    var goods_supplier_id = e.currentTarget.dataset.goods_supplier_id;
    var open_id = wx.getStorageSync('openid');
    console.log(e);
    wx.request({
      url: app.globalData.webUrl + 'index.php?act=getAddGoodsCart',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        brand_id: brand_id,
        rec_id: rec_id,
        open_id: open_id,
        goods_number: goods_number,
        goods_supplier_id: goods_supplier_id,
        goods_id: goods_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })
        if(res.data.success == true)
        {
          var dataList = res.data.list;
          var list = that.data.list;
          if (list)
          {
            for (var i = 0; i < list.length; i++) {
              if (list[i].selected == true) {
                for (var j = 0; j < dataList.length; j++) {
                  if (list[i].rec_id == dataList[j].rec_id) {
                    dataList[j].selected = true;
                  }
                }
              }
            }
          }
          that.xiaojiAddTotal(that, dataList);
        }
      }
    })
  },
  bindCheckbox: function (e) {
    var that = this;
    var list = that.data.list;
    var selected = that.data.selected;
    var rec_id = e.currentTarget.dataset.rec_id;
    if (that.data.selectedAllStatus == true )
    {
      return false;
    }
    if (list)
    {
      for (var i = 0; i < list.length; i++) {
        if ((rec_id == list[i].rec_id) && (list[i].selected == !selected || list[i].selected == undefined)) {
          list[i].selected = selected
        }
        else if ((rec_id == list[i].rec_id) && (list[i].selected == selected)) {
          list[i].selected = !selected
        }
        that.xiaojiAddTotal(that, list)
    }
    
    }
  },
 
  bindSelectAll: function () {
    // 环境中目前已选状态
    var that = this;
    var selectedAllStatus = that.data.selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var list = that.data.list;
    // 遍历
    if (selectedAllStatus == false)
    {
      selectedAllStatus = true
      if (list)
      {
        for (var i = 0; i < list.length; i++) {
          list[i].selected = true;
        }
      }
      
    }
    else
    {
      selectedAllStatus = false
      if (list)
      {
        for (var i = 0; i < list.length; i++) {
          list[i].selected = false;
        }
      }
      
    }
    that.xiaojiAddTotal(that, list)
    that.setData({
      selectedAllStatus: selectedAllStatus
    });
  },
 
  /**小计 */
  xiaojiAddTotal: function (that,list) {
    var sumNum = 0;
    console.log(that.data.selectedAllStatus);
    if (list)
    {
      for (var i = 0; i < list.length; i++) {
        list[i].add_price = list[i].goods_number * parseInt((list[i].goods_price) * 100) / 100;
        if (list[i].selected == true) {
          sumNum += list[i].add_price * 100;
        }
      }
      that.setData({
        list: list,
        sumNum: sumNum.toFixed(2) / 100,
        j: 0,
        cartList: []
      })
    }
    
    
  },
  /**去凑单 */
  goToBuyMore: function () {
    wx.switchTab({
      url: '../fclass/fclass',
    })
  },
  goToJieSuan:function(e)
  {
    var that = this;
    var cartList = that.data.cartList;
    var list = that.data.list
    var j = that.data.j;
    if (list)
    {
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected == true) {
          cartList[j] = list[i];
          j++;
        }
    }
    
    }
    
    var sumNum = that.data.sumNum;
   
    wx.setStorageSync('cartList', cartList)
    wx.setStorageSync('sumNum', sumNum)
    
    if (cartList == '')
    {
      wx.showToast({
        title: '请选择商品！',
        icon: "loading"
      })
    }
    else
    {
      wx.navigateTo({
        url: '../orderjs/orderjs',
      })
    }
    
  },
  /**链接 */
  bindCheckout: function () {
    wx.navigateTo({
      url: '../confirm_order/confirm_order',
    })
  }
})


