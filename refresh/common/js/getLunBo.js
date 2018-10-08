// 弹框没有取消键
var app = getApp()

// 调用轮播图
function getLunBoList(that, media_type) {
  wx.request({
    url: app.globalData.webUrl + 'index.php?act=getLunBo',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      media_type: media_type
    },
    method: 'POST',
    success: function (res) {
      that.setData({
        headImageList: res.data
      })
    }
  })
};
module.exports = {
  getLunBoList: getLunBoList
}
