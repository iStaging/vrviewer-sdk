class AframeViewer {
  constructor () {
    console.log('222', this.getEl())
    this.el = this.getEl()
    this.currentPanorama = this.getCurrentPanorama()
    this.checkAframe()
    this.setPanoramaSrc = function (src, callback) {
      const aSkyEl = document.getElementsByTagName('a-sky')[0]
      const img = new Image()

      aSkyEl.setAttribute('src', src)
      img.onload = () => { if (callback) callback() }
      img.src = src
    }
  }

  get generateAframeGet () {
    // return this.generateAframe()
  }

  generateAframe () {
    const aSceneEl = document.createElement('a-scene')
    const aSkyEl = document.createElement('a-sky')
    const aCameraContainerEl = document.createElement('a-entity')
    const aCameraEl = document.createElement('a-camera')
    // const el = this.getEl()
    // console.log('000', this.el)
    // console.log('000', this.currentPanorama)
    const { src } = this.currentPanorama
    const cameraRotationOffset = 90
    let cameraStartRotation

    this.currentPanorama.cameraStartRotation
      ? cameraStartRotation = this.currentPanorama.cameraStartRotation
      : cameraStartRotation = {}

    // a-sky
    aSkyEl.setAttribute('src', src)
    aSceneEl.appendChild(aSkyEl)
    this.el.appendChild(aSceneEl)

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

    return this
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default AframeViewer
