import Vue from 'vue'
import IProgress from '@/components/IProgress'
const Constructor = Vue.extend(IProgress)

const value = 15
const max = 60
const ratio = value / max
const color = '#1d4c7f'
const color2 = '#a09dfa'
function hexToRgb (hex) {
  const r = parseInt((cutHex(hex)).substring(0, 2), 16)
  const g = parseInt((cutHex(hex)).substring(2, 4), 16)
  const b = parseInt((cutHex(hex)).substring(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function cutHex (h) {
  return (h.charAt(0) === '#') ? h.substring(1, 7) : h
}
describe('components/IProgress/index.vue', () => {
  it('應該要有 className i-progress', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('i-progress')
  })

  it('第一層 DOM 應該要有 className i-progress-inner', () => {
    const className = 'i-progress-inner'
    const vm = new Constructor().$mount()
    const child = vm.$el.childNodes[0]
    expect(Array.prototype.slice.call(child.classList))
      .to.include(className)
    const notExistChild = vm.$el.childNodes[1]
    expect(notExistChild)
      .to.equal(undefined)
  })

  it('參數 currentRatio 應該等於 value / max', () => {
    const vm = new Constructor({
      propsData: {
        value,
        max
      }
    }).$mount()
    expect(vm.currentRatio)
      .to.equal(ratio)
  })

  it('參數 currentRatio 應該讓第一層 DOM style -webkit-transform 改值', () => {
    const vm = new Constructor({
      propsData: {
        value,
        max
      }
    }).$mount()
    const child = vm.$el.childNodes[0]
    expect(child.style['-webkit-transform'])
      .to.equal(`scaleX(${ratio})`)
  })

  it('如果有 color 傳入，第一層 DOM style backgroundColor 應改值', () => {
    const vm = new Constructor({
      propsData: {
        color
      }
    }).$mount()
    const child = vm.$el.childNodes[0]
    expect(child.style.backgroundColor)
      .to.equal(hexToRgb(color))
  })

  it('如果有 color 和 color2 傳入，第一層 DOM style backgroundImage 應改值', () => {
    const vm = new Constructor({
      propsData: {
        color,
        color2
      }
    }).$mount()
    const child = vm.$el.childNodes[0]
    expect(child.style.backgroundImage)
      .to.equal(`linear-gradient(to right, ${hexToRgb(color)}, ${hexToRgb(color2)})`)
  })
})
