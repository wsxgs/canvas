/**
 * canvas绘制随机点及线条
 */
class LineCanvas {
  contructor () {
    this.ctx = null // canvas 实例
    this.dpr = 1 // window dpr
    this.canvasW = '' // canvas 宽度
    this.canvasH = '' // canvas 高度
    this.pointNum = '' // 点数量
    this.velocity = '' // 移动速度
		this.pointList = [] // 点数组
		this.animationId = ''
  }

  init (config = {
    number: 200,
    velocity: 2
  }) {
    const canvas = document.getElementById('canvas')
		this.ctx = canvas.getContext('2d')
		this.pointList = []

    const screenW = document.clientWidth || document.body.clientWidth
    const screenH = document.clientHeight || document.body.clientHeight
    this.dpr = window.devicePixelRatio
    this.canvasW = this.dpr * screenW
    this.canvasH = this.dpr * screenH
    canvas.width = this.canvasW
    canvas.height = this.canvasH

    this.pointNum = config.number
    this.velocity = config.velocity

    // 添加鼠标移动事件
    canvas.onmousemove = this.handleMouseMOve.bind(this)

    // 创建点
    this.createpoints()

    // 点移动
    this.pointMove()
  }

  // 创建小球
  createpoints () {
    this.pointList = []
    for (let i = 0; i < this.pointNum; i++) {
      this.pointList[i] = {
        x: Math.floor(Math.random() * this.canvasW),
        y: Math.floor(Math.random() * this.canvasH),
        radius: 3,
        vx: Math.random() > 0.5 ? Math.random() * this.velocity : -Math.random() * this.velocity,
        vy: Math.random() > 0.5 ? Math.random() * this.velocity : -Math.random() * this.velocity
      }
      this.pointList[i].style = `#aaa`
      this.drawPoint(this.pointList[i])
    }
  }

  // 绘制小球
  drawPoint (point) {
    this.ctx.beginPath()
    this.ctx.fillStyle = point.style
    const nextX = point.x + point.vx
    const nextY = point.y + point.vy

    // 边缘回弹
    if (nextX < 0 || nextX > this.canvasW) {
      point.vx = -point.vx
      point.n = 0
    }
    if (nextY < 0 || nextY > this.canvasH) {
      point.vy = -point.vy
      point.n = 0
    }

    // 改变小球位置
    point.x += point.vx
    point.y += point.vy

    this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, true)
    this.ctx.fill()
  }

  // 画线
  drawLine (item, index) {
    let baseDistance = 150 // 划线值
    if (index === this.pointList.length - 1) {
      baseDistance = 300
    }
    for (const j in this.pointList) {
      if (j !== index) {
        const distance = Math.abs(item.x - this.pointList[j].x) + Math.abs(item.y - this.pointList[j].y)

        if (distance < baseDistance) {
          let diaphaneity = 1 - (distance / baseDistance).toFixed(2)
          if (index === this.pointList.length - 1) {
            diaphaneity = 1 - (distance / baseDistance).toFixed(1) + 0.3
          }
          this.ctx.beginPath()
          this.ctx.moveTo(item.x, item.y)
          this.ctx.strokeStyle = `rgba(0,0,0,${diaphaneity})`
          this.ctx.lineTo(this.pointList[j].x, this.pointList[j].y)
          this.ctx.stroke()
        }
      }
    }
  }

  // 小球移动
  pointMove () {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    this.ctx.save()
    for (let i = 0; i < this.pointList.length; i++) {
      this.drawPoint(this.pointList[i])
      this.drawLine(this.pointList[i], i)
    }
    this.ctx.restore()
    this.animationId = window.requestAnimationFrame(this.pointMove.bind(this))
  }

  // 鼠标经过加速
  handleMouseMOve (e) {
    const mouseX = e.x * this.dpr
    const mouseY = e.y * this.dpr
    this.pointList[this.pointList.length - 1] = {
      x: mouseX,
      y: mouseY,
      radius: 1,
      vx: 0,
      vy: 0,
      style: 'rgba(0,0,0,1)'
    }
	}
	
	// 停止动画
	destroy () {
		cancelAnimationFrame(this.animationId);
	}
}

const lineCanvas = new LineCanvas()
export default lineCanvas
