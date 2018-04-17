import '@'

// testus: aaa9a22a-7da1-4d97-9ef2-1ecc653e512c
const panoramas = [{
  'adjustedRawUrl': '',
  'category': 'custom',
  'createdAt': 1522637785000,
  'cubemapFilePath': 'd76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-desktop',
  'floorplanRotation': 0,
  'geoLatitude': 25.03884,
  'geoLongitude': 121.46018,
  'index': -25,
  'is720': true,
  'isTopLogo': true,
  'mobileUrl': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-mobile',
  'name': 'Others',
  'objectId': '0f62e098-b8aa-4a4a-a635-f2243788471f',
  'panoramaRotation': {
    'x': 0,
    'y': 0,
    'z': 0
  },
  'position': {
    'x': 0,
    'y': 0
  },
  'rawUrl': 'https://storage.googleapis.com/vrcam-test-images/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-thumbnail',
  'updatedAt': 1522637786000,
  'customCategory': 'Others',
  'markers': [],
  'cubemapPreivewUrl': 'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
  'cubemapUrl': 'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
}, {
  'adjustedRawUrl': '',
  'category': 'custom',
  'createdAt': 1520837198000,
  'cubemapFilePath': 'd76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/782949e8-c37a-4171-a004-54c76937135c.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/YUp4ielD-desktop',
  'floorplanRotation': 0,
  'index': -24,
  'is720': true,
  'isTopLogo': false,
  'mobileUrl': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/YUp4ielD-mobile',
  'name': '',
  'objectId': '782949e8-c37a-4171-a004-54c76937135c',
  'panoramaRotation': {
    'x': 0,
    'y': 0,
    'z': 0
  },
  'position': {
    'x': 0,
    'y': 0
  },
  'rawUrl': 'https://storage.googleapis.com/vrcam-test.appspot.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/782949e8-c37a-4171-a004-54c76937135c.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/YUp4ielD-thumbnail',
  'updatedAt': 1520837199000,
  'customCategory': 'Others',
  'markers': [],
  'cubemapPreivewUrl': 'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
  'cubemapUrl': 'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
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
      console.log('loaded')
    })
  }, 1000)
}

function initKrpano () {
  const Krpano =  new VRMaker.Krpano()
  Krpano.init({
    el: document.querySelector('#vrmaker'),
    panoramas
  })

  const config = {
    autoRotateSettings: {
      active: true,
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

  window.setTimeout(() => {
    console.log('enter vr mode')
    Krpano.toggleVRMode(true)
  }, 3000)

  window.setTimeout(() => {
    console.log('exit vr mode')
    Krpano.toggleVRMode(false)
  }, 8000)

  // window.setTimeout(() => {
  //   console.log('change panorama')
  //   Krpano.changePanorama('782949e8-c37a-4171-a004-54c76937135c')
  // }, 3500)
  //
  // window.setTimeout(() => {
  //   console.log('remove krpano')
  //   Krpano.destroy()
  // }, 7000)
  //
  // window.setTimeout(() => {
  //   console.log('generate pano again')
  //   Krpano.generateKrpano()
  // }, 10500)
}

// initAframe()
initKrpano()
