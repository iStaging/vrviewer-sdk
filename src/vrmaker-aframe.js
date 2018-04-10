class Aframe {
  constructor () {
    this.checkAframe()
    this.generateAframe = function () {
      const aSceneEl = document.createElement('a-scene')
      const aSkyEl = document.createElement('a-sky')
      const aCameraContainerEl = document.createElement('a-entity')
      const aCameraEl = document.createElement('a-camera')
      const el = this.getEl()
      const { src } = this.getCurrentPanorama()
      const cameraRotationOffset = 100
      let cameraStartRotation

      this.getCurrentPanorama().cameraStartRotation
        ? cameraStartRotation = this.getCurrentPanorama().cameraStartRotation
        : cameraStartRotation = {}

      // a-sky
      aSkyEl.setAttribute('src', src)
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

      return this
    }
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vrmaker.')
    }
  }
}

export default Aframe
