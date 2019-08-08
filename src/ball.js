/**
 * canvas绘制随机小球
 * @param {Number} number 小球数量
 * @param {Number} size 小球最大半径
 * @param {Number} velocity 小球移动速度
 */
function drawBall (config = {
  number: 100,
  size: 50,
  velocity: 2
}) {
  const canvas = document.getElementById('canvas')
  const screenW = document.clientWidth || document.body.clientWidth
  const screenH = document.clientHeight || document.body.clientHeight
  const dpr = window.devicePixelRatio
  const canvasW = dpr * screenW
  const canvasH = dpr * screenH

  const ctx = canvas.getContext('2d')
  let ballList = []

  canvas.width = canvasW
  canvas.height = canvasH

  initBalls()

  // 创建小球
  function initBalls () {
    ballList = []
    for (let i = 0; i < config.number; i++) {
      ballList[i] = {
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        radius: Math.random() * config.size,
        vx: Math.random() > 0.5 ? Math.random() * config.velocity : -Math.random() * config.velocity,
        vy: Math.random() > 0.5 ? Math.random() * config.velocity : -Math.random() * config.velocity,
        diapha: Math.random().toFixed(1)
      }
      ballList[i].style = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${ballList[i].diapha})`
      draw(ballList[i])
    }
    ballMove()
  }

  // 绘制小球
  function draw (ball) {
    ctx.beginPath()
    ctx.fillStyle = ball.style
    const nextX = ball.x + ball.vx
    const nextY = ball.y + ball.vy

    // 边缘回弹
    if (nextX < 0 || nextX > canvasW) {
      ball.vx = -ball.vx
      ball.n = 0
    }
    if (nextY < 0 || nextY > canvasH) {
      ball.vy = -ball.vy
      ball.n = 0
    }

    // 改变小球位置
    ball.x += ball.vx
    ball.y += ball.vy

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
    ctx.fill()
  }

  // 小球移动
  function ballMove () {
    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.save()
    for (const i in ballList) {
      draw(ballList[i])
    }
    ctx.restore()
    window.requestAnimationFrame(ballMove)
  }

  // 鼠标经过加速
  canvas.addEventListener('mousemove', e => {
    const mouseX = e.x * dpr
    const mouseY = e.y * dpr
    ballList.forEach((item, index) => {
      if (mouseX < item.x + item.radius && mouseX > item.x - item.radius) {
        if (mouseY < item.y + item.radius && mouseY > item.y - item.radius) {
          // if (item.vx > 1) {
          //   return
          // }
          item.vx += (item.vx / Math.abs(item.vx)) * 5
          item.vy += (item.vy / Math.abs(item.vy)) * 5
          setTimeout(() => {
            item.vx -= (item.vx / Math.abs(item.vx)) * 5
            item.vy -= (item.vy / Math.abs(item.vy)) * 5
          }, 500)
        }
      }
    })
  })

  window.onresize = () => {
    initBalls()
  }
}

export default drawBall
