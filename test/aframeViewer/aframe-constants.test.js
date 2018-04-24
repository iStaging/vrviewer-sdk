import aframeConstants from '@/aframeViewer/aframe-constants'

describe('aframeConstants', () => {
  it('sceneEl should be set', () => {
    const sceneEl = document.createElement('a-scene')
    aframeConstants.setSceneEl(sceneEl)
    expect(aframeConstants.getSceneEl()).toEqual(sceneEl)
  })

  it('assetsEl should be set', () => {
    const assetsEl = document.createElement('a-assets')
    aframeConstants.setAssetsEl(assetsEl)
    expect(aframeConstants.getAssetsEl()).toEqual(assetsEl)
  })

  it('skyEl should be set', () => {
    const skyEl = document.createElement('a-sky')
    aframeConstants.setSkyEl(skyEl)
    expect(aframeConstants.getSkyEl()).toEqual(skyEl)
  })

  it('camerEl should be set', () => {
    const cameraEl = document.createElement('a-camera')
    aframeConstants.setCameraEl(cameraEl)
    expect(aframeConstants.getCameraEl()).toEqual(cameraEl)
  })

  it('cameraContainerEl should be set', () => {
    const cameraContainerEl = document.createElement('a-entity')
    aframeConstants.setCameraContainerEl(cameraContainerEl)
    expect(aframeConstants.getCameraContainerEl())
      .toEqual(cameraContainerEl)
  })

  it('cameraAnimationEl should be set', () => {
    const cameraAnimationEl = document.createElement('a-animation')
    aframeConstants.setCameraAnimationEl(cameraAnimationEl)
    expect(aframeConstants.getCameraAnimationEl())
      .toEqual(cameraAnimationEl)
  })

  it('cameraStartRotation should be set', () => {
    const currentPanorama = {
      panoramaId: '1',
      panoramaRotation: { x: 0, y: 0, z: 0 }
    }
    aframeConstants.setCameraStartRotation(currentPanorama.panoramaRotation)
    expect(aframeConstants.getCameraStartRotation())
      .toEqual(currentPanorama.panoramaRotation)
  })

  it('cameraRotation should be set', () => {
    const cameraContainerEl = document.createElement('a-entity')
    const cameraRotation = cameraContainerEl.getAttribute('rotation')
    aframeConstants.setCameraRotation(cameraRotation)
    expect(aframeConstants.getCameraRotation())
      .toEqual(cameraRotation)
  })
})
