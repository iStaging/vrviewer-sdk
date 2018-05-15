import Vue from 'vue'
import IRepeat from '@/components/IRepeat'
const Constructor = Vue.extend(IRepeat)

describe('IRepeat.vue', () => {
  it('should be an element ul', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.tagName).to.equal('UL')
  })

  it('should children be an element li', () => {
    const vm = new Constructor({
      propsData: {
        model: ['test1', 'test2']
      }
    }).$mount()
    expect(Array.from(vm.$el.children)[0].tagName).to.equal('LI')
    expect(Array.from(vm.$el.children)[1].tagName).to.equal('LI')
  })

  it('should children li has custom className', () => {
    const className = 'testing'
    const vm = new Constructor({
      propsData: {
        model: ['test1', 'test2'],
        liClass: className
      }
    }).$mount()
    expect(Array.prototype.slice.call(Array.from(vm.$el.children)[0].classList)).to.include(className)
    expect(Array.prototype.slice.call(Array.from(vm.$el.children)[1].classList)).to.include(className)
  })

  // 完全找不到測試 slot 的方法
  // it('should render component in slot', () => {
  //   const MockedComponent = `<div class="component" slot="test">Hello</div>`
  //   const vm = new Constructor({
  //     propsData: {
  //       model: ['test']
  //     },
  //     slots: MockedComponent
  //   }).$mount()
  //   // expect(Array.from(vm.$el.children)[0]).to.have.html(MockedComponent)
  //   expect(vm.$el.querySelector('.component')).to.exist()
  // })
})
