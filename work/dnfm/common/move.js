function leftMove() {
  click(100, 870)
}

function rightMove() {
  click(500, 870)
}

function calDis(p1, p2) {
  let deltaX = p1[0] - p2[0]
  let deltaY = p1[1] - p2[1]
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

function getMoveTime(p1, p2, moveScale = 0.5) {
  return calDis(p1, p2) * moveScale
}

function rockerMove(p1, p2, time = 150) {
  console.info('player move ', p1, p2)
  const rocker = [300, 870]
  const radian = Math.atan2(p2[1] - p1[1], p2[0] - p1[0])
  const length = 200
  const endX = rocker[0] + length * Math.cos(radian)
  const endY = rocker[1] + length * Math.sin(radian)
  press(endX, endY, Math.max(150, time))
  // swipe(rocker[0], rocker[1], endX, endY, Math.max(100, time))
}

function isRequireMove(p1, p2) {
  let deltaX = Math.abs(p1[0] - p2[0])
  let deltaY = Math.abs(p1[1] - p2[1])
  return deltaX > 1000 || deltaX < 100 || deltaY > 50
}

var moveTo = (p1, p2, deltaX = 100, moveScale = 0.5) => {
  if (!p1 || !p2) {
    return
  }
  if (deltaX == 0) {
    //本次移动不需要关心X之间的间距
    rockerMove(p1, p2, getMoveTime(p1, p2, moveScale))
    return
  }
  if (Math.abs(p1[0] - p2[0]) < deltaX) {
    let nP2 = [p1[0] > p2[0] ? p2[0] + 600 : p2[0] - 600, p2[1]]
    console.info('X空间不够,p2变化', p2, '->', nP2)
    rockerMove(p1, p2, getMoveTime(p1, nP2, 0.7))
    return
  }
}

var reverse = (p1, p2) => {
  console.info('rerverse  ', p1, p2, p1[0] > p2[0] ? 'left' : 'right')
  if (p1[0] > p2[0]) {
    leftMove()
  } else {
    rightMove()
  }
}

var randomMove = () => {
  let p1 = [random(0, 500), random(0, 300)]
  let p2 = [random(0, 500), random(0, 300)]
  console.log('随机移动在[500,300]', p1, '->', p2)
  rockerMove(p1, p2, 200)
}

var attack = () => {
  press(2068, 956, random(600, 800))
}

exports.reverse = reverse

exports.attack = attack

exports.moveTo = moveTo

exports.randomMove = randomMove
