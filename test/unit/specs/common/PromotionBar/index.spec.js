import Vue from 'vue'
import PromotionBar from '@/common/PromotionBar/index'
import Icon from '@/components/Icon'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(PromotionBar)

describe('common/PromotionBar/index.vue', () => {
  const vm = new Constructor({
    i18n,
    store,
    components: {
      Icon
    }
  }).$mount()

  it('應該要有 className promotion-bar', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('promotion-bar')
  })

  it('isPromotionBarActive = false 時不顯示', () => {
    store.commit('SET_PROMOTION_BAR_ACTIVE', false)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .to.equal('none')
  })

  it('isPromotionBarActive = true 時顯示', () => {
    store.commit('SET_PROMOTION_BAR_ACTIVE', true)
    vm._watcher.run()
    expect(vm.$el.style.display)
      .not.to.equal('none')
  })

  it('promotion-bar-button 要能夠正確關閉 promotion bar', () => {
    const button = vm.$el.querySelector('.promotion-bar-button')
    button.click()
    vm._watcher.run()
    expect(vm.$el.style.display)
      .to.equal('none')
  })
})
