//请求横屏截图
// toast("hello")
// log("hello")
// // requestScreenCapture(true);
// log(device.sdkInt)
// log(requestScreenCapture())
if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}

// console.log(requestScreenCapture(true))
// //截图
var img = captureScreen();

log(img)
//获取在点(100, 100)的颜色值
var color = images.pixel(img, 100, 100);
// //显示该颜色值
toast(colors.toString(color));
