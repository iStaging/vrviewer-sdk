import { mount } from '@vue/test-utils'
import IRepeat from '@/components/IRepeat'

describe('components/IRepeat.vue', () => {
  it('應該要有 className i-repeat', () => {
    const cmp = mount(IRepeat)
    expect(Array.prototype.slice.call(cmp.vm.$el.classList))
      .toContain('i-repeat')
  })

  it('第一層 DOM li 應該要有 className i-repeat-li', () => {
    const cmp = mount(IRepeat, {
      propsData: {
        model: ['test']
      }
    })
    expect(Array.prototype.slice.call(cmp.vm.$el.querySelector('li').classList))
      .toContain('i-repeat-li')
  })

  it('liClass 應該要能產生在第一層 DOM 的 className 裡', () => {
    const liClass = 'test'
    const cmp = mount(IRepeat, {
      propsData: {
        model: ['test'],
        liClass
      }
    })
    expect(Array.prototype.slice.call(cmp.vm.$el.querySelector('li').classList))
      .toContain(liClass)
  })

  it('第一層 DOM li 的數量應等於陣列 model 的數量', () => {
    const model = ['test1', 'test2', 'test3', 'test4', 'test5']
    const cmp = mount(IRepeat, {
      propsData: {
        model
      }
    })
    expect(cmp.vm.$el.querySelectorAll('li').length)
      .toEqual(model.length)
  })
})
