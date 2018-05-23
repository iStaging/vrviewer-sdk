import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from '../../../src/App.vue'
import DefaultView from '../../../src/pages/index.vue'
import store from '../../../src/store'
import { i18n } from '../../../src/main'
import { text2html } from '../../../src/api/utils'
Vue.use(VueI18n)

const Constructor = Vue.extend(App)

describe('App.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      DefaultView
    }
  }).$mount()

  it('必須要有 id vrviewer-sdk', () => {
    expect(vm.$el.id)
      .toEqual('vrviewer-sdk')
  })

  it('必須要有 className vrviewer-sdk', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrviewer-sdk')
  })

  it('全螢幕模式時有 className vrviewer-sdk-fullscreen', () => {
    store.commit('SET_FULL_SCREEN', true)
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrviewer-sdk-fullscreen')
  })

  it('VR 模式時有 className vrviewer-sdk-vrmode', () => {
    store.commit('SET_FULL_SCREEN', false)
    store.commit('SET_VR_MODE', true)
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrviewer-sdk-vrmode')
  })

  it('瀏覽器不支援時不產生 default view', () => {
    vm.isBrowserSupport = true
    vm.isWebGlSupport = true
    vm._watcher.run()
    let defaultViewEl = vm.$el.querySelector('.vrsdk-default-container')
    expect(defaultViewEl)
      .not.toEqual(null)

    vm.isBrowserSupport = false
    vm._watcher.run()
    defaultViewEl = vm.$el.querySelector('.vrsdk-default-container')
    expect(defaultViewEl)
      .toEqual(null)

    vm.isBrowserSupport = true
    vm.isWebGlSupport = false
    vm._watcher.run()
    defaultViewEl = vm.$el.querySelector('.vrsdk-default-container')
    expect(defaultViewEl)
      .toEqual(null)

    vm.isBrowserSupport = false
    vm.isWebGlSupport = false
    vm._watcher.run()
    defaultViewEl = vm.$el.querySelector('.vrsdk-default-container')
    expect(defaultViewEl)
      .toEqual(null)
  })

  it('瀏覽器不支援時產生錯誤畫面', () => {
    vm.isBrowserSupport = false
    vm.isWebGlSupport = true
    vm._watcher.run()
    let errorContainerEl = vm.$el.querySelector('.error-wrapper-container')
    const textEl = text2html(vm.$t('browserNoSupport'))
    expect(errorContainerEl.textContent)
      .toContain(textEl.textContent)
  })

  it('WebGL不支援時產生錯誤畫面', () => {
    vm.isBrowserSupport = true
    vm.isWebGlSupport = false
    vm._watcher.run()
    let errorContainerEl = vm.$el.querySelector('.error-wrapper-container')
    const textEl = text2html(vm.$t('webGlNoSupport'))
    expect(errorContainerEl.textContent)
      .toContain(textEl.textContent)
  })
})
