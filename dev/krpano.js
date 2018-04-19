import '@/'

// dev test data
var panoramas = [{
  'panoramaName': 'name01',
  'downloadLink': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/597efad3e330d900662d630d/images/fromImageIO/A2/T_D_6_K_i_e_l_g_A2.jpeg',
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
  'cubemapReady': false,
  'cubemapLinks': [
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
  ]
}]

// new VRMaker krpano viewer
var krpanoViewer =  new VRMaker.KrpanoViewer()

// init krpano viewer with data
function initKrpano () {
  krpanoViewer.init({
    el: document.querySelector('#vrmaker-krpano'),
    panoramas
  })

  // krpano viewer config
  var config = {
    autoRotateSettings: {
      active: true,
      revert: false,
      rotateDuration: 200000,
      restartTime: 20000
    },
    gyroSettings: {
      active: false
    },
    basicSettings: {
      mwheel: true,
      focus: false
    },
    tripodSettings: {
      image: 'http://i.imgur.com/xNNfJiP.jpg',
      size: 60 // 0 ~ 100
    },
    loadingSettings: {
      onLoadingPanoramaStart () {
        console.log('onLoadingPanoramaStart')
      },
      onLoadingPanoramaFinish () {
        console.log('onLoadingPanoramaFinish')
      },
      onLoadingPanoramaProgress (event) {
        console.log('onLoadingPanoramaProgress', event)
      },
      onLoadingPanoramaError (error) {
        console.log('onLoadingPanoramaError', error)
      }
    },
    initViewSettings: {
      active: true
    }
  }
  // generate krpano viewer
  krpanoViewer.generateKrpano(config)
}

// change krpano panorama to viewer
function changePanorama () {
  krpanoViewer.changePanorama('782949e8-c37a-4171-a004-54c76937135c', () => {
    console.log('loaded')
  })
}

initKrpano()

setTimeout(changePanorama, 3000)

// remove krpano viewer
document.getElementById("remove-krpano-viewer").addEventListener("click", function() {
  console.log('remove krpano viewer')
  krpanoViewer.destroy()
})

// enter krpano vr mode by custom button
document.getElementById("enter-krpano-vrmode").addEventListener("click", function() {
  console.log('toggle krpano vr mode')
  krpanoViewer.toggleVRMode(true)
});
