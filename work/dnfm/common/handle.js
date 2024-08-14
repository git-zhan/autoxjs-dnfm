const { matchBwjRoom, isRepair } = require('../utils/match')
const { Player, GameStatus } = require('./model')

const move = require('./move')
const currPlayer = new Player('guiqi')
const gameStatus = new GameStatus()

function hasClass(res, classNo) {
  return classNo in res
}

function getPlayerPoint(res) {
  if (0 in res) {
    let point = res[0][0]['point']
    let np = [point[0], point[1] + 420]
    console.log('玩家坐标:', np)
    return np
  }
  return undefined
}

function calDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

function isOpenDoor(res) {
  return hasClass(res, 5) || hasClass(res, 6) || hasClass(res, 7)
}

function getClosestClassPoint(playerPoint, res, classNo = 1, closest = true) {
  if (!playerPoint) {
    return undefined
  }
  if (classNo in res) {
    const cPoints = res[classNo].map((c) => c.point)
    cPoints.sort((a, b) =>
      closest
        ? calDistance(playerPoint, a) - calDistance(playerPoint, b)
        : calDistance(playerPoint, b) - calDistance(playerPoint, a)
    )
    return cPoints[0]
  }
  return undefined
}

function getClassPoints(res, classNo = 1) {
  if (classNo in res) {
    const cPoints = res[classNo].map((c) => c.point)
    return cPoints
  }
  return []
}

//获取下一个门的方向
function getBwjNextDoorPoint(rImg, playerPoint, gameStatus, res) {
  const hDoors = getClassPoints(res, 6)
  const vDoors = getClassPoints(res, 5)
  if (!gameStatus.isBrushLion() && matchBwjRoom(rImg, 5)) {
    let door = hDoors.find((d) => d[0] < playerPoint[0])
    if (door) {
      if (
        Math.abs(door[0] - playerPoint[0]) <= 250 &&
        playerPoint[1] > door[1]
      ) {
        door[0] -= 400
        door[1] = playerPoint[1]
      } else {
        door[0] += 250
        door[1] -= 120
      }
    }
    console.log('移动到狮子头左侧门')
    return { offset: [-100, 0], point: door }
  } else if (matchBwjRoom(rImg, 1)) {
    console.log('移动到下方门')
    let door = vDoors.find((d) => d[1] >= playerPoint[1])
    return { offset: [0, 100], point: door }
  } else if (matchBwjRoom(rImg, 4)) {
    console.log('移动到上方门')
    let door = vDoors.find((d) => d[1] <= playerPoint[1])
    return { offset: [0, -100], point: door }
  } else {
    console.log('移动到右侧门')
    let door = hDoors.find((d) => d[0] >= playerPoint[0])
    return { offset: [100, 0], point: door }
  }
}

//向门移动
function forwardDoor(playerPoint, { offset, point }) {
  if (point) {
    console.log('移动到门', point)
    move.moveTo(playerPoint, point, 0, 1.0)
  } else {
    console.log('未检测到门进行偏移移动')
    let tPoint = [playerPoint[0] + offset[0], playerPoint[1] + offset[1]]
    move.moveTo(playerPoint, tPoint, 0, 1.0)
  }
}

//刷怪
function brushMonster(playerPoint, closestMonsterPoint) {
  let attackSkill = currPlayer.attackMonster(playerPoint, closestMonsterPoint)
  if (attackSkill) {
    move.reverse(playerPoint, closestMonsterPoint)
    attackSkill.release()
  } else {
    //没有可用技能朝着怪物移动
    move.moveTo(playerPoint, closestMonsterPoint, 200)
  }
}

/**
 * 在门打开之后人物则呢么处理
 * @param {*} playerPoint
 * @param {*} res
 */
function afterOpenDoor(playerPoint, res) {
  let rImg = images.captureScreen()
  if (isRepair(rImg)) {
    //维修装备
    repairEquipment()
  }
  const closestArrowPoint = getClosestClassPoint(playerPoint, res, 7)
  let door = getBwjNextDoorPoint(rImg, playerPoint, gameStatus, res)
  if (closestArrowPoint) {
    if ((closestArrowPoint[0] - playerPoint[0]) * door.offset[0] < 0) {
      console.log('箭头跟下个门X方向相反', door.offset)
      forwardDoor(playerPoint, door)
      return
    }
    console.log('移动到箭头点')
    move.moveTo(playerPoint, closestArrowPoint, 0, 0.6)
    return
  }
  if (door.point) {
    console.log('检测到下一个房间门', door.point)
    forwardDoor(playerPoint, door)
    return
  }
  if (!closestArrowPoint) {
    console.log('未检测到箭头', door.offset)
    forwardDoor(playerPoint, door)
    return
  }
}

//修理装备
function repairEquipment() {
  console.log('维修装备')
  click(180, 90)
  sleep(2000)
  click(1150, 969)
}

if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}

threads.start(function () {
  console.log('启动技能CD线程')
  while (true) {
    const aImg = images.captureScreen()
    currPlayer.refreshSkill(aImg)
    sleep(1000)
  }
})
//处理推断结果
exports.handleDetectResult = (res) => {
  try {
    console.log('-------------------------------')
    if (hasClass(res, 13)) {
      console.log('正在加载...')
      return
    }
    if (hasClass(res, 8)) {
      console.log('正在翻牌...')
      currPlayer.clip()
      gameStatus.setClip(true)
      return
    }
    if (gameStatus.isClip()) {
      console.log('已翻牌,再次游戏...')
      gameStatus.againGame()
      return
    }
    if (hasClass(res, 3) || hasClass(res, 4)) {
      currPlayer.attackLion()
      gameStatus.setBrushLion(true)
      console.log('检测到狮子头,标记已经攻击过狮子头')
      return
    }
    //人物坐标
    const playerPoint = getPlayerPoint(res)
    if (!playerPoint) {
      console.log('未检测到人物坐标随机移动')
      move.randomMove()
      return
    }
    if (!gameStatus.isInRoom()) {
      //加载buff技能
      console.log('记载BUFF')
      currPlayer.loadPresistSkill()
      gameStatus.setInRoom(true)
    }
    //捡物品
    const closestItemPoint = getClosestClassPoint(playerPoint, res, 2)
    if (closestItemPoint) {
      console.log('移动到物品点', playerPoint, '->', closestItemPoint)
      let tp = [closestItemPoint[0], closestItemPoint[1] + 50]
      move.moveTo(playerPoint, tp, 0, 0.8)
      return
    }
    //门开
    if (isOpenDoor(res)) {
      afterOpenDoor(playerPoint, res)
      return
    }
    //最近怪物点
    let closestMonsterPoint = getClosestClassPoint(playerPoint, res)
    if (closestMonsterPoint) {
      brushMonster(playerPoint, closestMonsterPoint)
    }
    closestMonsterPoint = getClosestClassPoint(playerPoint, res, 4)
    if (closestMonsterPoint) {
      brushMonster(playerPoint, closestMonsterPoint)
    }
  } catch (e) {
    console.error(e)
  }
}
