import Vue from 'vue'
import index from '@/pages/Default/index'
import IHeader from '@/pages/Default/IHeader'
import IMain from '@/pages/Default/IMain'
import IAside from '@/pages/Default/IAside'
import IFooter from '@/pages/Default/IFooter'
import IProgress from '@/components/IProgress'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(index)
const vm = new Constructor({
  i18n,
  store,
  components: {
    IHeader,
    IMain,
    IAside,
    IFooter,
    IProgress
  }
}).$mount()

describe('Default/index.vue', () => {
  it('應該要有 className default-container', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('default-container')
  })

  it('要有無 Live Tour，但有群組的情境處理', () => {
    store.dispatch('setBuildingNotFound', true)
    store.dispatch('setHasProperty', true)
    store.commit('SET_PANO_COLLECTIONS', [{
      foo: 'bar'
    }])
    vm._watcher.run()
    expect(vm.$refs.buildingNotInProperty)
      .not.toEqual(undefined)
  })

  it('要顯示未找到 Live Tour in url or group', () => {
    store.dispatch('setBuildingNotFound', true)
    store.dispatch('setHasProperty', false)
    vm._watcher.run()
    expect(vm.$refs.buildingNotFound)
      .not.toEqual(undefined)

    vm._watcher.run()
    expect(vm.$refs.buildingNotFound)
      .not.toEqual(undefined)
  })

  it('isAppReady = true 時正確渲染 header、main、aside 及 footer', () => {
    store.dispatch('setBuildingNotFound', false)
    store.dispatch('setHasProperty', false)
    store.dispatch('setAppReady', true)
    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: true
    })
    store.commit('SET_UI_MODE', false)
    vm._watcher.run()
    expect(vm.$el.querySelector('.i-header'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.i-main'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.i-aside'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.i-footer'))
      .not.toEqual(null)
  })

  it('要有 i-progress', () => {
    expect(vm.$el.querySelector('.i-progress-wrapper'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.i-progress'))
      .not.toEqual(null)
  })

  it('isRtl = true 時要有 className theme-rtl 和 theme-rtl-overlap', () => {
    vm.isRtl = true
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .toContain('theme-rtl')
    expect(classList)
      .toContain('theme-rtl-overlap')
  })

  it('isRtl = false 時不要有 className theme-rtl 和 theme-rtl-overlap', () => {
    vm.isRtl = false
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .not.toContain('theme-rtl')
    expect(classList)
      .not.toContain('theme-rtl-overlap')
  })
})
