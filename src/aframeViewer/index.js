import CommonViewer from '@/common/common-viewer.js'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
  }

  generateAframe () {
    const aSceneEl = document.createElement('a-scene')
    const aSkyEl = document.createElement('a-sky')
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    const el = this.getEl()
    const { downloadLink } = this.getCurrentPanorama()
    const cameraRotationOffset = 90
    let cameraStartRotation

    this.getCurrentPanorama().panoramaRotation
      ? cameraStartRotation = this.getCurrentPanorama().panoramaRotation
      : cameraStartRotation = {}

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
    const aSkyEl = document.querySelector('a-sky')
    const img = new Image()

    img.onload = () => {
      aSkyEl.setAttribute('src', currentPanorama.downloadLink)
      if (callback) {
        callback()
      }
    }
    img.src = currentPanorama.downloadLink
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }

  toggleVRMode (boolean) {
    const aSceneEl = document.getElementsByTagName('a-scene')[0]
    if (boolean) {
      aSceneEl.enterVR()
      this.enterFulScreen()
    } else {
      aSceneEl.exitVR()
      this.exitFullScreen()
    }
  }

  enterFullScreen () {
    if (document.requestFullscreen) {
      document.requestFullscreen()
    } else if (document.webkitRequestFullscreen) {
      document.webkitRequestFullscreen()
    } else if (document.mozRequestFullScreen) {
      document.mozRequestFullScreen()
    } else if (document.msRequestFullscreen) {
      document.msRequestFullscreen()
    }
  }

  exitFullScreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  destroy () {
    const aSceneEl = document.getElementsByTagName('a-scene')[0]
    aSceneEl.parentNode.removeChild(aSceneEl)
  }
}

export default AframeViewer
