import VRMaker from './src'

window.VRMaker = new VRMaker('#el', {
  panoramas: [{ a: 'bvb' }]
})

console.log(window.VRMaker)

