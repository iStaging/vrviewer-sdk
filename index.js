// import 'aframe'
import './src'
// import 'vrmaker'
// import './src/vrmaker-krpano'

window.onload = function () {
  /* eslint-disable */
  VRMaker.init({
    el: document.getElementById('vrmaker-aframe'),
    panoramas: [{
      id: 'YRSqB',
      // src: 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
      src: 'img/test.png',
      // cameraStartRotation: {
      //   x: 0,
      //   y: 360,
      //   z: 0
      // },
      index: 0
    }, {
      id: 'Hiazr',
      src: 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
      index: 1
    }]
  })

  VRMaker.generateAframe()
}
