import Vue from 'vue'
import App from '@/App'

const Constructor = Vue.extend(App)
const vm = new Constructor().$mount()

describe('FetchData.vue mixin - shouldSubmit():', () => {
  it('should submit form with isFormValid parameter', () => {
    const form = {
      isFormValid: true
    }
    expect(vm.shouldSubmit(form)).to.equal(true)
  })
})

describe('FetchData.vue mixin - getParameterByName():', () => {
  // getParameterByName: pending with different type like array, object, error format
  it('should accept param with string value', () => {
    const url1 = 'xxx?param1=1'
    expect(vm.getParameterByName('param1', url1)).to.equal('1')
  })

  // it('getParameterByName: should accept param with array value', () => {
  //   const url2 = 'xxx?param2=[1,2]'
  //   expect(vm.getParameterByName('param2', url2)).to.equal([1, 2])
  // })
})
