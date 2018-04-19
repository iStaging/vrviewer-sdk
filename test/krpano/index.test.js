import KrpanoViewer from '@/KrpanoViewer'

describe('krpano/index.js', () => {
  let krpanoViewer
  beforeEach(() => {
    window.krpanoJS = 'something'
    krpanoViewer = new KrpanoViewer()
  })

  it('generateKrpano should', () => {
    expect(true).toBe(true)
  })
})
