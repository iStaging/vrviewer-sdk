import { mount } from '@vue/test-utils'
import App from '@/App'

const vm = mount(App)

describe('HandleData.vue mixin - isEmpty():', () => {
  it('should return true with empty string', () => {
    const emptyString = ''
    expect(vm.isEmpty(emptyString)).toEqual(true)
  })
  it('should return true with empty array', () => {
    const emptyArray = []
    expect(vm.isEmpty(emptyArray)).toEqual(true)
  })
  it('should return true with empty object', () => {
    const emptyObject = {}
    expect(vm.isEmpty(emptyObject)).toEqual(true)
  })
})
