const handle = require('./handle')
const socketUrl = 'ws://192.168.154.119:6666'
importPackage(Packages['okhttp3']) //导入包
const client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build()
const request = new Request.Builder().url(socketUrl).build() //vscode  插件的ip地址，
const preview = true
const detect = true
client.dispatcher().cancelAll() //清理一次
const listener = {
  onOpen: function (webSocket, response) {
    print('已连接')
  },
  onMessage: function (webSocket, msg) {
    let messageJson = JSON.parse(msg)
    if (detect) {
      if (messageJson.action == 'detectResult') {
        handle.handleDetectResult(messageJson.data)
      }
      sendDetectImg()
    }
  },
  onClosing: function (webSocket, code, response) {
    print(code)
    exit()
  },
  onClosed: function (webSocket, code, response) {
    print(code)
    exit()
  },
  onFailure: function (webSocket, t, response) {
    print(t)
    exit()
  },
}

const ws = client.newWebSocket(request, new WebSocketListener(listener))

const sendDetectImg = () => {
  sendCapture(ws, 'detect')
}

const sendCapture = (socket, action, qut = 50) => {
  if (!socket) {
    return
  }
  let img = images.captureScreen()
  img = images.resize(img, [640, 295])
  const data = {
    action: action,
    data: images.toBase64(img, 'jpg', qut),
  }
  socket.send(JSON.stringify(data))
}

// threads.start(() => {
//   // let preWs = null
//   while (preview) {
//     // if (!preWs) {
//     //   preWs = client.newWebSocket(request, new WebSocketListener(listener))
//     // }
//     sendCapture(ws, 'preview', 100)
//     // sleep(30)
//   }
// }, 40)

// setInterval(() => {
//   sendCapture(ws, 'preview', 100)
// }, 40)

exports.sendDetectImg = sendDetectImg
