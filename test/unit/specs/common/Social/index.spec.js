import Vue from 'vue'
import Social from '@/common/Social/index'
import Icon from '@/components/Icon/index'
import store from '@/store'

const Constructor = Vue.extend(Social)

describe('common/Social/index.vue', () => {
  const vm = new Constructor({
    store,
    components: {
      Icon
    }
  }).$mount()

  it('應該要有 className social', () => {
    store.commit('SET_UI_MODE', false)
    store.commit('SET_SOCIAL', {
      viewCount: 1,
      likeCount: 0,
      commentCount: 0
    })
    vm._watcher.run()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('social')
  })

  it('若是空 social 且非 uiMode 時不要產出內容', () => {
    store.commit('SET_UI_MODE', true)
    store.commit('SET_SOCIAL', {})
    vm._watcher.run()
    let child = vm.$el.children ? vm.$el.children[0] : null
    expect(child)
      .to.equal(null)

    store.commit('SET_UI_MODE', false)
    store.commit('SET_SOCIAL', {
      viewCount: 1,
      likeCount: 0,
      commentCount: 0
    })
    vm._watcher.run()
    child = vm.$el.children ? vm.$el.children[0] : null
    expect(child)
      .not.to.equal(null)
  })
})
