const WebSocket = require('ws');  

const wss = new WebSocket('ws://192.168.201.119:6666');  

wss.onopen = () => {
  console.log('open')
}