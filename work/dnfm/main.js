const socket = require('./common/socket')

auto()

if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}

socket.sendDetectImg()
//避免主线程结束
setInterval(function () {}, 1000)
