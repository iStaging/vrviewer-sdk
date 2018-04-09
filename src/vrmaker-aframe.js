class Aframe {
  constructor () {
    this.generateAframe = function () {
      // create a-scene
      // document.createElement
      // put panoramas inside a-sky
      // console.log('generateAframe this.getCurrentPanorama()', this.getCurrentPanorama())
      var aSceneEl = document.createElement('a-scene')
      aSceneEl.style.display = 'block'
      aSceneEl.style.position = 'relative'
      aSceneEl.style.width = '100%'
      aSceneEl.style.height = '100%'
      var aSkyEl = document.createElement('a-sky')
      aSkyEl.setAttribute('src', 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg')
      // asceneEl.style.width = '640px'
      // asceneEl.style.height = '480px'
      aSceneEl.appendChild(aSkyEl)
      document.body.appendChild(aSceneEl)
      console.log(document.body)
      return this
    }
  }
}

export default Aframe
