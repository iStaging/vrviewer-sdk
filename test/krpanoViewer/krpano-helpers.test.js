import KrpanoViewer from '@/krpanoViewer/index'
import krpanoHelpers from '@/krpanoViewer/krpano-helpers'
import krpanoConstants from '@/krpanoViewer/krpano-constants'
import { clone } from '@/common/utils'

describe('krpano/hrpano-helpers.js', () => {
  const krpanoEl = {
    call: () => {}
  }
  window.krpanoJS = 'something'
  window.embedpano = (config) => {
    config.onready(krpanoEl)
  }
  window.removepano = () => {}
  let krpanoViewer
  beforeEach(() => {
    krpanoViewer = new KrpanoViewer()
  })

  it('embedPano should be worked well', () => {
    const storedFunction = krpanoHelpers.handleKrpanoReady
    krpanoHelpers.handleKrpanoReady = jest.fn()
    krpanoHelpers.embedPano.call(krpanoViewer)
    expect(krpanoHelpers.handleKrpanoReady).toBeCalled()
    krpanoHelpers.handleKrpanoReady = storedFunction
  })

  it('handleKrpanoReady should be worked well', (done) => {
    jest.setTimeout(2000)
    const storedFunction = krpanoConstants.setKrpanoEl
    const callback = jest.fn
    krpanoConstants.setKrpanoEl = jest.fn()
    krpanoHelpers.handleKrpanoReady.call(krpanoViewer, krpanoEl, callback)
    expect(krpanoConstants.setKrpanoEl).toBeCalled()
    krpanoConstants.setKrpanoEl = storedFunction
    window.setTimeout(() => {
      expect(callback).toBeCalled()
    }, 1500)
    done()
  })

  it('setConfig should be worked well', () => {
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
    krpanoViewer.setAutoRotateSettings = jest.fn()
    krpanoViewer.setGyroSettings = jest.fn()
    krpanoViewer.setTripodSettings = jest.fn()
    krpanoViewer.setBasicSettings = jest.fn()
    krpanoViewer.setLoadingSettings = jest.fn()
    krpanoViewer.setInitViewSettings = jest.fn()
    krpanoHelpers.setConfig.call(krpanoViewer, config)
    expect(krpanoViewer.setAutoRotateSettings).toBeCalled()
    expect(krpanoViewer.setGyroSettings).toBeCalled()
    expect(krpanoViewer.setTripodSettings).toBeCalled()
    expect(krpanoViewer.setBasicSettings).toBeCalled()
    expect(krpanoViewer.setLoadingSettings).toBeCalled()
    expect(krpanoViewer.setInitViewSettings).toBeCalled()
  })
})
