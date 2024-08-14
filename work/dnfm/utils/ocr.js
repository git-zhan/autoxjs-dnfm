const isOcrSuccess = (img, keyText) => {
  const results = paddle.ocr(img)
  return results && results.some((r) => r.text.includes(keyText))
}

exports.isOcrSuccess = isOcrSuccess
