import ballCanvas from './ball-canvas'
import lineCanvas from './line-canvas'
import textCanvas from './text-canvas'
import mouseCanvas from './mouse-canvas'

textCanvas.init('12345')

// 点击切换
const menu = document.querySelector('.menu')
const menyList = document.querySelectorAll('.menu button')
menu.addEventListener('click', (e) => {
  let activeIndex = 0
  if (e.target.nodeName === 'BUTTON') {
    activeIndex = e.target.attributes['data-index'].value
  }
  for (let i = 0; i < menyList.length; i++) {
    if (i === Number(activeIndex)) {
      menyList[activeIndex].classList = 'button on'
      switch (i) {
        case 0:
					// 小球
          ballCanvas.init({
            number: 100,
            size: 50,
            velocity: 2
          })
          break
        case 1:
          // 线
          lineCanvas.init({
						number: 200,
						velocity: 2
					})
          break
        case 2:
          // 文字
          textCanvas.init('12345')
          break
        case 3:
          // 鼠标
          mouseCanvas.init()
      }
    } else {
      menyList[i].classList = 'button'
    }
  }
})
