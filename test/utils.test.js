import {
  clone,
  push,
  unshift
} from '@/common/utils'

describe('utils', () => {
  it('clone', () => {
    const a = { id: '1' }
    const b = clone(a)
    expect(a).toEqual(b)
  })

  it('push', () => {
    const a = ['1']
    const b = a
    const c = push(b, '2')
    expect(a).not.toBe(c)
  })

  it('unshift', () => {
    const a = ['1']
    const b = a
    const c = unshift(b, '2')
    expect(a).not.toBe(c)
  })
})
