import { mount } from '@vue/test-utils'
import IProgress from '@/components/IProgress'

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
    const vm = mount(IProgress)
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('i-progress')
  })

  it('第一層 DOM 應該要有 className i-progress-inner', () => {
    const className = 'i-progress-inner'
    const vm = mount(IProgress)
    const child = vm.$el.childNodes[0]
    expect(Array.prototype.slice.call(child.classList))
      .toContain(className)
    const notExistChild = vm.$el.childNodes[1]
    expect(notExistChild)
      .toEqual(undefined)
  })

  it('參數 currentRatio 應該等於 value / max', () => {
    const vm = mount(IProgress, {
      propsData: {
        value,
        max
      }
    })
    expect(vm.currentRatio)
      .toEqual(ratio)
  })

  it('參數 currentRatio 應該讓第一層 DOM style -webkit-transform 改值', () => {
    const vm = mount(IProgress, {
      propsData: {
        value,
        max
      }
    })
    const child = vm.$el.childNodes[0]
    expect(child.style['-webkit-transform'])
      .toEqual(`scaleX(${ratio})`)
  })

  it('如果有 color 傳入，第一層 DOM style backgroundColor 應改值', () => {
    const vm = mount(IProgress, {
      propsData: {
        color
      }
    })
    vm._watcher.run()
    const child = vm.$el.childNodes[0]
    expect(child.style.backgroundColor)
      .toEqual(hexToRgb(color))
  })

  it('如果有 color 和 color2 傳入，第一層 DOM style backgroundImage 應改值', () => {
    const vm = mount(IProgress, {
      propsData: {
        color,
        color2
      }
    })
    vm._watcher.run()
    const child = vm.$el.childNodes[0]
    console.log('vm.$el.childNodes', vm.$el.childNodes)
    console.log('child', child)
    expect(child.style.backgroundImage)
      .toEqual(`linear-gradient(to right, ${hexToRgb(color)}, ${hexToRgb(color2)})`)
  })
})
