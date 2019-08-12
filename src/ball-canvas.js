/**
 * canvas绘制随机小球
 */
class BallCanvas {
  constructor () {
		this.ctx = null // canvas 实例
		this.dpr = 1 // window dpr
    this.canvasW = '' // canvas 宽度
    this.canvasH = '' // canvas 高度
    this.ballNum = '' // 小球数量
    this.ballSize = '' // 小球尺寸
    this.velocity = '' // 移动速度
    this.ballList = [] // 小球数组
  }

  init (config = {
    number: 100,
    size: 50,
    velocity: 2
  }) {
    const canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    const screenW = document.clientWidth || document.body.clientWidth
    const screenH = document.clientHeight || document.body.clientHeight
    this.dpr = window.devicePixelRatio
    this.canvasW = this.dpr * screenW
    this.canvasH = this.dpr * screenH
    canvas.width = this.canvasW
    canvas.height = this.canvasH

    this.ballNum = config.number
    this.ballSize = config.size
    this.velocity = config.velocity

    // 添加鼠标移动事件
    canvas.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e)
    })

    // 创建小球
    this.initBalls()

    // 小球运动
    this.ballMove()
  }

  // 创建小球
  initBalls () {
    for (let i = 0; i < this.ballNum; i++) {
      this.ballList[i] = {
        x: Math.floor(Math.random() * this.canvasW),
        y: Math.floor(Math.random() * this.canvasH),
        radius: Math.random() * this.ballSize,
        vx: Math.random() > 0.5 ? Math.random() * this.velocity : -Math.random() * this.velocity,
        vy: Math.random() > 0.5 ? Math.random() * this.velocity : -Math.random() * this.velocity,
        diapha: Math.random().toFixed(1)
      }
      this.ballList[i].style = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${this.ballList[i].diapha})`
      this.draw(this.ballList[i])
    }
  }

  // 绘制小球
  draw (ball) {
    this.ctx.beginPath()
    this.ctx.fillStyle = ball.style
    const nextX = ball.x + ball.vx
    const nextY = ball.y + ball.vy

    // 边缘回弹
    if (nextX < 0 || nextX > this.canvasW) {
      ball.vx = -ball.vx
    }
    if (nextY < 0 || nextY > this.canvasH) {
      ball.vy = -ball.vy
    }

    // 改变小球位置
    ball.x += ball.vx
    ball.y += ball.vy

    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
    this.ctx.fill()
  }

  // 小球移动
  ballMove () {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    this.ctx.save()
    for (const i in this.ballList) {
      this.draw(this.ballList[i])
    }
    this.ctx.restore()
    window.requestAnimationFrame(this.ballMove.bind(this))
  }

  // 鼠标经过加速
  handleMouseMove (e) {
    const mouseX = e.x * this.dpr
    const mouseY = e.y * this.dpr
    this.ballList.forEach((item, index) => {
      if (mouseX < item.x + item.radius && mouseX > item.x - item.radius) {
        if (mouseY < item.y + item.radius && mouseY > item.y - item.radius) {
          item.vx += (item.vx / Math.abs(item.vx)) * 5
          item.vy += (item.vy / Math.abs(item.vy)) * 5
          setTimeout(() => {
            item.vx -= (item.vx / Math.abs(item.vx)) * 5
            item.vy -= (item.vy / Math.abs(item.vy)) * 5
          }, 500)
        }
      }
    })
  }
}
const ballCanvas = new BallCanvas()
export default ballCanvas
