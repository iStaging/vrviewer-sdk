import Vue from 'vue'
import IFooter from '@/pages/IFooter.vue'
import store from '@/store'
const Constructor = Vue.extend(IFooter)
const vm = new Constructor({
  store
}).$mount()

describe('IFooter.vue', () => {
  it('應該要有 className vrsdk-i-footer', () => {
    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: true
    })
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-i-footer')
  })

  it('應該包含 powered text', () => {
    const text = 'Powered by iStaging'
    const textEl = vm.$el.querySelector('.vrsdk-footer-powered-text')
    expect(textEl.textContent)
      .toContain(text)
  })

  it('要顯示 powered text', () => {
    expect(vm.$el)
      .not.toEqual(null)
  })

  it('要有隱藏的 class 如果 isPanoramasListActive = true', () => {
    const className = 'vrsdk-fade-in-out-active'
    store.dispatch('closePanoramasList')
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain(className)

    store.dispatch('showPanoramasList')
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .not.toContain(className)
  })
})
