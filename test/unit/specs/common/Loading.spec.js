import Vue from 'vue'
import Loading from '../../../../src/common/Loading.vue'
import IProgress from '../../../../src/components/IProgress.vue'
import store from '../../../../src/store'

const Constructor = Vue.extend(Loading)
describe('common/Loading.vue', () => {
  const vm = new Constructor({
    store,
    components: {
      IProgress
    }
  }).$mount()

  it('應該要有 className vrsdk-full-center 和 vrsdk-loading', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-loading')
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-full-center')
  })

  it('網頁尚未準備完成時，顯示 title 在畫面上', () => {
    const titleEl = vm.$el.querySelector('.vrsdk-progress-preview-title')
    store.commit('SET_APP_READY', false)
    store.commit('SET_PROGRESS_ACTIVE', true)
    const name = 'test name'
    store.commit('SET_PANO_COLLECTION', { name })
    vm._watcher.run()
    expect(titleEl.style.display)
      .not.toEqual('none')
    expect(titleEl.textContent)
      .toContain(name)
  })

  it('當網頁讀取完畢後，讀取條會有放在置頂的 class vrsdk-top-fixed', () => {
    store.commit('SET_APP_READY', true)
    vm._watcher.run()
    const progressEl = vm.$el.querySelector('.vrsdk-top-fixed')
    expect(progressEl)
      .not.toEqual(null)
  })

  it('讀取條只會在 isProgressActive = true 時顯示', () => {
    const progressEl = vm.$el.querySelector('.vrsdk-i-progress')
    store.commit('SET_PROGRESS_ACTIVE', false)
    vm._watcher.run()
    expect(progressEl.style.display)
      .toEqual('none')

    store.commit('SET_PROGRESS_ACTIVE', true)
    vm._watcher.run()
    expect(progressEl.style.display)
      .not.toEqual('none')
  })
})
