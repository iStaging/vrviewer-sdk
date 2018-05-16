import { mount } from '@vue/test-utils'
import IAside from '@/pages/IAside'
import INav from '@/pages/INav'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const FakeKrpanoEl = function () {
  return {
    call: function (name) {}
  }
}

describe('Default/IAside.vue', () => {
  const cmp = mount(IAside, {
    i18n,
    store,
    components: {
      INav,
      Icon
    }
  })

  it('應該要有 className i-aside', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('i-aside')
  })

  it('要渲染 i-nav', () => {
    expect(cmp.vm.$el.querySelector('.i-nav'))
      .not.toEqual(null)
  })

  it('i-nav 應該要顯示如果 isVrMode = false 且不是全螢幕', () => {
    store.dispatch('setKrpanoEl', new FakeKrpanoEl())
    store.dispatch('exitVrMode')
    store.dispatch('exitFullscreen')
    cmp.vm._watcher.run()
    const iNavEl = cmp.vm.$el.querySelector('.i-nav')
    expect(iNavEl.style.display)
      .not.toEqual('none')

    store.dispatch('enterFullscreen')
    cmp.vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')

    store.dispatch('enterVrMode')
    store.dispatch('exitFullscreen')
    cmp.vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')

    store.dispatch('enterFullscreen')
    cmp.vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')
  })

  it('要有關閉按鈕如果 應該要顯示如果 isVrMode = true 或是全螢幕', () => {
    store.dispatch('exitVrMode')
    store.dispatch('exitFullscreen')
    cmp.vm._watcher.run()
    const closeButton = cmp.vm.$el.querySelector('.aside-icon-close')
    expect(closeButton.style.display)
      .toEqual('none')

    store.dispatch('enterFullscreen')
    cmp.vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')

    store.dispatch('enterVrMode')
    store.dispatch('exitFullscreen')
    cmp.vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')

    store.dispatch('enterFullscreen')
    cmp.vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')
  })

  it('關閉按鈕要可以觸發離開全螢幕', () => {
    store.dispatch('enterVrMode')
    store.dispatch('enterFullscreen')
    const closeButton = cmp.vm.$el.querySelector('.aside-icon-close')
    const clickEvent = new window.Event('click')
    closeButton.dispatchEvent(clickEvent)
    cmp.vm._watcher.run()

    expect(store.state.vrmode.isVrMode)
      .toEqual(false)
    expect(store.state.fullscreen.isFullscreen)
      .toEqual(false)
  })
})
