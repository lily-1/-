// 弹框没有取消键
var app = getApp();
function adduserDetail(that) {
  var userInfo = wx.getStorageSync('userInfo');
  var open_id = wx.getStorageSync('openid');
  wx.request({
    url: app.globalData.webUrl + 'login.php?act=adduser',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      nickName: userInfo.nickName,
      province: userInfo.province,
      city: userInfo.city,
      avatarUrl: userInfo.avatarUrl,
      open_id: open_id
    },
    method: 'GET',
    success: function (res) {
      console.log(res);
      wx.setStorageSync('userData', res.data)
    }
  })
};
module.exports = {
  adduserDetail: adduserDetail
}
