const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute,      second].map(formatNumber).join(':')
}


const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()+1
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') 
}



const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatDate,formatTime, showBusy, showSuccess, showModel }

function saveCarData1(item, num) {
  if (num >= 0) {
    var key = item.key;
    var value = item.value;

    value.count = num;
    console.log(item);
    try {
      var datas = wx.getStorageSync("cars");
      console.log(datas);
      var jsonData = JSON.parse(datas);
      // 获取json数组中key的值为item.key的json对象
      var temp = jsonData.filter((p) => {
        return p.key == key;
      });
      if (num != 0) {
        if (temp.length == 1) {
          temp[0].value.count = num;
        } else {
          jsonData.push({ "key": key, "value": value });
        }
      } else {
        if (temp.length == 1) {
          temp[0].value.count = num;
          var index = jsonData.indexOf(temp[0]);
          jsonData.splice(index, 1)
        } else {
          // jsonData.push({ "key": key, "value": value });
        }
      }
      console.log(jsonData)
      wx.setStorageSync("cars", JSON.stringify(jsonData));
    } catch (e) {
      if (num != 0) {
        var datas = [{ "key": key, "value": value }];
        wx.setStorageSync("cars", JSON.stringify(datas));
      }
    }

  }
}
