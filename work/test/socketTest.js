if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}
const socketUrl = 'ws://192.168.154.119:6667'
importPackage(Packages['okhttp3']) //导入包
const client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build()
const request = new Request.Builder().url(socketUrl).build() //vscode  插件的ip地址，
client.dispatcher().cancelAll() //清理一次
const listener = {
  onOpen: function (webSocket, response) {
    print('已连接')
  },
  onMessage: function (webSocket, msg) {},
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

const sendCapture = (socket, action, qut) => {
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

setInterval(() => {
  sendCapture(ws, 'preview', 100)
}, 30)
