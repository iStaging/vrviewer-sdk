import Vue from 'vue'
import ICard from '@/components/ICard'
const Constructor = Vue.extend(ICard)

describe('ICard.vue', () => {
  it('should has class i-card', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include('i-card')
  })

  it('should has class i-card-hover-effect if isScale === true', () => {
    const className = 'i-card-hover-effect'
    const vm = new Constructor({
      propsData: {
        isScale: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include(className)
  })

  // it('should has class i-card-select-effect if isSelect === true', () => {
  //   const className = 'i-card-select-effect'
  //   const vm = new Constructor({
  //     propsData: {
  //       isSelect: true
  //     }
  //   }).$mount()
  //   expect(Array.prototype.slice.call(vm.$el.classList)).to.include(className)
  // })

  it('should a last child has class i-card-drag-icon if isDrag === true', () => {
    const className = 'i-card-drag-icon'
    const vm = new Constructor({
      propsData: {
        isDrag: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.lastChild.classList)).to.include(className)
  })

  it('should a last child has class i-card-drag-icon-disabled if isDrag === true and isDragDisabled === true', () => {
    const className = 'i-card-drag-icon'
    const vm = new Constructor({
      propsData: {
        isDrag: true,
        isDragDisabled: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.lastChild.classList)).to.include(className)
  })

  it('should show owner if there has owner', () => {
    const owner = 'tester'
    const vm = new Constructor({
      propsData: {
        owner
      }
    }).$mount()
    expect(vm.$el.querySelector('.i-card-owner').textContent).to.equal(owner)
  })

  it('should show date if there has date', () => {
    const date = '2017/08/03'
    const vm = new Constructor({
      propsData: {
        date
      }
    }).$mount()
    expect(vm.$el.querySelector('.i-card-date').textContent).to.equal(date)
  })
})
