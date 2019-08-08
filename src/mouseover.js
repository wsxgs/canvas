/**
 * Canvas 鼠标经过效果
 */

function mouseOverCanvas () {
  const canvas = document.getElementById('canvas')
  const screenW = document.clientWidth || document.body.clientWidth
  const screenH = document.clientHeight || document.body.clientHeight
  const dpr = window.devicePixelRatio
  const canvasW = dpr * screenW
  const canvasH = dpr * screenH

  const ctx = canvas.getContext('2d')
  const ballList = []
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)

  canvas.width = canvasW
  canvas.height = canvasH

  canvas.addEventListener('mousemove', (e) => {
    ballList.push({
      x: e.x * dpr,
      y: e.y * dpr,
      radius: 1
    })
  })

  function scale () {
    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.save()
    if (b++ > 255) {
      b = 0
    } else {
      b++
    }

    for (let i = 0; i < ballList.length; i++) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${r},${g},${b})`
      ctx.arc(ballList[i].x, ballList[i].y, ballList[i].radius, 0, Math.PI * 2, true)
      ctx.fill()
      ballList[i].radius += 1.5
      if (ballList.length - 1 === i && ballList[i].radius >= 30) {
        ballList[i].radius = 1
      } else if (ballList.length - 1 !== i && ballList[i].radius > 30) {
        ballList.splice(i, 1)
        i--
      }
    }
    ctx.restore()
    window.requestAnimationFrame(scale)
  }

  scale()
}

export default mouseOverCanvas
