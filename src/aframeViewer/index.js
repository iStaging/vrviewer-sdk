import {
  isFunction,
  loadImage,
  setAttributes
} from '@/common/utils'
import CommonViewer from '@/common/common-viewer.js'
import aframeConstants from '@/aframeViewer/aframe-constants'
import aframeHelpers from '@/aframeViewer/aframe-helpers'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
    this.timeout = 1000
  }

  generateAframe (config = { disableVR: false, autoRotate: {} }) {
    const sceneEl = document.createElement('a-scene')
    const skyEl = document.createElement('a-sky')
    const cameraEl = document.createElement('a-camera')
    const cameraContainerEl = document.createElement('a-entity')
    const cameraStartRotationEl = this.getCurrentPanorama().panoramaRotation || {}
    const cameraAnimationEl = document.createElement('a-animation')
    const assetsEl = document.createElement('a-assets')

    aframeConstants.setSceneEl(sceneEl)
    aframeConstants.setSkyEl(skyEl)
    aframeConstants.setCameraEl(cameraEl)
    aframeConstants.setCameraContainerEl(cameraContainerEl)
    aframeConstants.setCameraAnimationEl(cameraAnimationEl)
    aframeConstants.setAssetsEl(assetsEl)
    aframeConstants.setCameraStartRotation(cameraStartRotationEl || {})

    // init
    aframeHelpers.initAssetsEl()
    aframeHelpers.initSkyEl()
    aframeHelpers.initCameraEl()
    aframeHelpers.initCameraAnimationEl(config)

    // settings
    aframeConstants.getSceneEl().setAttribute('embedded', '')
    aframeConstants.getSceneEl().setAttribute('debug', '')

    // config
    if (config.disableVR) {
      aframeConstants.getSceneEl().setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    aframeConstants.getSceneEl().addEventListener('click', (e) => {
      this.stopAutoRotate()
    })
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const currentPanorama = this.getCurrentPanorama()
    loadImage(currentPanorama.downloadLink, () => {
      aframeConstants.getSkyEl().setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
      if (isFunction(callback)) {
        callback()
      }
    })
  }

  toggleVRMode (shouldShowVRMode) {
    shouldShowVRMode
      ? aframeConstants.getSceneEl().enterVR()
      : aframeConstants.getSceneEl().exitVR()
  }

  startAutoRotate () {
    const cameraRotationY = aframeConstants.getCameraRotation().y
    const cameraAnimationEl = aframeConstants.getCameraAnimationEl()
    aframeConstants.getCameraAnimationEl().emit('play')
    setAttributes(cameraAnimationEl, {
      from: `0 ${cameraRotationY} 0`,
      to: `0 360 0`
    })
  }

  stopAutoRotate () {
    const cameraContainerEL = aframeConstants.getCameraContainerEl()
    const cameraRotation = cameraContainerEL.getAttribute('rotation')
    aframeConstants.setCameraRotation(cameraRotation)
    aframeConstants.getCameraAnimationEl().emit('pause')
  }

  destroy () {
    const sceneEl = aframeConstants.getSceneEl()
    sceneEl.parentNode.removeChild(sceneEl)
    aframeConstants.setSceneEl({})
    aframeConstants.setSkyEl({})
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
