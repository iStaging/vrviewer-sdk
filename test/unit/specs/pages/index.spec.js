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

describe('Default/index.vue', () => {
  it('應該要有 className default-container', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('default-container')
  })

  it('要有無 Live Tour，但有群組的情境處理', () => {
    store.dispatch('setBuildingNotFound', true)
    store.dispatch('setHasProperty', true)
    store.commit('SET_BUILDINGS', [{
      foo: 'bar'
    }])
    vm._watcher.run()
    expect(vm.$refs.buildingNotInProperty)
      .not.to.equal(undefined)
  })

  it('要顯示未找到 Live Tour in url or group', () => {
    store.dispatch('setBuildingNotFound', true)
    store.dispatch('setHasProperty', false)
    vm._watcher.run()
    expect(vm.$refs.buildingNotFound)
      .not.to.equal(undefined)

    vm._watcher.run()
    expect(vm.$refs.buildingNotFound)
      .not.to.equal(undefined)
  })

  it('isAppReady = true 時正確渲染 header、main、aside 及 footer', () => {
    store.dispatch('setBuildingNotFound', false)
    store.dispatch('setHasProperty', false)
    store.dispatch('setAppReady', true)
    store.commit('SET_BUILDING', {
      showPoweredBy: true
    })
    store.commit('SET_UI_MODE', false)
    vm.$router.push('/buildingId')
    vm._watcher.run()
    expect(vm.$el.querySelector('.i-header'))
      .not.to.equal(null)
    expect(vm.$el.querySelector('.i-main'))
      .not.to.equal(null)
    expect(vm.$el.querySelector('.i-aside'))
      .not.to.equal(null)
    expect(vm.$el.querySelector('.i-footer'))
      .not.to.equal(null)
  })

  it('要有 i-progress', () => {
    expect(vm.$el.querySelector('.i-progress-wrapper'))
      .not.to.equal(null)
    expect(vm.$el.querySelector('.i-progress'))
      .not.to.equal(null)
  })

  it('isRtl = true 時要有 className theme-rtl 和 theme-rtl-overlap', () => {
    vm.isRtl = true
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .to.include('theme-rtl')
    expect(classList)
      .to.include('theme-rtl-overlap')
  })

  it('isRtl = false 時不要有 className theme-rtl 和 theme-rtl-overlap', () => {
    vm.isRtl = false
    vm._watcher.run()
    const classList = Array.prototype.slice.call(vm.$el.classList)
    expect(classList)
      .not.to.include('theme-rtl')
    expect(classList)
      .not.to.include('theme-rtl-overlap')
  })
})
