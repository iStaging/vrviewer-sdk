import KrpanoBasic from '@/krpano/extends/basic'
import { isEqual } from '@/common/utils'

describe('krpano/extends/settings.js', () => {
  let basicSettings = {
    html5: 'webgl+only',
    webglsettings: { depth: true },
    passQueryParameters: true,
    lazyLoad: true,
    mwheel: true,
    focus: false
  }

  it('setBasicSettings and getBasicSettings should be worked', () => {
    const krpanoBasic = new KrpanoBasic()
    krpanoBasic.setBasicSettings(basicSettings)
    expect(krpanoBasic.getBasicSettings()).toEqual(basicSettings)
  })
})
