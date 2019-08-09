/**
 * Canvas 文字
 */

function textCanvas (text = '12345') {
  const canvas = document.getElementById('canvas')
  const screenW = document.clientWidth || document.body.clientWidth
  const screenH = document.clientHeight || document.body.clientHeight
  const dpr = window.devicePixelRatio
  const canvasW = dpr * screenW
  const canvasH = dpr * screenH
  const ratio = canvasW / canvasH
  let mouseX = 0
  let mouseY = 0

  const ctx = canvas.getContext('2d')
  const pointList = []
  const imgList = []
  const velocity = 10

  function findColor () {
    const colorList = [`rgba(241,224,0,${Math.ceil(Math.random())})`, `rgba(93,200,0,${Math.ceil(Math.random())})`, `rgba(76,232,222,${Math.ceil(Math.random())})`]
    return colorList[Math.floor(Math.random() * 3)]
  }

  canvas.width = canvasW
  canvas.height = canvasH

  ctx.font = '760px serif'
  ctx.fillStyle = '000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvasW / 2, canvasH / 2, canvasW)

  // 获取文字数据
  const imgData = ctx.getImageData(0, 0, canvasW, canvasH).data
  var gap = 13
  var x = 0
  var y = 0
  var index = 0
  for (var i = 0; i < imgData.length; i += (7 * gap)) {
    if (imgData[i + 3] === 255) {
      // 塞入此时的坐标
      imgList.push({
        x: x,
        y: y
      })
      pointList.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        vx: Math.random() > 0.5 ? Math.random() * velocity + 20 : -Math.random() * velocity - 20,
        vy: Math.random() > 0.5 ? Math.random() * velocity + 20 / ratio : -Math.random() * velocity - 20 / ratio,
        radius: Math.random() * 10,
        style: findColor()
      })
    }
    index = Math.floor(i / 4)
    x = index % canvasW
    y = Math.floor(index / canvasW)
    if (x >= canvasW - gap) {
      i += gap * 4 * 100
    }
  }

  // 生成点
  for (let i = 0; i < pointList.length; i++) {
    ctx.beginPath()
    ctx.fillStyle = pointList[i].style
    ctx.arc(pointList[i].x, pointList[i].y, pointList[i].radius, 0, Math.PI * 2, true)
    ctx.fill()
  }

  // 点移动
  function move () {
    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.save()

    for (let i = 0; i < pointList.length; i++) {
      ctx.beginPath()
      ctx.fillStyle = pointList[i].style

      const nextX = pointList[i].x + pointList[i].vx
      const nextY = pointList[i].y + pointList[i].vy

      if (nextX < 0 || nextX > canvasW) {
        pointList[i].vx = -pointList[i].vx
      }
      pointList[i].x += pointList[i].vx
      if (pointList[i].x >= imgList[i].x - 30 && pointList[i].x <= imgList[i].x + 30) {
        pointList[i].x = imgList[i].x
      }

      if (nextY < 0 || nextY > canvasH) {
        pointList[i].vy = -pointList[i].vy
      }
      pointList[i].y += pointList[i].vy
      if (pointList[i].y >= imgList[i].y - 30 && pointList[i].y <= imgList[i].y + 30) {
        pointList[i].y = imgList[i].y
      }

      const distance = Math.abs(mouseX - pointList[i].x) + Math.abs(mouseY - pointList[i].y)
      if (distance < 100) {
        pointList[i].x += 100 * (pointList[i].vx / Math.abs(pointList[i].vx))
        pointList[i].y += 100 * (pointList[i].vy / Math.abs(pointList[i].vy))
      }

      ctx.arc(pointList[i].x, pointList[i].y, pointList[i].radius, 0, Math.PI * 2, true)
      ctx.fill()
    }
    ctx.restore()
    window.requestAnimationFrame(move)
  }

  move()

  // 鼠标移动
  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.x * dpr
    mouseY = e.y * dpr
  })
}

export default textCanvas
