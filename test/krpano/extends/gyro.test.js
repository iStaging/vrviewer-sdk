import KrpanoGyro from '@/krpano/extends/gyro'

describe('krpano/extends/gyro.js', () => {
  let gyroSettings = {
    active: false
  }

  it('setGyroSettings and getGyroSettings should be worked', () => {
    const krpanoGyro = new KrpanoGyro()
    krpanoGyro.setGyroSettings(gyroSettings)
    expect(krpanoGyro.getGyroSettings()).toEqual(gyroSettings)
  })
})
