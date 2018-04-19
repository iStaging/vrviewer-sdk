import KrpanoBasic from '@/KrpanoViewer/extends/basic'

describe('krpano/extends/settings.js', () => {
  let basicSettings = {
    mwheel: true,
    focus: false
  }

  it('setBasicSettings and getBasicSettings should be worked', () => {
    const krpanoBasic = new KrpanoBasic()
    krpanoBasic.setBasicSettings(basicSettings)
    expect(krpanoBasic.getBasicSettings()).toEqual(basicSettings)
  })
})
