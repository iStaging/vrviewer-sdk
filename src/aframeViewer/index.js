import {
  isFunction,
  loadImage
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
    const scene = document.createElement('a-scene')
    const sky = document.createElement('a-sky')
    const camera = document.createElement('a-camera')
    const cameraContainer = document.createElement('a-entity')
    const cameraStartRotation = this.getCurrentPanorama().panoramaRotation || {}
    const cameraAnimation = document.createElement('a-animation')
    const assets = document.createElement('a-assets')

    aframeConstants.setSceneEl(scene)
    aframeConstants.setSkyEl(sky)
    aframeConstants.setCameraEl(camera)
    aframeConstants.setCameraContainerEl(cameraContainer)
    aframeConstants.setCameraAnimationEl(cameraAnimation)
    aframeConstants.setAssetsEl(assets)
    aframeConstants.setCameraStartRotation(cameraStartRotation || {})

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
    const { y } = aframeConstants.getCameraRotation()
    aframeConstants.getCameraAnimationEl().emit('play')
    aframeConstants.getCameraAnimationEl().setAttribute('from', `0 ${y} 0`)
    aframeConstants.getCameraAnimationEl().setAttribute('to', `0 360 0`)
  }

  stopAutoRotate () {
    const cameraRotation = aframeConstants.getCameraContainerEl().getAttribute('rotation')
    aframeConstants.setCameraRotation(cameraRotation)
    aframeConstants.getCameraAnimationEl().emit('pause')
  }

  destroy () {
    aframeConstants.getSceneEl().parentNode.removeChild(aframeConstants.getSceneEl())
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
