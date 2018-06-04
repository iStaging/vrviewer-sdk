import Vue from 'vue'
import Popup from '../../../../../src/components/Popup'
import { i18n } from '../../../../../src/main'

const Constructor = Vue.extend(Popup)

describe('components/Popup/index.vue', () => {
  it('應該要有 className popup', () => {
    const vm = new Constructor({
      i18n
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-popup')
  })

  it('第一層 DOM 應該要有 className vrsdk-popup-inner', () => {
    const vm = new Constructor({
      i18n
    }).$mount()
    expect(vm.$el.querySelector('.vrsdk-popup-inner'))
      .not.toEqual(null)
  })

  it('第二層 DOM 應該要有 className vrsdk-popup-iframe-container', () => {
    const vm = new Constructor({
      i18n
    }).$mount()
    const child = vm.$el.querySelector('.vrsdk-popup-inner')
    expect(child.querySelector('.vrsdk-popup-iframe-container'))
      .not.toEqual(null)
  })

  it('如果 prop 傳進來的 widthType 是 pixel，.vrsdk-popup-inner 應含 width: auto', () => {
    const vm = new Constructor({
      i18n,
      propsData: {
        widthType: 'pixel'
      }
    }).$mount()
    expect(vm.$el.querySelector('.vrsdk-popup-inner').style.width)
      .toEqual('auto')
  })

  it('如果 prop 傳進來的 widthType 是 pixel，.vrsdk-popup-iframe-container 應含 padding-bottom: 0', () => {
    const vm = new Constructor({
      i18n,
      propsData: {
        widthType: 'pixel'
      }
    }).$mount()
    expect(vm.$el.querySelector('.vrsdk-popup-iframe-container').style.paddingBottom)
      .toEqual('0px')
  })

  it('如果 prop 傳進來的 widthType 是 pixel，使用 width 和 height 參數', () => {
    const width = 333
    const height = 555
    const vm = new Constructor({
      i18n,
      propsData: {
        widthType: 'pixel',
        width,
        height
      }
    }).$mount()
    expect(vm.$el.querySelector('.vrsdk-popup-iframe-container').style.width)
      .toEqual(`${width}px`)
    expect(vm.$el.querySelector('.vrsdk-popup-iframe-container').style.height)
      .toEqual(`${height}px`)
  })

  it('如果 prop 傳進來的 widthType 是 percent，使用 widthPercent 參數', () => {
    const widthPercent = 76
    const vm = new Constructor({
      i18n,
      propsData: {
        widthType: 'percent',
        widthPercent
      }
    }).$mount()
    expect(vm.$el.querySelector('.vrsdk-popup-inner').style.width)
      .toEqual(`${widthPercent}%`)
  })

  it('2 秒後，isIFrameNoSupportTimeout 將會從 false 變成 true', function (done) {
    jest.setTimeout(2500)
    const vm = new Constructor({
      i18n
    }).$mount()
    window.setTimeout(() => {
      expect(vm.isIFrameNoSupportTimeout)
        .toEqual(true)
      done()
    }, 2000)
  })
})
