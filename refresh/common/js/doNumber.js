// 底部的文章列表
function execTimeAdd(rest, prepare, weichi, group,that) {

  var allExecTime = ((parseInt(rest) + parseInt(prepare) + parseInt(weichi)) * parseInt(group))/60;
  allExecTime = allExecTime.toFixed(0);
  that.setData({
    allExecTime: allExecTime
  })

  console.log(allExecTime);
  console.log('++++++++++================++++++++++++++++++WWWWWWW');

};
module.exports = {
  execTimeAdd: execTimeAdd
}
