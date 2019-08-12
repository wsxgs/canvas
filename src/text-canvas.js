/**
 * Canvas 文字
 */
class TextCanvas {
  constructor () {
    this.ctx = null // canvas 实例
    this.dpr = 1 // window this.dpr
    this.canvasW = '' // canvas 宽度
    this.canvasH = '' // canvas 高度
    this.ratio = ''
    this.velocity = 10 // 点移动速度
    this.pointList = [] // 点数组
    this.newImgData = [] // 文字图像数据
    this.mouseX = 0 // 鼠标X坐标
		this.mouseY = 0 // 鼠标Y坐标
		this.animationId = ''
  }

  /**
	 * 初始化
	 * @param {String} text
	 */
  init (text = '12345') {
    let canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    const screenW = document.clientWidth || document.body.clientWidth
    const screenH = document.clientHeight || document.body.clientHeight
    this.dpr = window.devicePixelRatio
    this.canvasW = this.dpr * screenW
    this.canvasH = this.dpr * screenH
    canvas.width = this.canvasW
    canvas.height = this.canvasH
    this.ratio = this.canvasW / this.canvasH

    // 监听鼠标移动
    canvas.onmousemove = this.handleMouseMove.bind(this)

    // 绘制文字
    this.createText(text)

    // 根据文字生成点信息
    this.createPointData()

    // 画点
    this.createPoint()

    // 点移动
    this.pointMove()
  }

  /**
	 * 生成颜色
	 */
  findColor () {
    const colorList = [`rgba(241,224,0,${Math.ceil(Math.random())})`, `rgba(93,200,0,${Math.ceil(Math.random())})`, `rgba(76,232,222,${Math.ceil(Math.random())})`]
    return colorList[Math.floor(Math.random() * 3)]
  }

  /**
	 * 绘制文字
	 * @param {String} text
	 */
  createText (text) {
    this.ctx.font = '760px serif'
    this.ctx.fillStyle = '000'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(text, this.canvasW / 2, this.canvasH / 2, this.canvasW)
  }

  /**
	 * 获取文字数据
	 */
  createPointData () {
    const imgData = this.ctx.getImageData(0, 0, this.canvasW, this.canvasH).data
    const gap = 13
    let x = 0
    let y = 0
    let index = 0
    for (var i = 0; i < imgData.length; i += (7 * gap)) {
      if (imgData[i + 3] === 255) {
        // 塞入此时的坐标
        this.newImgData.push({
          x: x,
          y: y
        })
        this.pointList.push({
          x: Math.random() * this.canvasW,
          y: Math.random() * this.canvasH,
          vx: Math.random() > 0.5 ? Math.random() * this.velocity + 20 : -Math.random() * this.velocity - 20,
          vy: Math.random() > 0.5 ? Math.random() * this.velocity + 20 / this.ratio : -Math.random() * this.velocity - 20 / this.ratio,
          radius: Math.random() * 10,
          style: this.findColor()
        })
      }
      index = Math.floor(i / 4)
      x = index % this.canvasW
      y = Math.floor(index / this.canvasW)
      if (x >= this.canvasW - gap) {
        i += gap * 4 * 100
      }
    }
  }

  /**
	 * 生成点
	 */
  createPoint () {
    for (let i = 0; i < this.pointList.length; i++) {
      this.ctx.beginPath()
      this.ctx.fillStyle = this.pointList[i].style
      this.ctx.arc(this.pointList[i].x, this.pointList[i].y, this.pointList[i].radius, 0, Math.PI * 2, true)
      this.ctx.fill()
    }
  }

  /**
	 * 点移动
	 */
  pointMove () {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    this.ctx.save()

    for (let i = 0; i < this.pointList.length; i++) {
      this.ctx.beginPath()
      this.ctx.fillStyle = this.pointList[i].style

      const nextX = this.pointList[i].x + this.pointList[i].vx
      const nextY = this.pointList[i].y + this.pointList[i].vy

      if (nextX < 0 || nextX > this.canvasW) {
        this.pointList[i].vx = -this.pointList[i].vx
      }
      this.pointList[i].x += this.pointList[i].vx
      if (this.pointList[i].x >= this.newImgData[i].x - 30 && this.pointList[i].x <= this.newImgData[i].x + 30) {
        this.pointList[i].x = this.newImgData[i].x
      }

      if (nextY < 0 || nextY > this.canvasH) {
        this.pointList[i].vy = -this.pointList[i].vy
      }
      this.pointList[i].y += this.pointList[i].vy
      if (this.pointList[i].y >= this.newImgData[i].y - 30 && this.pointList[i].y <= this.newImgData[i].y + 30) {
        this.pointList[i].y = this.newImgData[i].y
      }

      const distance = Math.abs(this.mouseX - this.pointList[i].x) + Math.abs(this.mouseY - this.pointList[i].y)
      if (distance < 100) {
        this.pointList[i].x += 100 * (this.pointList[i].vx / Math.abs(this.pointList[i].vx))
        this.pointList[i].y += 100 * (this.pointList[i].vy / Math.abs(this.pointList[i].vy))
      }

      this.ctx.arc(this.pointList[i].x, this.pointList[i].y, this.pointList[i].radius, 0, Math.PI * 2, true)
      this.ctx.fill()
    }
    this.ctx.restore()
    this.animationId = window.requestAnimationFrame(this.pointMove.bind(this))
  }

  // 鼠标移动
  handleMouseMove (e) {
    this.mouseX = e.x * this.dpr
    this.mouseY = e.y * this.dpr
	}
	
	// 停止动画
	destroy () {
		cancelAnimationFrame(this.animationId);
	}
}
const textCanvas = new TextCanvas()
export default textCanvas
