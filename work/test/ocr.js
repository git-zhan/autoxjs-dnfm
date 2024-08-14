auto()

if (!images.requestScreenCapture(true)) {
  exit()
}

const isOcrSuccess = (img, keyText) => {
  const results = paddle.ocr(img)
  return results && results.some((r) => r.text.includes(keyText))
}

console.log(isOcrSuccess(captureScreen(), '重新挑战'))
console.log(isOcrSuccess(captureScreen(), '再次挑战地下城'))
