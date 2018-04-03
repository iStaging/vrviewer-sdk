import './src'
// import 'vrmaker'

VRMaker.init('el', {
  panoramas: [{ id: 'bb' }]
})

console.log(VRMaker.getPanorama())
