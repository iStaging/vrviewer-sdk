import { mount } from '@vue/test-utils'
import Popup from '@/components/Popup'
import { i18n } from '@/main'

describe('components/Popup/index.vue', () => {
  it('應該要有 className popup', () => {
    const cmp = mount(Popup, {
      i18n
    })
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('popup')
  })

  it('第一層 DOM 應該要有 className popup-inner', () => {
    const cmp = mount(Popup, {
      i18n
    })
    expect(cmp.vm.$el.querySelector('.popup-inner'))
      .not.toEqual(null)
  })

  it('第二層 DOM 應該要有 className popup-iframe-container', () => {
    const cmp = mount(Popup, {
      i18n
    })
    const child = cmp.vm.$el.querySelector('.popup-inner')
    expect(child.querySelector('.popup-iframe-container'))
      .not.toEqual(null)
  })

  it('如果 prop 傳進來的 widthType 是 pixel，.popup-inner 應含 width: auto', () => {
    const cmp = mount(Popup, {
      i18n,
      propsData: {
        widthType: 'pixel'
      }
    })
    expect(cmp.vm.$el.querySelector('.popup-inner').style.width)
      .toEqual('auto')
  })

  it('如果 prop 傳進來的 widthType 是 pixel，.popup-iframe-container 應含 padding-bottom: 0', () => {
    const cmp = mount(Popup, {
      i18n,
      propsData: {
        widthType: 'pixel'
      }
    })
    expect(cmp.vm.$el.querySelector('.popup-iframe-container').style.paddingBottom)
      .toEqual('0px')
  })

  it('如果 prop 傳進來的 widthType 是 pixel，使用 width 和 height 參數', () => {
    const width = 333
    const height = 555
    const cmp = mount(Popup, {
      i18n,
      propsData: {
        widthType: 'pixel',
        width,
        height
      }
    })
    expect(cmp.vm.$el.querySelector('.popup-iframe-container').style.width)
      .toEqual(`${width}px`)
    expect(cmp.vm.$el.querySelector('.popup-iframe-container').style.height)
      .toEqual(`${height}px`)
  })

  it('如果 prop 傳進來的 widthType 是 percent，使用 widthPercent 參數', () => {
    const widthPercent = 76
    const cmp = mount(Popup, {
      i18n,
      propsData: {
        widthType: 'percent',
        widthPercent
      }
    })
    expect(cmp.vm.$el.querySelector('.popup-inner').style.width)
      .toEqual(`${widthPercent}%`)
  })

  it('2 秒後，isIFrameNoSupportTimeout 將會從 false 變成 true', function (done) {
    jest.setTimeout(2500)
    const cmp = mount(Popup, {
      i18n
    })
    window.setTimeout(() => {
      expect(cmp.vm.isIFrameNoSupportTimeout)
        .toBe(true)
      done()
    }, 2000)
  })
})
