import '@/'

// dev test data
var panoramas = [{
  'panoramaName': 'name01',
  'downloadLink': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/0b76c6f2-7f66-4454-9fb3-3e05bf98f7e7/0013be6e-c70c-42f1-8ccd-7f51b7b82204/panoramas/4f26b89d-4383-4723-be9d-d12fd2c2cef0.jpg',
  'panoramaId': '0f62e098-b8aa-4a4a-a635-f2243788471f',
  'panoramaIndex': -25,
  'cubemapReady': true,
  'cubemapLinks': [
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
  ]
}, {
  'panoramaName': 'name02',
  'downloadLink': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/b6a1ba85-cb52-4abb-be50-419f9c329d6b/8ffa7a7f-4d90-41c0-b9c3-7b995d213109/panoramas/00b27bcb-0143-435d-8180-37d1766f5671.jpg',
  'panoramaId': '782949e8-c37a-4171-a004-54c76937135c',
  'panoramaIndex': -24,
  'cubemapReady': true,
  'cubemapLinks': [
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
  ]
}]

// new VRMaker aframe viewer
var aframeViewer = new VRMaker.AframeViewer()

// init aframe viewer with data
function initAframe () {
  aframeViewer.init({
    el: document.getElementById('vrmaker-aframe'),
    panoramas
  })
  // generate aframe viewer
  const config = {
    // disableVR: true
    autoRotate: {
      enabled: true,
      duration: 200000
    }
  }
  aframeViewer.generateAframe(config)
}

// change aframe panorama to viewer
function changePanorama () {
  aframeViewer.changePanorama('782949e8-c37a-4171-a004-54c76937135c', () => {
    console.log('Loaded.')
  })
}

initAframe()

// change panorama function
setTimeout(changePanorama, 3000)
setTimeout(aframeViewer.stopAutoRotate, 7000)
setTimeout(aframeViewer.startAutoRotate, 8000)

// remove aframe viewer
document.getElementById("remove-aframe-viewer").addEventListener("click", function() {
  console.log('remove aframe viewer')
  aframeViewer.destroy()
})

// enter aframe vr mode by custom button
document.getElementById("enter-aframe-vrmode").addEventListener("click", function() {
  console.log('toggle aframe vr mode')
  aframeViewer.toggleVRMode(true)
});
