import Vue from 'vue'
import Icon from '@/components/Icon'
const Constructor = Vue.extend(Icon)

describe('Icon.vue', () => {
  it('should has class pano-icon', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include('pano-icon')
  })

  // it('should can set custom class', () => {
  //   const className = 'custom-class'
  //   const vm = new Constructor({
  //     propsData: {
  //       className
  //     }
  //   }).$mount()
  //   expect(Array.prototype.slice.call(vm.$el.classList)).to.include(className)
  // })
})
