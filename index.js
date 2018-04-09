import './src'
// import 'vrmaker'
// import './src/vrmaker-krpano'

/* eslint-disable */
VRMaker.init('el', {
  panoramas: [{
    id: 'YRSqB',
    src: 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
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

// console.log(VRMaker)
// console.log(VRMaker.getCurrentPanorama())
// console.log(VRMaker.generateKrpano())
window.onload = function () {
  VRMaker.generateAframe()
}
