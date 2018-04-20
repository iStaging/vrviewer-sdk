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
    aframeConstants.setSceneEl(document.createElement('a-scene'))
    aframeConstants.setSkyEl(document.createElement('a-sky'))
    aframeConstants.setCameraEl(document.createElement('a-camera'))
    aframeConstants.setCameraContainerEl(document.createElement('a-entity'))
    aframeConstants.setCameraAnimationEl(document.createElement('a-animation'))
    aframeConstants.setAssetsEl(document.createElement('a-assets'))
    aframeConstants.setCameraStartRotation(this.getCurrentPanorama().panoramaRotation || {})

    // init
    aframeHelpers.initAssetsEl()
    aframeHelpers.initSkyEl()
    aframeHelpers.initCameraEl()
    aframeHelpers.initCameraAnimationEl()

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
