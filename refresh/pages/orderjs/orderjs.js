// pages/orderjs/orderjs.js
var app = getApp()
var payMoney = require("../public/payMoney/payMoney.js");
var utiles = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    peisongTime:'',
    out_trade_no:'',
    feePeiSong:0,
    yhMoney:'去选择',
    day:'',
    DayTime: ['请选择','今天', '明天'],
    startTime:'7:00',
    peisongShow:true,
    peiSongType: [
      { name: '1', value: '配送' ,checked: true },
      { name: '2', value: '自提',},
    ],
    payMoneyType: [
      { name: '1', value: '微信', checked: true },
      { name: '2', value: '余额', },
    ],
    time:'',
    baseUrl: app.globalData.baseUrl,

  },
  //选择付款方式
  radioChangepayMoneyType: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this;
    var payMoneyType = that.data.payMoneyType
    var userData = wx.getStorageSync('userData');
    var sumNum = wx.getStorageSync('sumNum');
    var paystyleVal = e.detail.value
    if (paystyleVal == 2)
    {
      if (userData.user_money < sumNum)
      {
        wx.showToast({
          title: '余额不足！',
          icon: "loading"
        })
        payMoneyType[0]['checked'] = true;
        payMoneyType[1]['checked'] = false;
      }
      else
      {
        payMoneyType[0]['checked'] = false;
        payMoneyType[1]['checked'] = true;
      }

    }
    else
    {
      payMoneyType[0]['checked'] = true;
      payMoneyType[1]['checked'] = false;
    }
    that.setData({
      payMoneyType: payMoneyType
    })
  },
  // 选择配送的方式
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this;
    var peisongVal = e.detail.value
    var peiSongType = that.data.peiSongType
    var sumNum = wx.getStorageSync('sumNum')
    if (peisongVal == 1)
    {
      for (var i = 0; i < peiSongType.length; i++) {
        if ((sumNum < 29) && (peiSongType[0]['name'] == 1)) {
          peiSongType[0]['checked'] = false;
          peiSongType[1]['checked'] = true;
          peisongVal = 2;
          var peisongShow = false;
          wx.showToast({
            title: '29元起送！',
            icon: "loading"
          })
          that.setData({
            feePeiSong:0
          })
        }
        else 
        {
          var peisongShow = true;
          peiSongType[0]['checked'] = true;
          peiSongType[1]['checked'] = false;
          if (sumNum < 79 && sumNum >= 29)
          {
            that.setData({
              feePeiSong: 4
            })
          }
        }
        that.actureFee();
      }
      
    }else{
      var peisongShow = false;
      peiSongType[0]['checked'] = false;
      peiSongType[1]['checked'] = true;
      that.setData({
        feePeiSong: 0
      })
      that.actureFee();
    }
   
    that.setData({
      peiSongType: peiSongType,
      peisongShow: peisongShow
    })

  },
  // 选择配送和自提的时间 
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var addresInfo = wx.getStorageSync('addresInfo');
    var cartList = wx.getStorageSync('cartList')
    var sumNum = wx.getStorageSync('sumNum')
    var lengthCart = cartList.length;
    that.actureFee();
    that.setData({
      addresInfo: addresInfo,
      cartList: cartList,
      lengthCart: lengthCart,
      sumNum: sumNum
    })
  },
  bindspayMoney: function () {
    var that = this;
    var sumNum = wx.getStorageSync('sumNum')
    var order = [];
    var distence = wx.getStorageSync('distence')//配送距离
    order['distence'] = distence;
    var cartList = wx.getStorageSync('cartList')//商品
    var orderGoods = '';
    for (var i = 0; i < cartList.length;i++)
    {
      orderGoods += cartList[i]['rec_id']+','
    }
    order['cartList'] = orderGoods;
    var open_id = wx.getStorageSync('openid')
    order['open_id'] = open_id;
    var peiSongType = that.data.peiSongType;//配送或者自提 1为配送 2 为自提
    var market = wx.getStorageSync('market')
    var zitidian = market.market_name;
    var zitiAddress = market.address;
    order['zitidian'] = zitidian;
    order['zitiAddress'] = zitiAddress;
    order['market_id'] = market.market_id;
    if (peiSongType[0]['checked'] == true)
    {
      var peiSongStyle = 1;
      if ( sumNum < 79 && sumNum >= 29)
      {
        order['feePeiSong'] = 4;
      }
      else
      {
        order['feePeiSong'] = 0;
      }
      order['peiSongStyle'] = peiSongStyle;
    }
    else
    {
      var peiSongStyle = 2;
      order['feePeiSong'] = 0;
      order['peiSongStyle'] = peiSongStyle;
      
    }
    var payMoneyType = that.data.payMoneyType;//支付方式 1是微信支付  2 为余额支付
    if (payMoneyType[0]['checked'] == true) {
      var payMoneyStyle = 1;
      order['payMoneyStyle'] = payMoneyStyle;
    }
    else {
      var payMoneyStyle = 2;
      order['payMoneyStyle'] = payMoneyStyle;
    }
    var sumNum = wx.getStorageSync('sumNum');//总价
    order['sumNum'] = sumNum;
    var addresInfo = wx.getStorageSync('addresInfo');// 地址
    order['addresInfo'] = addresInfo;
    var addressDetail = addresInfo.provinceName + addresInfo.cityName + addresInfo.countyName + addresInfo.detailInfo;//收货地址
    order['addressDetail'] = addressDetail;
    var userName = addresInfo.userName;//收货人
    order['userName'] = userName;

    var telNumber = addresInfo.telNumber;//电话
    order['telNumber'] = telNumber;
    var day = that.data.day;

    order['day'] = day;
    var time = that.data.time;
    order['time'] = time;
    console.log(day);
    console.log(time);
    if (day == 0)
    {
      wx.showToast({
        title: '请选择天数',
        icon: "loading"
      })  
      return false;
    }
    if (time == 0) {
      wx.showToast({
        title: '请选择具体时间',
        icon: "loading"
      })
      return false;
    }
   
    var DATE = utiles.formatTime(new Date());

    var timeString = utiles. formatDate(new Date());

    console.log(DATE);
    console.log(timeString);
    console.log('32132131231231');

 
    
    var yhj_detail = wx.getStorageSync('yhj_detail');//优惠卷
    if (yhj_detail)
    {
      var yhj_id = yhj_detail.act_id;
      var yhj_money = yhj_detail.act_type_ext;
      order['yhj_id'] = yhj_id;
      order['yhj_money'] = yhj_money;
    }
    var actureFee = wx.getStorageSync('actureFee');
    order['actureFee'] = actureFee;//实付价格
    payMoney.bindspayMoney(that, '绿时鲜订单支付', order);
  },
  actureFee:function()
  {
    var that = this
    var sumNum = wx.getStorageSync('sumNum')
    var yhj_detail = wx.getStorageSync('yhj_detail');
    if (yhj_detail.act_type_ext) {
      var feeyouhui = yhj_detail.act_type_ext;
    } else {
      var feeyouhui = 0;
    }
    var feePeiSong = that.data.feePeiSong;

    var actureFee = sumNum - feeyouhui + feePeiSong;
    wx.setStorageSync('actureFee', actureFee)
    that.setData({
      actureFee: actureFee
    })
  },

  goToYHJ:function(){
    wx.navigateTo({
      url: '/pages/yhj/yhj',
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
    var that = this;
    var peiSongType = that.data.peiSongType
    var sumNum = wx.getStorageSync('sumNum')
    var market = wx.getStorageSync('market')
    var yhj_detail = wx.getStorageSync('yhj_detail')
    if (peiSongType[0]['checked'] == true && sumNum < 79 && sumNum >= 29)
    {
      that.setData({
        feePeiSong :4
      })
    }
    if (yhj_detail)
    {
      that.setData({
        yhMoney: yhj_detail.act_type_ext,
      })
    }
    for (var i = 0; i< peiSongType.length;i++)
    {
      if ((sumNum < 29) && (peiSongType[0]['name'] == 1))
      {
        peiSongType[0]['checked'] = false;
        peiSongType[1]['checked'] = true;
        var peisongShow = false;
      }
      else
      {
        var peisongShow = true;
      }
    }
    that.setData({
      peiSongType: peiSongType,
      market_name: market.market_name,
      address: market.address,
      peisongShow: peisongShow
    })
    that.actureFee();
    console.log(peiSongType);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  // 选择是今天还是明天
  bindDayTimerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      day: e.detail.value
    })
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
  //结算链接
  payforURL:function(){
    wx.navigateTo({
      url: '../payfor/payfor',
    })
  }
})