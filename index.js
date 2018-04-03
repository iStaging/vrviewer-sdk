import './src'
// import './src/vrmaker-krpano'

VRMaker.init('el', {
  panoramas: [{ id: 'bb' }]
})

console.log(VRMaker)
console.log(VRMaker.getCurrentPanorama())
console.log(VRMaker.generateKrpano())
console.log(VRMaker.generateAframe())
