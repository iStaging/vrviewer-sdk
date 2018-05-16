import { mount } from '@vue/test-utils'
import IFooter from '@/pages/IFooter.vue'
import store from '@/store'
const cmp = mount(IFooter, {
  store
})

describe('Default/IFooter.vue', () => {
  it('應該要有 className i-footer', () => {
    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: true
    })
    store.commit('SET_UI_MODE', false)
    cmp.vm._watcher.run()
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('i-footer')
  })

  it('應該包含 powered text', () => {
    const text = 'Powered by iStaging'
    const textEl = cmp.vm.$el.querySelector('.footer-powered-text')
    expect(textEl.textContent)
      .to.contain(text)
  })

  it('要顯示 powered text 當 showPoweredBy = true 且 isUiMode = false', () => {
    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: false
    })
    cmp.vm._watcher.run()
    expect(cmp.vm.$el)
      .not.toEqual(null)

    store.commit('SET_UI_MODE', false)
    cmp.vm._watcher.run()
    expect(cmp.vm.$el)
      .not.toEqual(null)

    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: true
    })
    cmp.vm._watcher.run()
    expect(cmp.vm.$el)
      .not.toEqual(null)
  })

  it('要有隱藏的 class 如果 isPanoramasListActive = true', () => {
    const className = 'fade-in-out-active'
    store.dispatch('closePanoramasList')
    cmp.vm._watcher.run()
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain(className)

    store.dispatch('showPanoramasList')
    cmp.vm._watcher.run()
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .not.toContain(className)
  })
})
