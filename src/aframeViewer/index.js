import {
  isFunction,
  loadImage
} from '@/common/utils'
import CommonViewer from '@/common/common-viewer.js'
import aframeConstants from '@/aframeViewer/aframe-constants'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
    this.timeout = '1000'
  }

  generateAframe (config) {
    const aSceneEl = document.createElement('a-scene')
    const aSkyEl = document.createElement('a-sky')
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    const aAnimationEl = document.createElement('a-animation')
    const aAssetsEl = document.createElement('a-assets')
    const el = this.getEl()
    const { panoramaRotation } = this.getCurrentPanorama()
    const panoramas = this.getPanoramas()
    const cameraRotationOffset = 90
    const cameraStartRotation = panoramaRotation || {}

    aframeConstants.setSceneEl(aSceneEl)
    aframeConstants.setSkyEl(aSkyEl)
    aframeConstants.setCameraEl(aCameraEl)

    // a-assets
    aAssetsEl.setAttribute('timeout', this.timeout)
    aSceneEl.append(aAssetsEl)

    panoramas.forEach(panorama => {
      const imgEl = document.createElement('img')
      imgEl.src = panorama.downloadLink
      imgEl.id = panorama.panoramaId
      aAssetsEl.appendChild(imgEl)
    })

    // a-sky
    aSkyEl.setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
    aSceneEl.setAttribute('embedded', '')
    aSceneEl.appendChild(aSkyEl)
    el.appendChild(aSceneEl)

    // a-camera
    const cameraX = cameraStartRotation.x || 0
    const cameraY = cameraRotationOffset + (cameraStartRotation.y || 0)
    const cameraZ = cameraStartRotation.z || 0
    aCameraContainerEl.setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )

    // a-animation
    aAnimationEl.setAttribute('attribute', 'rotation')
    aAnimationEl.setAttribute('fill', 'forwards')
    aAnimationEl.setAttribute('easing', 'linear')
    aAnimationEl.setAttribute('dur', '200000')
    aAnimationEl.setAttribute('from', `0 ${0 + cameraRotationOffset} 0`)
    aAnimationEl.setAttribute('to', `0 ${360 + cameraRotationOffset} 0`)
    // aAnimation.setAttribute('from', `0 0 0`)
    // aAnimation.setAttribute('to', `0 360 0`)
    aAnimationEl.setAttribute('repeat', 'indefinite')
    aAnimationEl.setAttribute('startEvents', 'rotation-start')
    aAnimationEl.setAttribute('pauseEvents', 'rotation-pause')

    // a-scene
    aCameraContainerEl.appendChild(aCameraEl)
    aCameraContainerEl.appendChild(aAnimationEl)
    aSceneEl.appendChild(aCameraContainerEl)

    // config
    if (config && config.disableVR) {
      aSceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    aSceneEl.addEventListener('click', (e) => {
      aAnimationEl.emit('pause')
    })
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const aSkyEl = aframeConstants.getSkyEl()
    const currentPanorama = this.getCurrentPanorama()
    loadImage(currentPanorama.downloadLink, () => {
      aSkyEl.setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
      if (isFunction(callback)) {
        callback()
      }
    })
  }

  toggleVRMode (shouldShowVRMode) {
    const aSceneEl = aframeConstants.getSceneEl()
    shouldShowVRMode
      ? aSceneEl.enterVR()
      : aSceneEl.exitVR()
  }

  destroy () {
    const aSceneEl = aframeConstants.getSceneEl()
    aSceneEl.parentNode.removeChild(aSceneEl)
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
