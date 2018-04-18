import {
  checkPanoramaFormat
} from '@/common/helpers'

describe('checkPanoramaFormat', () => {
  const panorama = { anotherProp: '1' }

  it('throws error', () => {
    expect(() => {
      checkPanoramaFormat(panorama)
    }).toThrowError('panorama panoramaId is required')
  })
})
