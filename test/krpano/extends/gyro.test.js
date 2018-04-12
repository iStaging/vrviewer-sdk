import KrpanoGyroView from '@/krpano/extends/gyro'

describe('krpano/extends/init-view.js', () => {
  let gyroSettings = {
    active: false
  }

  it('setGyroSettings and getGyroSettings should be worked', () => {
    const krpanoGyroView = new KrpanoGyroView()
    krpanoGyroView.setGyroSettings(gyroSettings)
    expect(krpanoGyroView.getGyroSettings()).toEqual(gyroSettings)
  })
})
