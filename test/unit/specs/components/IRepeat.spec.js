import Vue from 'vue'
import IRepeat from '@/components/IRepeat'
const Constructor = Vue.extend(IRepeat)

describe('components/IRepeat.vue', () => {
  it('應該要有 className i-repeat', () => {
    const vm = new Constructor().$mount()
    expect(Array.prototype.slice.call(vm.$el.classList))
      .toContain('i-repeat')
  })

  it('第一層 DOM li 應該要有 className i-repeat-li', () => {
    const vm = new Constructor({
      propsData: {
        model: ['test']
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.querySelector('li').classList))
      .toContain('i-repeat-li')
  })

  it('liClass 應該要能產生在第一層 DOM 的 className 裡', () => {
    const liClass = 'test'
    const vm = new Constructor({
      propsData: {
        model: ['test'],
        liClass
      }
    }).$mount()
    expect(Array.prototype.slice.call(vm.$el.querySelector('li').classList))
      .toContain(liClass)
  })

  it('第一層 DOM li 的數量應等於陣列 model 的數量', () => {
    const model = ['test1', 'test2', 'test3', 'test4', 'test5']
    const vm = new Constructor({
      propsData: {
        model
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('li').length)
      .toEqual(model.length)
  })
})
