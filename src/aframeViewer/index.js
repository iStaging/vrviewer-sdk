import {
  enterFullScreen,
  exitFullScreen, isFunction, loadImage
} from '@/common/utils'
import CommonViewer from '@/common/common-viewer.js'
import aframeConstants from '@/aframeViewer/aframe-constants'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
  }

  generateAframe () {
    const aSceneEl = document.createElement('a-scene')
    aframeConstants.setSceneEl(aSceneEl)
    const aSkyEl = document.createElement('a-sky')
    aframeConstants.setSkyEl(aSkyEl)
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    aframeConstants.setCameraEl(aCameraEl)
    const el = this.getEl()
    const { downloadLink, panoramaRotation } = this.getCurrentPanorama()
    const cameraRotationOffset = 90
    let cameraStartRotation = panoramaRotation || {}

    // a-sky
    aSkyEl.setAttribute('src', downloadLink)
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

    // a-scene
    aCameraContainerEl.appendChild(aCameraEl)
    aSceneEl.appendChild(aCameraContainerEl)
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const currentPanorama = this.getCurrentPanorama()
    const aSkyEl = aframeConstants.getSkyEl()
    loadImage(currentPanorama.downloadLink, () => {
      aSkyEl.setAttribute('src', currentPanorama.downloadLink)
      if (isFunction(callback)) {
        callback()
      }
    })
  }

  toggleVRMode (boolean) {
    const aSceneEl = aframeConstants.getSceneEl()
    if (boolean) {
      if (isFunction(aSceneEl.enterVR)) {
        aSceneEl.enterVR()
      } else {
        throw new Error('Aframe can\'t execute enterVR')
      }
      enterFullScreen()
    } else {
      if (isFunction(aSceneEl.exitVR)) {
        aSceneEl.exitVR()
      } else {
        throw new Error('Aframe can\'t execute exitVR')
      }
      exitFullScreen()
    }
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
