function leftMove() {
  click(100, 870)
  // swipe(300, 870, 230, 870, 50)
}

function rightMove() {
  click(500, 870)
  // swipe(300, 870, 370, 870, 50)
}

function topMove() {
  swipe(300, 870, 300, 770, 200)
}

function bottomMove() {
  swipe(300, 870, 300, 970, 200)
}

function calDis(p1, p2) {
  let deltaX = Math.abs(p1[0] - p2[0])
  let deltaY = Math.abs(p1[1] - p2[1])
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

function getMoveTime(p1, p2, moveScale) {
  return calDis(p1, p2) * moveScale
}

var rockMove = (p1, p2, time) => {
  console.info('player move ', p1, p2)
  const rocker = [300, 870]
  const radian = Math.atan2(p2[1] - p1[1], p2[0] - p1[0])
  const length = 200
  const endX = rocker[0] + length * Math.cos(radian)
  const endY = rocker[1] + length * Math.sin(radian)
  press(endX, endY, Math.max(100, time))
  // swipe(rocker[0], rocker[1], endX, endY, Math.max(100, time))
}

// function isRequireMove(p1, p2) {
//   let deltaX = Math.abs(p1[0] - p2[0])
//   let deltaY = Math.abs(p1[1] - p2[1])
//   return deltaX > 1000 || deltaX < 100 || deltaY > 50
// }

// var moveTo = (p1, p2, deltaX = 100, moveScale = 0.5) => {
//   if (!p1 || !p2) {
//     return
//   }
//   if (deltaX == 0) {
//     //本次移动不需要关心X之间的间距
//     rockerMove(p1, p2, getMoveTime(p1, p2, moveScale))
//     return
//   }
//   if (Math.abs(p1[0] - p2[0]) < deltaX) {
//     let nP2 = [p1[0] > p2[0] ? p2[0] + 600 : p2[0] - 600, p2[1]]
//     console.info('X空间不够,p2变化', p2, '->', nP2)
//     rockerMove(p1, p2, getMoveTime(p1, nP2, 0.7))
//     return
//   }
// }

// var reverse = (p1, p2) => {
//   console.info('rerverse  ', p1, p2, p1[0] > p2[0] ? 'left' : 'right')
//   if (p1[0] > p2[0]) {
//     leftMove()
//   } else {
//     rightMove()
//   }
// }

// var randomMove = () => {
//   let p1 = [random(100, 2000), random(50, 1000)]
//   let p2 = [random(100, 2000), random(50, 1000)]
//   console.log('随机移动', p1, '->', p2)
//   rockerMove(p1, p2, 100)
// }

// var attack = () => {
//   press(2068, 956, random(600, 800))
// }
// log(getMoveTime([1171, 649], [400, 649], 0.5))
auto()
if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}
let p1 = [1160, 719]
let p2 = [1136, 880]
// rockMove(p1, p2, getMoveTime(p1, p2, 0.6))
// press(2068, 956, 1200)
// rockMove('')

press(300, 970, 350)
