class Aframe {
  constructor () {
    this.checkAframe()
    this.generateAframe = function () {
      // create a-scene
      // document.createElement
      // put panoramas inside a-sky
      console.log('generateAframe this.getCurrentPanorama()', this.getCurrentPanorama())
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
