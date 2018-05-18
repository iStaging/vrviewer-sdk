import Vue from 'vue'
import SvgIcon from '../../../../../src/components/SvgIcon/index.vue'
const Constructor = Vue.extend(SvgIcon)

describe('components/Icon/index.vue', () => {
  it('應該要有 className vrsdk-svg-icon', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('vrsdk-svg-icon')
  })
})
