import KrpanoTripod from '@/KrpanoViewer/extends/tripod'

describe('krpano/extends/tripod.js', () => {
  let tripodSettings = {
    image: 'test',
    size: 50
  }

  it('setTripodSettings and getTripodSettings should be worked', () => {
    const krpanoTripod = new KrpanoTripod()
    krpanoTripod.setTripodSettings(tripodSettings)
    expect(krpanoTripod.getTripodSettings()).toEqual(tripodSettings)
  })
})
