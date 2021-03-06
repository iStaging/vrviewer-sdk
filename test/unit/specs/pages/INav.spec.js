import Vue from 'vue'
import INav from '../../../../src/pages/INav'
import Icon from '../../../../src/components/Icon'
import IRepeat from '../../../../src/components/IRepeat'
import store from '../../../../src/store'
import { i18n } from '../../../../src/main'

const Constructor = Vue.extend(INav)

describe('INav.vue', () => {
  const vm = new Constructor({
    store,
    i18n,
    components: {
      Icon,
      IRepeat
    }
  }).$mount()

  it('應該要有 className vrsdk-i-nav', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-i-nav')
  })

  it('should one of children has className vrsdk-i-nav-mobile-outer', () => {
    const mobileOuter = vm.$el.querySelector('.vrsdk-i-nav-mobile-outer')
    expect(mobileOuter)
      .not.toEqual(null)
  })

  it('should one of children has className vrsdk-i-nav-mobile-inner', () => {
    const mobileInner = vm.$el.querySelector('.vrsdk-i-nav-mobile-inner')
    expect(mobileInner)
      .not.toEqual(null)
  })

  it('should one of children has className vrsdk-i-nav-pc', () => {
    const pc = vm.$el.querySelector('.vrsdk-i-nav-pc')
    expect(pc)
      .not.toEqual(null)
  })
})
