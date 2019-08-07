/**
 * canvas绘制随机小球
 * @param {*} ballNum
 */
function drawBall (ballNum = 100) {
  const canvas = document.getElementById('canvas')
  const screenW = document.clientWidth || document.body.clientWidth
  const screenH = document.clientHeight || document.body.clientHeight
  // const dpr = window.devicePixelRatio;
  // const canvasW = dpr * screenW;
  // const canvasH = dpr * screenH;

  const ctx = canvas.getContext('2d')
  const ballList = []

  canvas.width = screenW
  canvas.height = screenH

  // 小球实例
  class Ball {
    constructor () {
      this.x = Math.random() * screenW
      this.y = Math.random() * screenH
      this.radius = Math.random() * 50
      this.vx = Math.random() > 0.5 ? Math.random() : -Math.random()
      this.vy = Math.random() > 0.5 ? Math.random() : -Math.random()
      this.diapha = Math.random().toFixed(1)
      this.style = `rgba(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${this.diapha}
      )`
    }

    // 绘制小球
    draw () {
      ctx.beginPath()
      ctx.fillStyle = this.style
      const nextX = this.x + this.vx
      const nextY = this.y + this.vy
      if (nextX < 0 || nextX > screenW) {
        this.vx = -this.vx
        this.n = 0
      }
      if (nextY < 0 || nextY > screenH) {
        this.vy = -this.vy
        this.n = 0
      }
      this.x += this.vx
      this.y += this.vy

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.fill()
    }
  }

  // 创建小球
  for (let i = 0; i < ballNum; i++) {
    ballList[i] = new Ball()
    ballList[i].draw()
  }

  // 小球移动
  function ballMove () {
    ctx.clearRect(0, 0, screenW, screenH)
    ctx.save()
    for (const i in ballList) {
      ballList[i].draw()
    }
    ctx.restore()
    window.requestAnimationFrame(ballMove)
  }

  window.requestAnimationFrame(ballMove)

  // 鼠标经过加速
  canvas.addEventListener('mousemove', e => {
    const mouseX = e.x
    const mouseY = e.y
    ballList.forEach((item, index) => {
      if (mouseX < item.x + item.radius && mouseX > item.x - item.radius) {
        if (mouseY < item.y + item.radius && mouseY > item.y - item.radius) {
          if (item.vx > 1) {
            return
          }
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
}

export default drawBall
