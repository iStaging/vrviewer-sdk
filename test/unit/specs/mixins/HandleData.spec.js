import { mount } from '@vue/test-utils'
import App from '@/App'

const cmp = mount(App)

describe('HandleData.vue mixin - isEmpty():', () => {
  it('should return true with empty string', () => {
    const emptyString = ''
    expect(cmp.vm.isEmpty(emptyString)).toEqual(true)
  })
  it('should return true with empty array', () => {
    const emptyArray = []
    expect(cmp.vm.isEmpty(emptyArray)).toEqual(true)
  })
  it('should return true with empty object', () => {
    const emptyObject = {}
    expect(cmp.vm.isEmpty(emptyObject)).toEqual(true)
  })
})
