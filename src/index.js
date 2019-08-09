import ballCanvas from './ball'
import lineCanvas from './line'
import textCanvas from './text'
import mouseCanvas from './mouse'

textCanvas('12345')

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
          ballCanvas({
            number: 100,
            size: 50,
            velocity: 2
          })
          break
        case 1:
          // 线
          lineCanvas()
          break
        case 2:
          // 文字
          textCanvas('12345')
          break
        case 3:
          // 鼠标
          mouseCanvas()
      }
    } else {
      menyList[i].classList = 'button'
    }
  }
})
