import Vue from 'vue'
import index from '@/pages/Default/index'
import IHeader from '@/pages/Default/IHeader'
import IMain from '@/pages/Default/IMain'
import IAside from '@/pages/Default/IAside'
import IFooter from '@/pages/Default/IFooter'
import IProgress from '@/components/IProgress'
import PromotionBar from '@/common/PromotionBar/index'
import router from '@/router'
import store from '@/store'
import { i18n } from '@/main'
import { COLOR } from '@/api/constants'

const Constructor = Vue.extend(index)
const vm = new Constructor({
  i18n,
  store,
  router,
  components: {
    IHeader,
    IMain,
    IAside,
    IFooter,
    IProgress,
    PromotionBar
  }
}).$mount()
router.push('/buildingId')

describe('Default/index.vue', () => {
  it('$route.name = default 時正確渲染', () => {
    expect(vm.$el.className)
      .not.to.equal(undefined)
  })

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
    router.push('/buildingId')
    vm._watcher.run()
    expect(vm.$refs.buildingNotFound)
      .not.to.equal(undefined)

    router.push('/')
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

  it('該帳戶非進階帳戶，且 isPromotionBarActive = true 時要有 className has-promotion-bar', () => {
    if (vm.usePromotionBar) {
      store.commit('SET_USER', {
        customSetting: {
          showPromotionHeader: true
        }
      })
      store.commit('SET_PROMOTION_BAR_ACTIVE', true)
      vm._watcher.run()
      const classList = Array.prototype.slice.call(vm.$el.classList)
      expect(classList)
        .to.include('has-promotion-bar')
    }
  })

  it('該帳戶若為進階帳戶，要有 promotion-bar', () => {
    if (vm.usePromotionBar) {
      store.commit('SET_USER', {
        customSetting: {
          showPromotionHeader: true
        }
      })
      vm._watcher.run()
      expect(vm.$el.querySelector('.promotion-bar'))
        .not.to.equal(null)
    }
  })

  it('要可以設定其他主題色', () => {
    if (process.env.USE_THEME_COLOR) {
      store.commit('SET_USER', {
        customSetting: {
          themePicker: true
        }
      })
      store.dispatch('setThemeColor', 'black')
      vm._watcher.run()
      expect(Array.prototype.slice.call(vm.$el.classList))
        .to.include('theme-black')

      store.dispatch('setThemeColor', 'blue')
      vm._watcher.run()
      expect(Array.prototype.slice.call(vm.$el.classList))
        .to.include('theme-blue')

      store.dispatch('setThemeColor', 'green')
      vm._watcher.run()
      expect(Array.prototype.slice.call(vm.$el.classList))
        .to.include('theme-green')

      store.dispatch('setThemeColor', 'orange')
      vm._watcher.run()
      expect(Array.prototype.slice.call(vm.$el.classList))
        .to.include('theme-orange')

      store.dispatch('setThemeColor', 'yellow')
      vm._watcher.run()
      expect(Array.prototype.slice.call(vm.$el.classList))
        .to.include('theme-yellow')
    }
  })

  it('要有主題色，預設 class 為 theme theme-pink', () => {
    if (process.env.USE_THEME_COLOR) {
      store.dispatch('setThemeColor', COLOR.DEFAULT_THEME)
      vm._watcher.run()

      const classList = Array.prototype.slice.call(vm.$el.classList)
      expect(classList)
        .to.include('theme')
      expect(classList)
        .to.include('theme-pink')
    }
  })

  it('該使用者的權限 themePicker = false，只能使用粉紅色', () => {
    if (process.env.USE_THEME_COLOR) {
      store.commit('SET_USER', {
        customSetting: {
          themePicker: false
        }
      })
      store.dispatch('setThemeColor', 'orange')
      vm._watcher.run()
      const classList = Array.prototype.slice.call(vm.$el.classList)
      expect(classList)
        .not.to.include('theme-orange')
    }
  })
})
