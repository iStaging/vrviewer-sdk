import Vue from 'vue'
import IFooter from '@/pages/IFooter.vue'
import store from '@/store'
const Constructor = Vue.extend(IFooter)
const vm = new Constructor({
  store
}).$mount()

describe('Default/IFooter.vue', () => {
  it('應該要有 className i-footer', () => {
    store.commit('SET_BUILDING', {
      showPoweredBy: true
    })
    store.commit('SET_UI_MODE', false)
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('i-footer')
  })

  it('應該包含 powered text', () => {
    const text = 'Powered by iStaging'
    const textEl = vm.$el.querySelector('.footer-powered-text')
    expect(textEl.textContent)
      .to.contain(text)
  })

  it('要顯示 powered text 當 showPoweredBy = true 且 isUiMode = false', () => {
    store.commit('SET_BUILDING', {
      showPoweredBy: false
    })
    vm._watcher.run()
    expect(vm.$el)
      .not.to.equal(null)

    store.commit('SET_UI_MODE', false)
    vm._watcher.run()
    expect(vm.$el)
      .not.to.equal(null)

    store.commit('SET_BUILDING', {
      showPoweredBy: true
    })
    vm._watcher.run()
    expect(vm.$el)
      .not.to.equal(null)
  })

  it('要有隱藏的 class 如果 isPanoramasListActive = true', () => {
    const className = 'fade-in-out-active'
    store.dispatch('closePanoramasList')
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include(className)

    store.dispatch('showPanoramasList')
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .not.to.include(className)
  })
})
