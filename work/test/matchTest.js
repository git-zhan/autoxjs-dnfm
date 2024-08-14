const matchBwjRoom = function (img, roomNo) {
  let tImg = images.read('./template/bwj_room_' + roomNo + '.jpg')
  return isMatchSuccess(img, tImg, { threshold: 0.9 })
}

const isInMonsterRoom = function (img) {
  let tImg = images.read('./template/blood.jpg')
  return isMatchSuccess(img, tImg, { threshold: 0.8 })
}

const isRepair = function (img) {
  let tImg = images.read('./template/weixiu.jpg')
  return isMatchSuccess(img, tImg, { threshold: 0.7 })
}

const isMatchSuccess = function (img, tImg, options) {
  let matchResult = images.matchTemplate(img, tImg, options)
  return Boolean(matchResult && matchResult.best())
}

if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}
var img = images.captureScreen()

console.log(
  isMatchSuccess(img, images.read('./template/guiqi/bingzhen.jpg'), {
    threshold: 0.8,
  })
)
console.log(
  isMatchSuccess(img, images.read('./template/guiqi/juexing.jpg'), {
    threshold: 0.8,
  })
)
console.log(
  isMatchSuccess(img, images.read('./template/guiqi/guizhan.jpg'), {
    threshold: 0.8,
  })
)
console.log(
  isMatchSuccess(img, images.read('./template/guiqi/guiyingbian.jpg'), {
    threshold: 0.8,
  })
)
console.log(
  isMatchSuccess(img, images.read('./template/guiqi/chuizi.jpg'), {
    threshold: 0.8,
  })
)
console.log(
  isMatchSuccess(img, images.read('./template/guiqi/dashangtiao.jpg'), {
    threshold: 0.8,
  })
)
