import './src'
// import 'vrmaker'
// import './src/vrmaker-krpano'

/* eslint-disable */
VRMaker.init('el', {
  panoramas: [{ id: 'bb' }]
})

// console.log(VRMaker)
// console.log(VRMaker.getCurrentPanorama())
// console.log(VRMaker.generateKrpano())
window.onload = function () {
  console.log('11:', VRMaker.generateAframe())
}
