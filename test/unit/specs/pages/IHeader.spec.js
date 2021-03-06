import Vue from 'vue'
import IHeader from '../../../../src/pages/IHeader'
import PanoCollectionInfo from '../../../../src/common/PanoCollectionInfo/index'
import store from '../../../../src/store'
import { i18n } from '../../../../src/main'

const Constructor = Vue.extend(IHeader)

describe('IHeader.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      PanoCollectionInfo
    }
  }).$mount()

  it('應該要有 className vrsdk-i-header', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-i-header')
  })

  it('是 VR Mode 或是全螢幕模式要隱藏整個 header', () => {
    store.commit('SET_VR_MODE', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .toEqual('none')

    store.commit('SET_VR_MODE', false)
    store.commit('SET_FULL_SCREEN', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .toEqual('none')

    store.commit('SET_VR_MODE', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .toEqual('none')
  })

  it('不是 VR Mode 且不是全螢幕模式時整個 header 要顯示出來', () => {
    store.commit('SET_VR_MODE', false)
    store.commit('SET_FULL_SCREEN', false)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .not.toEqual('none')
  })
})
