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

  generateAframe (config = {
    disableVR: false,
    autoRotate: {
      enabled: true,
      duration: 200000,
      restartTime: 20000
    }
  }) {
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
    setAttributes(sceneEl, { embedded: '', debug: '' })

    // config
    if (config.disableVR) {
      sceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    sceneEl.addEventListener('click', (e) => {
      this.stopAutoRotate(config)
    })
  }

  changePanorama (panoramaId, callback) {
    const skyEl = aframeConstants.getSkyEl()
    const currentPanorama = this.getCurrentPanorama()
    this.selectPanorama(panoramaId)
    loadImage(currentPanorama.downloadLink, () => {
      skyEl.setAttribute('src', `#${currentPanorama.panoramaId}`)
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

  startAutoRotate (config) {
    const cameraRotationY = aframeConstants.getCameraRotation().y
    const cameraAnimationEl = aframeConstants.getCameraAnimationEl()
    if (!config.autoRotate.enabled) return
    aframeConstants.getCameraAnimationEl().emit('play')
    setAttributes(cameraAnimationEl, {
      from: `0 ${cameraRotationY} 0`,
      to: `0 360 0`
    })
  }

  stopAutoRotate (config) {
    const cameraContainerEL = aframeConstants.getCameraContainerEl()
    const cameraRotation = cameraContainerEL.getAttribute('rotation')
    aframeConstants.setCameraRotation(cameraRotation)
    aframeConstants.getCameraAnimationEl().emit('pause')
    setTimeout(() => {
      this.startAutoRotate()
    }, config.autoRotate.restartTime)
  }

  destroy () {
    const sceneEl = aframeConstants.getSceneEl()
    sceneEl.parentNode.removeChild(sceneEl)
    aframeConstants.setSceneEl({})
    aframeConstants.setSkyEl({})
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrviewer.')
    }
  }
}

export default AframeViewer
