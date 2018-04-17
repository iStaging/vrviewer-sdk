import KrpanoLoadingPanorama from '@/krpano/extends/loading-panorama'

describe('krpano/extends/loading-panorama.js', () => {
  let loadingSettings = {
    onLoadingPanoramaStart () {},
    onLoadingPanoramaFinish () {},
    onLoadingPanoramaProgress (event) {},
    onLoadingPanoramaError (error) {}
  }

  it('setLoadingSettings and getLoadingSettings should be worked', () => {
    const krpanoLoadingPanorama = new KrpanoLoadingPanorama()
    krpanoLoadingPanorama.setLoadingSettings(loadingSettings)
    expect(krpanoLoadingPanorama.getLoadingSettings()).toEqual(loadingSettings)
  })
})
