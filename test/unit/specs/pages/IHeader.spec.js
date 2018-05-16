import Vue from 'vue'
import IHeader from '@/pages/IHeader'
import Profile from '@/common/Profile/index'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(IHeader)

describe('Default/IHeader.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Profile
    }
  }).$mount()

  it('應該要有 className i-header', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('i-header')
  })

  it('是 VR Mode 或是全螢幕模式要隱藏整個 header', () => {
    store.commit('SET_VR_MODE', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .to.equal('none')

    store.commit('SET_VR_MODE', false)
    store.commit('SET_FULL_SCREEN', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .to.equal('none')

    store.commit('SET_VR_MODE', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .to.equal('none')
  })

  it('不是 VR Mode 且不是全螢幕模式時整個 header 要顯示出來', () => {
    store.commit('SET_VR_MODE', false)
    store.commit('SET_FULL_SCREEN', false)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .not.to.equal('none')
  })

  it('由 isUsServer 決定是否顯示 social 區塊', () => {
    if (vm.isUsServer) {
      expect(vm.$el.querySelector('.header-center'))
        .not.to.equal(null)
    } else {
      expect(vm.$el.querySelector('.header-center'))
        .to.equal(null)
    }
  })
})
