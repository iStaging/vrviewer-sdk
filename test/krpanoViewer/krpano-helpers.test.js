import Krpano from '@/krpanoViewer/index'
import KrpanoHelpers from '@/krpanoViewer/krpano-helpers'

describe('krpano/hrpano-helpers.js', () => {
  it('setConfig should be worked well', () => {
    window.krpanoJS = 'something'
    const krpano = new Krpano()

    const autoRotateSettings = { test: 'test autoRotateSettings' }
    const gyroSettings = { test: 'test gyroSettings' }
    const tripodSettings = { test: 'test tripodSettings' }
    const basicSettings = { test: 'test basicSettings' }
    const loadingSettings = { test: 'test loadingSettings' }
    const initViewSettings = { test: 'test initViewSettings' }
    const config = {
      autoRotateSettings,
      gyroSettings,
      tripodSettings,
      basicSettings,
      loadingSettings,
      initViewSettings
    }
    KrpanoHelpers.setConfig.call(krpano, config)
    expect(krpano.getAutoRotateSettings()).toEqual(autoRotateSettings)
    expect(krpano.getGyroSettings()).toEqual(gyroSettings)
    expect(krpano.getTripodSettings()).toEqual(tripodSettings)
    expect(krpano.getBasicSettings()).toEqual(basicSettings)
    expect(krpano.getLoadingSettings()).toEqual(loadingSettings)
    expect(krpano.getInitViewSettings()).toEqual(initViewSettings)
  })
})
