//index.js
//获取应用实例
var app = getApp();
const MD5 = require('../../../utils/md5.js');

  // 模态充值
function bindspayMoney(that, titlePay, order) {
  var open_id = wx.getStorageSync('openid');
  wx.request({
    url: app.globalData.webUrl + '/wxpay.php?act=payPre',
    data: {
      day: order.day,
      time: order.time,
      actureFee: order.actureFee,
      open_id: open_id,
      title: titlePay,
      appid: app.globalData.AppID,
      mch_id: app.globalData.mch_id
    },
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.success == false)
      {
        wx.showToast({
          title: '时间选择错误！',
          icon: "loading"
        }) 
        return false;
      }
     
      that.setData({
        out_trade_no: res.data.out_trade_no,
        peisongTime: res.data.peisongTime,
      })
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      var stringA = 'appId=' + res.data.appid + '&nonceStr=' + res.data.nonce_str + '&package=prepay_id=' + res.data.prepay_id + '&signType=MD5&timeStamp=' + timestamp;
      var stringSignTemp = stringA + "&key=" + app.globalData.mch_key;
      var paySign = MD5.MD5(stringSignTemp).toUpperCase();
      wx.requestPayment({
        'appId': res.data.appid,
        'timeStamp': timestamp.toString(),
        'nonceStr': res.data.nonce_str,
        'package': 'prepay_id=' + res.data.prepay_id,
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) {//充值付款成功的时候
          wx.request({
            url: app.globalData.webUrl + '/wxpay.php?act=rechangePaySuccess',
            data: {
              market_id:order.market_id,
              actureFee: order.actureFee,
              addressDetail: order.addressDetail,
              cartList: order.cartList,
              distence: order.distence,
              feePeiSong: order.feePeiSong,
              open_id: order.open_id,
              payMoneyStyle: order.payMoneyStyle,
              peiSongStyle: order.peiSongStyle,
              peisongTime: order.peisongTime,
              sumNum: order.sumNum,
              telNumber: order.telNumber,
              userName: order.userName,
              yhj_id: order.yhj_id,
              yhj_money: order.yhj_money,
              zitiAddress: order.zitiAddress,
              zitidian: order.zitidian,
              out_trade_no: that.data.out_trade_no,//商户订单号
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '支付成功！',
                icon: "loading"
              })
              // wx.removeStorageSync('sumNum')
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        },
        'complete': function (res) {
        
        }
      })  
    }
  })
};

module.exports = {
  bindspayMoney: bindspayMoney
}

