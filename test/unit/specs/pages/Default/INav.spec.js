import Vue from 'vue'
import INav from '@/pages/Default/INav'
import Icon from '@/components/Icon'
import IRepeat from '@/components/IRepeat'
import store from '@/store'
import { i18n } from '@/main'

const Constructor = Vue.extend(INav)

describe('Default/INav.vue', () => {
  const vm = new Constructor({
    store,
    i18n,
    components: {
      Icon,
      IRepeat
    }
  }).$mount()

  it('應該要有 className i-nav', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('i-nav')
  })

  it('should one of children has className i-nav-mobile-outer', () => {
    const mobileOuter = vm.$el.querySelector('.i-nav-mobile-outer')
    expect(mobileOuter)
      .not.to.equal(null)
  })

  it('should one of children has className i-nav-mobile-inner', () => {
    const mobileInner = vm.$el.querySelector('.i-nav-mobile-inner')
    expect(mobileInner)
      .not.to.equal(null)
  })

  it('should one of children has className i-nav-pc', () => {
    const pc = vm.$el.querySelector('.i-nav-pc')
    expect(pc)
      .not.to.equal(null)
  })
})
