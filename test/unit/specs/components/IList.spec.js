import Vue from 'vue'
import IList from '@/components/IList'
const Constructor = Vue.extend(IList)

describe('IList.vue', () => {
  it('should has class i-list', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include('i-list')
  })

  it('should has class i-list-hover-effect if isScale === true', () => {
    const className = 'i-list-hover-effect'
    const vm = new Constructor({
      propsData: {
        isScale: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include(className)
  })

  it('should has class i-list-select-effect if isSelect === true', () => {
    const className = 'i-list-select-effect'
    const vm = new Constructor({
      propsData: {
        isSelect: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.classList)).to.include(className)
  })

  it('should a last child has class i-list-drag-icon if isDrag === true', () => {
    const className = 'i-list-drag-icon'
    const vm = new Constructor({
      propsData: {
        isDrag: true
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.lastChild.classList)).to.include(className)
  })

  it('should a last child has class i-list-drag-icon-disabled if isDrag === true and isDragDisabled === true', () => {
    const className = 'i-list-drag-icon'
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
    expect(vm.$el.querySelector('.i-list-owner').textContent).to.equal(owner)
  })

  it('should show date if there has date', () => {
    const date = '2017/08/03'
    const vm = new Constructor({
      propsData: {
        date
      }
    }).$mount()
    expect(vm.$el.querySelector('.i-list-date').textContent).to.equal(date)
  })
})
