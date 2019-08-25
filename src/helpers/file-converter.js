export const toBase64 = (file, clean = false) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    if (clean) {
      reader.onload = () => resolve(reader.result.replace(/^data:(.*;base64,)?/, ''))
    } else {
      reader.onload = () => resolve(reader.result)
    }

    reader.onerror = error => reject(error)
  })
}
