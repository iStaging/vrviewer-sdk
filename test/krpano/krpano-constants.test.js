import KrpanoConstants from '@/krpanoViewer/krpano-constants'

describe('krpano/krpano-constants.js', () => {
  it('setKrpanoId and getKrpanoId should be worked', () => {
    const krpanoId = 'testId'
    KrpanoConstants.setKrpanoId(krpanoId)
    expect(KrpanoConstants.getKrpanoId()).toEqual(krpanoId)
  })

  it('setKrpanoXml and getKrpanoXml should be worked', () => {
    const krpanoXml = 'testXml'
    KrpanoConstants.setKrpanoXml(krpanoXml)
    expect(KrpanoConstants.getKrpanoXml()).toEqual(krpanoXml)
  })

  it('setKrpanoEl and getKrpanoEl should be worked', () => {
    const krpanoEl = 'testEl'
    KrpanoConstants.setKrpanoEl(krpanoEl)
    expect(KrpanoConstants.getKrpanoEl()).toEqual(krpanoEl)
  })

  it('addVrModeShouldHide should be worked', () => {
    const newVrModeShouldHide = 'testHide'
    KrpanoConstants.addVrModeShouldHide(newVrModeShouldHide)
    const { vrModeShouldHide } = KrpanoConstants.getKrpanoVrModeObj()
    expect(vrModeShouldHide).toEqual(expect.arrayContaining(['testHide']))
  })

  it('addVrModeShouldShow should be worked', () => {
    const initVrModeShouldShow = ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    const newVrModeShouldShow = 'testShow'
    KrpanoConstants.addVrModeShouldShow(newVrModeShouldShow)
    const { vrModeShouldShow } = KrpanoConstants.getKrpanoVrModeObj()
    expect(vrModeShouldShow).toEqual(expect.arrayContaining(initVrModeShouldShow.concat(['testShow'])))
  })

  it('setKrpanoLookAtH and getKrpanoLookAtH should be worked', () => {
    const krpanoLookAtH = 'testLookAtH'
    KrpanoConstants.setKrpanoLookAtH(krpanoLookAtH)
    expect(KrpanoConstants.getKrpanoLookAtH()).toEqual(krpanoLookAtH)
  })

  it('getDefaultFov should be 120', () => {
    expect(KrpanoConstants.getDefaultFov()).toEqual(120)
  })

  it('getKrpanoXOffset should be 90', () => {
    expect(KrpanoConstants.getKrpanoXOffset()).toEqual(90)
  })

  it('getVrThumbAth should be 24', () => {
    expect(KrpanoConstants.getVrThumbAth()).toEqual(24)
  })
})
