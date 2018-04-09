import './src'
// import 'vrmaker'
// import './src/vrmaker-krpano'

VRMaker.init('el', {
  panoramas: [{ id: 'bb' }]
})

window.onload = function () {
  VRMaker.generateKrpano('#vrmaker-krpano', {
    html5: 'webgl+only',
    webglsettings: { depth: true },
    passQueryParameters: true,
    lazyLoad: true,
    mwheel: true,
    focus: false
  })
}

// console.log(VRMaker)
// console.log(VRMaker.getCurrentPanorama())
// console.log(VRMaker.generateKrpano())
// console.log(VRMaker.generateAframe())
