import {
  clone,
  push,
  unshift
} from '@/common/utils'

describe('clone', () => {
  let a

  beforeEach(() => {
    a = { id: '1' }
  })

  it('creates copy', () => {
    const b = a
    expect(a).toBe(b)
  })

  it('creates clone', () => {
    const b = clone(a)
    expect(a).toEqual(b)
  })
})

describe('push', () => {
  let a

  beforeEach(() => {
    a = ['1']
  })

  it('creates copy', () => {
    const b = a
    b.push('2')
    expect(a).toBe(b)
  })

  it('creates clone', () => {
    const b = a
    const c = push(b, '2')
    expect(a).not.toBe(c)
  })
})

describe('unshift', () => {
  let a
  beforeEach(() => {
    a = ['1']
  })

  it('creates copy', () => {
    const b = a
    b.push('2')
    expect(a).toBe(b)
  })

  it('creates clone', () => {
    const b = a
    const c = unshift(b, '2')
    expect(a).not.toBe(c)
  })
})
