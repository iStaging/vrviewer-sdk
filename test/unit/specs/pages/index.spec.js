import Vue from 'vue'
import index from '@/pages/index'
import IHeader from '@/pages/IHeader'
import IMain from '@/pages/IMain'
import IAside from '@/pages/IAside'
import IFooter from '@/pages/IFooter'
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

describe('index.vue', () => {
  it('應該要有 className default-container', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-default-container')
  })

  it('要顯示未找到 Live Tour in url or group', () => {
    store.dispatch('setPanoCollectionNotFound', true)
    vm._watcher.run()
    expect(vm.$refs.panoCollectionNotFound)
      .not.toEqual(undefined)

    vm._watcher.run()
    expect(vm.$refs.panoCollectionNotFound)
      .not.toEqual(undefined)
  })

  it('isAppReady = true 時正確渲染 header、main、aside 及 footer', () => {
    store.dispatch('setPanoCollectionNotFound', false)
    store.dispatch('setAppReady', true)
    store.commit('SET_PANO_COLLECTION', {
      showPoweredBy: true
    })
    vm._watcher.run()
    expect(vm.$el.querySelector('.vrsdk-i-header'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.vrsdk-i-main'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.vrsdk-i-aside'))
      .not.toEqual(null)
    expect(vm.$el.querySelector('.vrsdk-i-footer'))
      .not.toEqual(null)
  })

  it('要有 <loading></loading>', () => {
    expect(vm.$el.querySelector('.vrsdk-loading'))
      .not.toEqual(null)
  })

  it('isRtl = true 時要有 className vrsdk-theme-rtl 和 vrsdk-theme-rtl-overlap', () => {
    vm.isRtl = true
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .toContain('vrsdk-theme-rtl')
    expect(classList)
      .toContain('vrsdk-theme-rtl-overlap')
  })

  it('isRtl = false 時不要有 className vrsdk-theme-rtl 和 vrsdk-theme-rtl-overlap', () => {
    vm.isRtl = false
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .not.toContain('vrsdk-theme-rtl')
    expect(classList)
      .not.toContain('vrsdk-theme-rtl-overlap')
  })
})
