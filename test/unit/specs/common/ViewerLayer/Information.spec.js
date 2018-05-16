import Vue from 'vue'
import Information from '@/common/ViewerLayer/Information.vue'

const Constructor = Vue.extend(Information)
const name = 'test name'
const description = 'test description'
const vm = new Constructor({
  propsData: {
    name,
    description
  }
}).$mount()

describe('common/ViewerLayer/Information.vue', () => {
  it('應該要有 className information', () => {
    expect(Array.prototype.slice.call(vm.$el.classList))
      .to.include('information')
  })

  it('應該要有一個 DOM className information-title', () => {
    const el = vm.$el.querySelector('.information-title')
    expect(Array.prototype.slice.call(el))
      .not.to.equal(null)
  })

  it('DOM information-title 應包含傳進來的 name', () => {
    const el = vm.$el.querySelector('.information-title')
    expect(el.textContent)
      .to.contain(name)
  })

  it('應該要有一個 DOM className information-text', () => {
    const el = vm.$el.querySelector('.information-text')
    expect(Array.prototype.slice.call(el))
      .not.to.equal(null)
  })

  it('DOM information-text 應包含傳進來的 description', () => {
    const el = vm.$el.querySelector('.information-text')
    expect(el.textContent)
      .to.contain(description)
  })
})
