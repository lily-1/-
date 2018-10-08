// 弹框没有取消键
var app = getApp()
function addCart(that,e) {
  var market_id = wx.getStorageSync('market_id');
  var open_id = wx.getStorageSync('openid');
  var cat_id = e.currentTarget.dataset.cat_id;
  var goods_id = e.currentTarget.dataset.goods_id;
  var goods_supplier_id = e.currentTarget.dataset.goods_supplier_id;
  var supplier_id = e.currentTarget.dataset.supplier_id;
  var brand_id = e.currentTarget.dataset.brand_id;
  wx.request({
    url: app.globalData.webUrl + 'index.php?act=addCart',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      brand_id: brand_id,
      cat_id: cat_id,
      goods_id: goods_id,
      goods_supplier_id: goods_supplier_id,
      supplier_id: supplier_id,
      market_id: market_id,
      open_id: open_id
    },
    method: 'GET',
    success: function (res) {
      console.log(res);
      // return false;
        wx.showToast({
          title: res.data.msg,
          icon: "loading"
        })  
    }
  })
};

function urlredirectTo(urlToGo) {
  wx.redirectTo({
    url: urlToGo
  })
};

module.exports = {
  addCart: addCart,
  urlredirectTo: urlredirectTo
}
