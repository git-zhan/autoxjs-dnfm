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

const isMatchSuccess = function (img, tImg, options = {}) {
  let matchResult = images.matchTemplate(img, tImg, options)
  return Boolean(matchResult && matchResult.best())
}

exports.matchBwjRoom = matchBwjRoom

exports.isInMonsterRoom = isInMonsterRoom

exports.isRepair = isRepair
