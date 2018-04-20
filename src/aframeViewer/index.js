import {
  isFunction,
  loadImage
} from '@/common/utils'
import CommonViewer from '@/common/common-viewer.js'

let _el
let _sceneEl
let _assetsEl
let _skyEl
let _cameraContainerEl
let _cameraEl
let _cameraAnimationEl
let _cameraStartRotation

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
    this.cameraRotation = {}
    this.timeout = 1000
  }

  generateAframe (config = { disableVR: false, autoRotate: {} }) {
    _sceneEl = document.createElement('a-scene')
    _skyEl = document.createElement('a-sky')
    _cameraContainerEl = document.createElement('a-entity')
    _cameraContainerEl.id = 'camera-container'
    _cameraEl = document.createElement('a-camera')
    _cameraAnimationEl = document.createElement('a-animation')
    _assetsEl = document.createElement('a-assets')
    _el = this.getEl()
    _cameraStartRotation = this.getCurrentPanorama().panoramaRotation || {}

    // elements
    initAssetsEl(this)
    initSkyEl(this)
    initCameraEl(this)
    initCameraAnimationEl(this)

    // settings
    _sceneEl.setAttribute('embedded', '')
    _sceneEl.setAttribute('debug', '')

    // config
    if (config.disableVR) {
      _sceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    _sceneEl.addEventListener('click', () => {
      this.stopAutoRotate()
    })

    // functions
    const initAssetsEl = (panoramas) => {
      _assetsEl.setAttribute('timeout', '1000')
      _sceneEl.append(_assetsEl)
      panoramas.forEach(panorama => {
        const imgEl = document.createElement('img')
        imgEl.src = panorama.downloadLink
        imgEl.id = panorama.panoramaId
        _assetsEl.appendChild(imgEl)
      })
    }

    const initSkyEl = (currentPanorama) => {
      _skyEl.setAttribute('src', `#${currentPanorama.panoramaId}`)
      _sceneEl.appendChild(_skyEl)
      _el.appendChild(_sceneEl)
    }

    const initCameraEl = () => {
      const cameraX = _cameraStartRotation.x || 0
      // const cameraY = cameraRotationOffset + (_cameraStartRotation.y || 0)
      const cameraY = _cameraStartRotation.y || 0
      const cameraZ = _cameraStartRotation.z || 0

      _cameraContainerEl.setAttribute(
        'rotation',
        `${cameraX} ${cameraY} ${cameraZ}`
      )
    }

    const initCameraAnimationEl = () => {
      if (config.autoRotate.enabled) {
        _cameraAnimationEl.setAttribute('attribute', 'rotation')
        _cameraAnimationEl.setAttribute('fill', 'forwards')
        _cameraAnimationEl.setAttribute('easing', 'linear')
        _cameraAnimationEl.setAttribute('dur', `${config.autoRotate.duration}`)
        _cameraAnimationEl.setAttribute('from', `0 0 0`)
        _cameraAnimationEl.setAttribute('to', `0 360 0`)
        _cameraAnimationEl.setAttribute('repeat', 'indefinite')
        _cameraAnimationEl.setAttribute('startEvents', 'rotation-start')
        _cameraAnimationEl.setAttribute('pauseEvents', 'rotation-pause')

        _cameraContainerEl.appendChild(_cameraEl)
        _cameraContainerEl.appendChild(_cameraAnimationEl)
        _sceneEl.appendChild(_cameraContainerEl)
      }
    }

    _sceneEl = document.createElement('a-scene')
    _skyEl = document.createElement('a-sky')
    _cameraContainerEl = document.createElement('a-entity')
    _cameraEl = document.createElement('a-camera')
    _cameraAnimationEl = document.createElement('a-animation')
    _assetsEl = document.createElement('a-assets')
    _el = this.getEl()
    _cameraStartRotation = this.getCurrentPanorama().panoramaRotation || {}

    // elements
    initAssetsEl(this.getPanoramas())
    initSkyEl(this.getCurrentPanorama())
    initCameraEl()
    initCameraAnimationEl()

    // settings
    _sceneEl.setAttribute('embedded', '')
    _sceneEl.setAttribute('debug', '')

    // config
    if (config.disableVR) {
      _sceneEl.setAttribute('vr-mode-ui', 'enabled: false')
    }

    // events
    _sceneEl.addEventListener('click', (e) => {
      this.stopAutoRotate()
    })
  }

  changePanorama (panoramaId, callback) {
    this.selectPanorama(panoramaId)
    const currentPanorama = this.getCurrentPanorama()
    loadImage(currentPanorama.downloadLink, () => {
      _skyEl.setAttribute('src', `#${this.getCurrentPanorama().panoramaId}`)
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

  startAutoRotate () {
    const { y } = this.cameraRotation
    _cameraAnimationEl.emit('play')
    _cameraAnimationEl.setAttribute('from', `0 ${y} 0`)
    _cameraAnimationEl.setAttribute('to', `0 360 0`)
  }

  stopAutoRotate () {
    const cameraRotation = _cameraContainerEl.getAttribute('rotation')
    console.log('STOPPED')
    this.cameraRotation = cameraRotation
    _cameraAnimationEl.emit('pause')
  }

  destroy () {
    _sceneEl.parentNode.removeChild(_sceneEl)
    _sceneEl = {}
    _skyEl = {}
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
