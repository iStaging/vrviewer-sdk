import Vue from 'vue'
import IHeader from '@/pages/Default/IHeader'
import Profile from '@/common/Profile/index'
import Social from '@/common/Social/index'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(IHeader)

describe('Default/IHeader.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Profile,
      Social
    }
  }).$mount()

  it('應該要有 className i-header', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('i-header')
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

  it('由 isUsServer 決定是否顯示 social 區塊', () => {
    if (vm.isUsServer) {
      expect(vm.$el.querySelector('.header-center'))
        .not.toEqual(null)
    } else {
      expect(vm.$el.querySelector('.header-center'))
        .toEqual(null)
    }
  })
})
