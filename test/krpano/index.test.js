import KrpanoViewer from '@/KrpanoViewer'

describe('krpano/index.js', () => {
  let krpanoViewer
  beforeEach(() => {
    krpanoViewer = new KrpanoViewer()
  })

  it('setKrpanoId and getKrpanoId should be worked', () => {
    const krpanoId = 'testId'
    krpanoViewer.setKrpanoId(krpanoId)
    expect(krpanoViewer.getKrpanoId()).toEqual(krpanoId)
  })

  it('setKrpanoXml and getKrpanoXml should be worked', () => {
    const krpanoXml = 'testXml'
    krpanoViewer.setKrpanoXml(krpanoXml)
    expect(krpanoViewer.getKrpanoXml()).toEqual(krpanoXml)
  })

  it('setKrpanoEl and getKrpanoEl should be worked', () => {
    const krpanoEl = 'testEl'
    krpanoViewer.setKrpanoEl(krpanoEl)
    expect(krpanoViewer.getKrpanoEl()).toEqual(krpanoEl)
  })

  it('addVrModeShouldHide should be worked', () => {
    const newVrModeShouldHide = 'testHide'
    krpanoViewer.addVrModeShouldHide(newVrModeShouldHide)
    const { vrModeShouldHide } = krpanoViewer.getKrpanoVrModeObj()
    expect(vrModeShouldHide).toEqual(expect.arrayContaining(['testHide']))
  })

  it('addVrModeShouldShow should be worked', () => {
    const initVrModeShouldShow = ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    const newVrModeShouldShow = 'testShow'
    krpanoViewer.addVrModeShouldShow(newVrModeShouldShow)
    const { vrModeShouldShow } = krpanoViewer.getKrpanoVrModeObj()
    expect(vrModeShouldShow).toEqual(expect.arrayContaining(initVrModeShouldShow.concat(['testShow'])))
  })

  it('setKrpanoLookAtH and getKrpanoLookAtH should be worked', () => {
    const krpanoLookAtH = 'testLookAtH'
    krpanoViewer.setKrpanoLookAtH(krpanoLookAtH)
    expect(krpanoViewer.getKrpanoLookAtH()).toEqual(krpanoLookAtH)
  })

  it('getDefaultFov should be 120', () => {
    expect(krpanoViewer.getDefaultFov()).toEqual(120)
  })

  it('getKrpanoXOffset should be 90', () => {
    expect(krpanoViewer.getKrpanoXOffset()).toEqual(90)
  })

  it('getVrThumbAth should be 24', () => {
    expect(krpanoViewer.getVrThumbAth()).toEqual(24)
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
    krpanoViewer.setConfig(config)
    expect(krpanoViewer.getAutoRotateSettings()).toEqual(autoRotateSettings)
    expect(krpanoViewer.getGyroSettings()).toEqual(gyroSettings)
    expect(krpanoViewer.getTripodSettings()).toEqual(tripodSettings)
    expect(krpanoViewer.getBasicSettings()).toEqual(basicSettings)
    expect(krpanoViewer.getLoadingSettings()).toEqual(loadingSettings)
    expect(krpanoViewer.getInitViewSettings()).toEqual(initViewSettings)
  })
})
