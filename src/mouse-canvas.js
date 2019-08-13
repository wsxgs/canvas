/**
 * Canvas 鼠标经过效果
 */
class MouseCanvas {
  constructor () {
    this.ctx = null // canvas 实例
    this.dpr = 1 // window dpr
    this.canvasW = '' // canvas 宽度
    this.canvasH = '' // canvas 高度
    this.ballList = [] // 小球数组
    this.r = Math.floor(Math.random() * 255)
    this.g = Math.floor(Math.random() * 255)
		this.b = Math.floor(Math.random() * 255)
		this.animationId = ''
  }

	/**
	 * 初始化
	 */
  init () {
    let canvas = document.getElementById('canvas')
		this.ctx = canvas.getContext('2d')
		this.ballList = []
		
    const screenW = document.clientWidth || document.body.clientWidth
    const screenH = document.clientHeight || document.body.clientHeight
    this.dpr = window.devicePixelRatio
    this.canvasW = this.dpr * screenW
		this.canvasH = this.dpr * screenH
		canvas.width = this.canvasW
    canvas.height = this.canvasH

		// 监听鼠标移动
    canvas.onmousemove = this.addPoint.bind(this)

    // 运动
    this.pointMove()
	}
	
	addPoint (e) {
		this.ballList.push({
			x: e.x * this.dpr,
			y: e.y * this.dpr,
			radius: 1
		})
	}

	/**
	 * 点移动
	 */
  pointMove () {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    this.ctx.save()
    if (this.b++ > 255) {
      this.b = 0
    } else {
      this.b++
    }

    for (let i = 0; i < this.ballList.length; i++) {
      this.ctx.beginPath()
      this.ctx.fillStyle = `rgba(${this.r},${this.g},${this.b})`
      this.ctx.arc(this.ballList[i].x, this.ballList[i].y, this.ballList[i].radius, 0, Math.PI * 2, true)
      this.ctx.fill()
      this.ballList[i].radius += 3
      if (this.ballList.length - 1 === i && this.ballList[i].radius >= 30) {
        this.ballList[i].radius = 1
      } else if (this.ballList.length - 1 !== i && this.ballList[i].radius > 30) {
        this.ballList.splice(i, 1)
        i--
      }
    }
    this.ctx.restore()
    this.animationId = window.requestAnimationFrame(this.pointMove.bind(this))
	}
	
	// 停止动画
	destroy () {
		cancelAnimationFrame(this.animationId);
	}
}
const mouseCanvas = new MouseCanvas()
export default mouseCanvas
