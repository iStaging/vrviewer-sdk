import KrpanoViewer from '@/KrpanoViewer'
import krpanoConstants from '@/krpanoViewer/krpano-constants'

describe('krpano/index.js', () => {
  let krpanoViewer
  beforeEach(() => {
    window.krpanoJS = 'something'
    window.embedpano = (config) => {
      config.onready({
        call: () => {}
      })
    }
    window.removepano = () => {}
    krpanoViewer = new KrpanoViewer()
  })

  it('generateKrpano should call setKrpanoId, setConfig, initKrpanoVRModeItems, generateXml and embedPano', (done) => {
    jest.setTimeout(2000)
    const mockCallback = jest.fn()
    krpanoViewer.generateKrpano({}, mockCallback)
    const krpanoId = krpanoConstants.getKrpanoId()
    expect(krpanoId).not.toEqual('')
    const krpanoXml = krpanoConstants.setKrpanoXml()
    expect(krpanoXml).not.toEqual('')
    window.setTimeout(() => {
      expect(mockCallback).toBeCalled()
      done()
    }, 1500)
  })
})
