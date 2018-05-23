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
    expect(vm.$el.querySelector('table')) // test 裏產生 table tr td，但畫面上產生 canvas and image @@
      .not.toEqual(null)
  })
})
