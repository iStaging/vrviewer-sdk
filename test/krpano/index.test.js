import Krpano from '@/krpanoViewer/index'

describe('krpano/index.js', () => {
  let krpano
  beforeEach(() => {
    window.krpanoJS = 'something'
    krpano = new Krpano()
  })

  it('generateKrpano should', () => {
    expect(true).toBe(true)
  })
})
