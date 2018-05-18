import Vue from 'vue'
import IAside from '@/pages/IAside'
import INav from '@/pages/INav'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(IAside)

const FakeKrpanoEl = function () {
  return {
    call: function (name) {}
  }
}

describe('IAside.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      INav,
      Icon
    }
  }).$mount()

  it('應該要有 className vrsdk-i-aside', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-i-aside')
  })

  it('要渲染 i-nav', () => {
    expect(vm.$el.querySelector('.vrsdk-i-nav'))
      .not.toEqual(null)
  })

  it('i-nav 應該要顯示如果 isVrMode = false 且不是全螢幕', () => {
    store.dispatch('setKrpanoEl', new FakeKrpanoEl())
    store.dispatch('exitVrMode')
    store.dispatch('exitFullscreen')
    vm._watcher.run()
    const iNavEl = vm.$el.querySelector('.vrsdk-i-nav')
    expect(iNavEl.style.display)
      .not.toEqual('none')

    store.dispatch('enterFullscreen')
    vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')

    store.dispatch('enterVrMode')
    store.dispatch('exitFullscreen')
    vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')

    store.dispatch('enterFullscreen')
    vm._watcher.run()
    expect(iNavEl.style.display)
      .toEqual('none')
  })

  it('要有關閉按鈕如果 應該要顯示如果 isVrMode = true 或是全螢幕', () => {
    store.dispatch('exitVrMode')
    store.dispatch('exitFullscreen')
    vm._watcher.run()
    const closeButton = vm.$el.querySelector('.vrsdk-aside-icon-close')
    expect(closeButton.style.display)
      .toEqual('none')

    store.dispatch('enterFullscreen')
    vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')

    store.dispatch('enterVrMode')
    store.dispatch('exitFullscreen')
    vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')

    store.dispatch('enterFullscreen')
    vm._watcher.run()
    expect(closeButton.style.display)
      .not.toEqual('none')
  })

  it('關閉按鈕要可以觸發離開全螢幕', () => {
    store.dispatch('enterVrMode')
    store.dispatch('enterFullscreen')
    const closeButton = vm.$el.querySelector('.vrsdk-aside-icon-close')
    const clickEvent = new window.Event('click')
    closeButton.dispatchEvent(clickEvent)
    vm._watcher.run()

    expect(store.state.vrmode.isVrMode)
      .toEqual(false)
    expect(store.state.fullscreen.isFullscreen)
      .toEqual(false)
  })
})
