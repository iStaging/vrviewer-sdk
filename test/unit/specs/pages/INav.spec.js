import { mount } from '@vue/test-utils'
import INav from '@/pages/INav'
import Icon from '@/components/Icon'
import IRepeat from '@/components/IRepeat'
import store from '@/store'
import { i18n } from '@/main'

describe('Default/INav.vue', () => {
  const cmp = mount(INav, {
    store,
    i18n,
    components: {
      Icon,
      IRepeat
    }
  })

  it('應該要有 className i-nav', () => {
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('i-nav')
  })

  it('should one of children has className i-nav-mobile-outer', () => {
    const mobileOuter = cmp.vm.$el.querySelector('.i-nav-mobile-outer')
    expect(mobileOuter)
      .not.toEqual(null)
  })

  it('should one of children has className i-nav-mobile-inner', () => {
    const mobileInner = cmp.vm.$el.querySelector('.i-nav-mobile-inner')
    expect(mobileInner)
      .not.toEqual(null)
  })

  it('should one of children has className i-nav-pc', () => {
    const pc = cmp.vm.$el.querySelector('.i-nav-pc')
    expect(pc)
      .not.toEqual(null)
  })
})
