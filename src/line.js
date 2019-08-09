/**
 * canvas绘制随机小球
 * @param {Number} number 小球数量
 * @param {Number} size 小球最大半径
 * @param {Number} velocity 小球移动速度
 */
function lineCanvas () {
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
    for (let i = 0; i < 200; i++) {
      ballList[i] = {
        x: Math.floor(Math.random() * canvasW),
        y: Math.floor(Math.random() * canvasH),
        radius: 3,
        vx: Math.random() > 0.5 ? Math.random() * 2 : -Math.random() * 2,
        vy: Math.random() > 0.5 ? Math.random() * 2 : -Math.random() * 2
      }
      ballList[i].style = `#aaa`
      drawPoint(ballList[i])
    }
    ballMove()
  }

  // 绘制小球
  function drawPoint (ball) {
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

  // 画线
  function drawLine (item, index) {
    let baseDistance = 150 // 划线值
    if (index === ballList.length - 1) {
      baseDistance = 300
    }
    for (const j in ballList) {
      if (j !== index) {
        const distance = Math.abs(item.x - ballList[j].x) + Math.abs(item.y - ballList[j].y)

        if (distance < baseDistance) {
          let diaphaneity = 1 - (distance / baseDistance).toFixed(2)
          if (index === ballList.length - 1) {
            diaphaneity = 1 - (distance / baseDistance).toFixed(1) + 0.3
          }
          ctx.beginPath()
          ctx.moveTo(item.x, item.y)
          ctx.strokeStyle = `rgba(0,0,0,${diaphaneity})`
          ctx.lineTo(ballList[j].x, ballList[j].y)
          ctx.stroke()
        }
      }
    }
  }

  // 小球移动
  function ballMove () {
    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.save()
    for (let i = 0; i < ballList.length; i++) {
      drawPoint(ballList[i])
      drawLine(ballList[i], i)
    }
    ctx.restore()
    window.requestAnimationFrame(ballMove)
  }

  // 鼠标经过加速
  canvas.addEventListener('mousemove', e => {
    const mouseX = e.x * dpr
    const mouseY = e.y * dpr
    ballList[ballList.length - 1] = {
      x: mouseX,
      y: mouseY,
      radius: 1,
      vx: 0,
      vy: 0,
      style: 'rgba(0,0,0,1)'
    }
  })

  window.onresize = () => {
    lineCanvas()
  }
}

export default lineCanvas
