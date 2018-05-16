import Vue from 'vue'
import QrCode from '@/components/QrCode'
const Constructor = Vue.extend(QrCode)

describe('components/QrCode.vue', () => {
  it('應該要有 className qr-code', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('qr-code')
  })

  it('innerClass 應該要能在 qrCode 的 className 中', () => {
    const innerClass = 'test'
    const vm = new Constructor({
      propsData: {
        innerClass
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$refs.qrCode.classList))
      .toContain(innerClass)
  })

  it('應該要成功產生 qr code', () => {
    const vm = new Constructor({
      propsData: {
        url: 'fake-url'
      }
    }).$mount()

    expect(vm.$el.querySelector('canvas'))
      .not.toEqual(null)
  })

  it('應該要正確設定 qr code 的寬高', () => {
    const width = 301
    const height = 362
    const vm = new Constructor({
      propsData: {
        url: 'fake-url',
        width,
        height,
        colorDark: '#000',
        colorLight: '#fff'
      }
    }).$mount()

    const canvas = vm.$el.querySelector('canvas')
    console.log('vm.$el', vm.$el)
    expect(canvas.width)
      .toEqual(width)
    expect(canvas.height)
      .toEqual(height)
  })
})
