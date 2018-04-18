import '@/'

// testus: aaa9a22a-7da1-4d97-9ef2-1ecc653e512c
const panoramas = [{
  'panoramaName': 'name01',
  'downloadLink': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-desktop',
  'panoramaId': '0f62e098-b8aa-4a4a-a635-f2243788471f',
  'panoramaIndex': -25,
  'cubemapReady': true,
  'cubemapLinks': [
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
  ]
}, {
  'panoramaName': 'name02',
  'downloadLink': 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
  'panoramaId': '782949e8-c37a-4171-a004-54c76937135c',
  'panoramaIndex': -24,
  'cubemapReady': true,
  'cubemapLinks': [
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
    'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
  ]
}]

/* eslint-disable */
function initAframe () {
  console.log(VRMaker)
  const aframeViewer = new VRMaker.AframeViewer()

  aframeViewer.init({
    el: document.getElementById('vrmaker'),
    panoramas
  })
  aframeViewer.generateAframe()

  setTimeout(() => {
    aframeViewer.changePanorama('782949e8-c37a-4171-a004-54c76937135c', () => {
      console.log('Loaded.')
      aframeViewer.toggleVRMode(false)
    })
  }, 1000)
}

function initKrpano () {
  window.Krpano =  new VRMaker.Krpano()
  Krpano.init({
    el: document.querySelector('#vrmaker'),
    panoramas
  })

  const config = {
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

  Krpano.generateKrpano(config)
  // console.log(Krpano.getPanoramas())
  // Krpano.updatePanorama('782949e8-c37a-4171-a004-54c76937135c', { foo: 'bar' })

  // window.setTimeout(() => {
  //   console.log('enter vr mode')
  //   Krpano.toggleVRMode(true)
  // }, 3000)

  // window.setTimeout(() => {
  //   console.log('exit vr mode')
  //   Krpano.toggleVRMode(false)
  // }, 8000)

  window.setTimeout(() => {
    console.log('change panorama')
    Krpano.changePanorama('782949e8-c37a-4171-a004-54c76937135c')
  }, 3500)

  window.setTimeout(() => {
    console.log('remove krpano')
    Krpano.destroy()
  }, 7000)

  window.setTimeout(() => {
    console.log('generate pano again')
    Krpano.generateKrpano()
  }, 9500)
}

initAframe()
// initKrpano()
