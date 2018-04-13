import Krpano from '@/krpano/index'

describe('krpano/index.js', () => {
  let krpano
  beforeEach(() => {
    krpano = new Krpano()
  })

  it('setKrpanoId and getKrpanoId should be worked', () => {
    const krpanoId = 'testId'
    krpano.setKrpanoId(krpanoId)
    expect(krpano.getKrpanoId()).toEqual(krpanoId)
  })

  it('setKrpanoXml and getKrpanoXml should be worked', () => {
    const krpanoXml = 'testXml'
    krpano.setKrpanoXml(krpanoXml)
    expect(krpano.getKrpanoXml()).toEqual(krpanoXml)
  })

  it('setKrpanoEl and getKrpanoEl should be worked', () => {
    const krpanoEl = 'testEl'
    krpano.setKrpanoEl(krpanoEl)
    expect(krpano.getKrpanoEl()).toEqual(krpanoEl)
  })

  it('addVrModeShouldHide should be worked', () => {
    const newVrModeShouldHide = 'testHide'
    krpano.addVrModeShouldHide(newVrModeShouldHide)
    const { vrModeShouldHide } = krpano.getKrpanoVrModeObj()
    expect(vrModeShouldHide).toEqual(expect.arrayContaining(['testHide']))
  })

  it('addVrModeShouldShow should be worked', () => {
    const initVrModeShouldShow = ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    const newVrModeShouldShow = 'testShow'
    krpano.addVrModeShouldShow(newVrModeShouldShow)
    const { vrModeShouldShow } = krpano.getKrpanoVrModeObj()
    expect(vrModeShouldShow).toEqual(expect.arrayContaining(initVrModeShouldShow.concat(['testShow'])))
  })

  it('setKrpanoLookAtH and getKrpanoLookAtH should be worked', () => {
    const krpanoLookAtH = 'testLookAtH'
    krpano.setKrpanoLookAtH(krpanoLookAtH)
    expect(krpano.getKrpanoLookAtH()).toEqual(krpanoLookAtH)
  })

  it('getDefaultFov should be 120', () => {
    expect(krpano.getDefaultFov()).toEqual(120)
  })

  it('getKrpanoXOffset should be 90', () => {
    expect(krpano.getKrpanoXOffset()).toEqual(90)
  })

  it('getVrThumbAth should be 24', () => {
    expect(krpano.getVrThumbAth()).toEqual(24)
  })

  it('generateKrpano should', () => {
  })

  it('setConfig should', () => {
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
    krpano.setConfig(config)
    expect(krpano.getAutoRotateSettings()).toEqual(autoRotateSettings)
    expect(krpano.getGyroSettings()).toEqual(gyroSettings)
    expect(krpano.getTripodSettings()).toEqual(tripodSettings)
    expect(krpano.getBasicSettings()).toEqual(basicSettings)
    expect(krpano.getLoadingSettings()).toEqual(loadingSettings)
    expect(krpano.getInitViewSettings()).toEqual(initViewSettings)
  })
})
