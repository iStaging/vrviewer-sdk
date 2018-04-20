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

  generateAframe (config = { disableVR: false, autoRotate: {} }) {
    const aSceneEl = document.createElement('a-scene')
    aframeConstants.setSceneEl(aSceneEl)
    const aSkyEl = document.createElement('a-sky')
    aframeConstants.setSkyEl(aSkyEl)
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    const aAnimationEl = document.createElement('a-animation')
    const aAssetsEl = document.createElement('a-assets')
    const el = this.getEl()
    const { panoramaRotation } = this.getCurrentPanorama()
    // const cameraRotationOffset = 90
    aframeConstants.setCameraEl(aCameraEl)
    let cameraStartRotation = panoramaRotation || {}

    // a-assets
    aAssetsEl.setAttribute('timeout', '1000')
    aSceneEl.append(aAssetsEl)
    this.getPanoramas().forEach(panorama => {
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
    // const cameraY = cameraRotationOffset + (cameraStartRotation.y || 0)
    const cameraY = cameraStartRotation.y || 0
    const cameraZ = cameraStartRotation.z || 0

    aCameraContainerEl.setAttribute(
      'rotation',
      `${cameraX} ${cameraY} ${cameraZ}`
    )

    // a-animation
    if (config.autoRotate.enabled) {
      aAnimationEl.setAttribute('attribute', 'rotation')
      aAnimationEl.setAttribute('fill', 'forwards')
      aAnimationEl.setAttribute('easing', 'linear')
      aAnimationEl.setAttribute('dur', `${config.autoRotate.duration}`)
      // aAnimationEl.setAttribute('from', `0 ${0 + cameraRotationOffset} 0`)
      // aAnimationEl.setAttribute('to', `0 ${360 + cameraRotationOffset} 0`)
      aAnimationEl.setAttribute('from', `0 0 0`)
      aAnimationEl.setAttribute('to', `0 360 0`)
      aAnimationEl.setAttribute('repeat', 'indefinite')
      aAnimationEl.setAttribute('startEvents', 'rotation-start')
      aAnimationEl.setAttribute('pauseEvents', 'rotation-pause')

      // a-scene
      aCameraContainerEl.appendChild(aCameraEl)
      aCameraContainerEl.appendChild(aAnimationEl)
      aSceneEl.appendChild(aCameraContainerEl)
    }

    // config
    if (config.disableVR) {
      aSceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    aSceneEl.addEventListener('click', function (e) {
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

  startAutoRotate () {
    const aAnimationEl = document.getElementsByTagName('a-animation')[0]
    console.log('STASTDE')
    aAnimationEl.emit('play')
    console.log(aAnimationEl)
  }

  stopAutoRotate () {
    const aAnimationEl = document.getElementsByTagName('a-animation')[0]
    console.log('STOPPED')
    aAnimationEl.emit('pause')
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
