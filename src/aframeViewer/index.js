import CommonViewer from '@/common/common-viewer.js'

class AframeViewer extends CommonViewer {
  constructor () {
    super(...arguments)
    this.checkAframe()
    this.setPanoramaSrc = function (src, callback) {
      const aSkyEl = document.getElementsByTagName('a-sky')[0]
      const img = new Image()

      aSkyEl.setAttribute('src', src)
      img.onload = () => { if (callback) callback() }
      img.src = src
    }
  }

  generateAframe () {
    const aSceneEl = document.createElement('a-scene')
    const aSkyEl = document.createElement('a-sky')
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    const el = this.getEl()
    const { desktopUrl } = this.getCurrentPanorama()
    const cameraRotationOffset = 90
    let cameraStartRotation

    this.getCurrentPanorama().cameraStartRotation
      ? cameraStartRotation = this.getCurrentPanorama().cameraStartRotation
      : cameraStartRotation = {}

    // a-sky
    aSkyEl.setAttribute('src', desktopUrl)
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

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
