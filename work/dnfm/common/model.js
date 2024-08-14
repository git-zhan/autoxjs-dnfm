const { isOcrSuccess } = require('../utils/ocr')

class Player {
  constructor(profession = 'guiqi') {
    this.profession = profession
    this.initSkill()
  }

  /**
   * 加载需要释放的技能
   */
  initSkill() {
    let skills = []
    if (this.profession == 'guiqi') {
      skills = this.intiGuiSkill()
    } else if (this.profession == 'naima') {
      skills = this.intiNaimaSkill()
    } else if (this.profession == 'kuangzhan') {
      skills = []
    }
    this.skills = skills
  }

  intiGuiSkill() {
    const mingyan = new Skill(
      '冥炎BUFF',
      1,
      'mingyan.jpg',
      0,
      null,
      null,
      1500,
      [1040, 969]
    )
    const juexing = new Skill(
      '觉醒',
      2,
      'juexing.jpg',
      10,
      [0, 1600],
      [-500, 500],
      2000,
      [1615, 969]
    )
    const chuizi = new Skill(
      '锤子',
      2,
      'chuizi.jpg',
      5,
      [0, 800],
      [0, 100],
      1000,
      [1823, 840]
    )
    const bingzhen = new Skill(
      '冰阵',
      2,
      'bingzhen.jpg',
      2,
      [0, 600],
      [0, 150],
      1000,
      [1150, 969]
    )
    const guizhan = new Skill(
      '鬼斩',
      2,
      'guizhan.jpg',
      5,
      [0, 500],
      [0, 80],
      1000,
      [1452, 969]
    )
    const dashangtiao = new Skill(
      '大上挑',
      2,
      'dashangtiao.jpg',
      3,
      [0, 400],
      [0, 100],
      1000,
      [1971, 840]
    )
    const guibian = new Skill(
      '鬼鞭',
      2,
      'guiyingbian.jpg',
      0,
      [0, 800],
      [0, 100],
      1000,
      [1755, 969]
    )
    const commonAttack = new Skill(
      '平A',
      6,
      null,
      3,
      [0, 600],
      [0, 120],
      800,
      [2068, 956]
    )
    return [
      mingyan,
      juexing,
      chuizi,
      bingzhen,
      dashangtiao,
      guibian,
      guizhan,
      commonAttack,
    ]
  }

  intiNaimaSkill() {
    const zhufu = new Skill(
      '祝福',
      1,
      'zhufu.jpg',
      0,
      null,
      null,
      1500,
      [1256, 967]
    )
    const juexing = new Skill(
      '觉醒',
      2,
      'juexing.jpg',
      10,
      [0, 5000],
      [0, 5000],
      7000,
      [932, 967]
    )
    const chuizi = new Skill(
      '锤子',
      2,
      'chuizi.jpg',
      5,
      [600, 1600],
      [0, 150],
      1500,
      [1610, 967]
    )
    const dun = new Skill(
      '盾',
      2,
      'dun.jpg',
      1,
      [100, 900],
      [0, 150],
      1500,
      [1752, 967]
    )
    const mao = new Skill(
      '矛',
      4,
      'mao.jpg',
      2,
      [0, 600],
      [0, 100],
      1200,
      [1527, 849]
    )
    const mutian = new Skill(
      '沐天之光',
      2,
      'mutian.jpg',
      2,
      [400, 800],
      [0, 100],
      1200,
      [1825, 849]
    )
    const guangqiu = new Skill(
      '洁净之光',
      2,
      'guangqiu.jpg',
      3,
      [100, 800],
      [0, 100],
      1000,
      [1453, 967]
    )
    const yongqi = new Skill(
      '勇气',
      2,
      'yongqi.jpg',
      5,
      [0, 1000],
      [0, 150],
      6000,
      [1044, 967]
    )
    const chengjie = new Skill(
      '惩戒',
      2,
      'chengjie.jpg',
      4,
      [0, 800],
      [0, 100],
      1500,
      [1676, 849]
    )
    const commonAttack = new Skill(
      '平A',
      6,
      null,
      6,
      [0, 500],
      [0, 100],
      1200,
      [2068, 956]
    )
    return [
      zhufu,
      juexing,
      chuizi,
      dun,
      mao,
      mutian,
      guangqiu,
      yongqi,
      chengjie,
      commonAttack,
    ]
  }

  refreshSkill(img) {
    const prefix = './template/' + this.profession + '/'
    this.skills.forEach((s) => {
      if (s.type == 6) {
        return
      }
      let tImg = images.read(prefix + s.path)
      let matchResult = images.matchTemplate(img, tImg, { threshold: 0.5 })
      if (matchResult && matchResult.best()) {
        s.status = 1
      }
    })
  }

  resetCd() {
    this.skills.forEach((s) => (s.status = 1))
  }

  /**
   * 加载常驻buff
   */
  loadPresistSkill() {
    const presisitSkills = this.skills.filter((s) => s.type == 1)
    presisitSkills.forEach((f) => {
      f.release()
    })
  }

  /**
   * 使用技能攻击怪物
   * @param {*} point
   */
  attackMonster(p1, p2) {
    let usableSKills = this.skills.filter(
      (s) => s.isUsable() && s.name != '觉醒'
    )
    usableSKills.sort((a, b) => a.priority - b.priority)
    let selectSkill = null
    let deltaX = Math.abs(p1[0] - p2[0])
    let deltaY = Math.abs(p1[1] - p2[1])
    for (let s of usableSKills) {
      let xInRange = deltaX >= s.xRange[0] && deltaX <= s.xRange[1]
      let yInRange = deltaY >= s.yRange[0] && deltaY <= s.yRange[1]
      if (xInRange && yInRange) {
        selectSkill = s
        break
      }
    }
    return selectSkill
  }

  attackLion() {
    let usableSKill = this.skills.find((s) => s.name == '觉醒')
    if (usableSKill.status == 1) {
      //鬼泣需要移动一下
      if (this.profession == 'guiqi') {
        press(300, 970, 300)
      }
      usableSKill.release()
    }
  }

  clip() {
    console.log('翻牌第三张')
    sleep(2000)
    click(1371, 357)
    sleep(1000)
    click(1371, 357)
    sleep(1000)
    click(1371, 357)
    sleep(3000)
  }

  exit() {}
}

class Skill {
  /**
   * @param name
   * @param {*} type 技能类型 1 常驻buff技能 2 攻击技能 3 回血技能 4 双击技能 5 平A
   * @param {*} xRange x攻击范围
   * @param {*} yRange y攻击范围
   * @param {number} [releaseTime=0] 释放时间
   */
  constructor(
    name,
    type,
    path,
    priority,
    xRange,
    yRange,
    releaseTime = 0,
    point = null
  ) {
    this.name = name
    this.type = type
    this.path = path
    this.xRange = xRange
    this.yRange = yRange
    this.priority = priority
    this.releaseTime = releaseTime
    this.status = 1
    this.point = point
  }

  /**
   * 释放技能
   */
  release() {
    if (this.point) {
      console.log('释放技能', this.name, this.releaseTime)
      if (this.type == 6) {
        press(this.point[0], this.point[1], this.releaseTime)
      } else {
        click(this.point[0], this.point[1])
        sleep(this.releaseTime)
        if (this.type == 4) {
          click(this.point[0], this.point[1])
        }
        this.status = -1
      }
    }
  }

  isAttack() {
    return this.type == 2 || this.type == 4 || this.type == 6
  }

  isUsable() {
    return this.isAttack() && this.status == 1
  }
}

class GameStatus {
  constructor() {
    this.brushLion = false
    this.clip = false
    this.inRoom = false
  }

  isClip() {
    return this.clip
  }

  isBrushLion() {
    return this.brushLion
  }

  isInRoom() {
    return this.inRoom
  }

  setBrushLion(flag) {
    this.brushLion = flag
  }

  setClip(flag) {
    this.clip = flag
  }

  setInRoom(flag) {
    this.inRoom = flag
  }

  initGameStatus() {
    this.brushLion = false
    this.clip = false
    this.inRoom = false
  }

  againGame() {
    let img = images.captureScreen()
    if (isOcrSuccess(img, '再次挑战地下城')) {
      console.log('点击再次挑战')
      click(2016, 143)
      sleep(2000)
      img = images.captureScreen()
      if (isOcrSuccess(img, '重新挑战')) {
        this.confirmTip()
      }
      this.initGameStatus()
    }
  }

  confirmTip() {
    console.log('确认再次挑战')
    click(985, 550) //勾选
    sleep(500)
    click(1306, 687) //点击确认
  }
}

exports.Skill = Skill

exports.Player = Player

exports.GameStatus = GameStatus
