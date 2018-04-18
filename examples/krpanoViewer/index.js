// local demo data
// var panoramas = [
//   {
//     panoramaName: 'name01',
//     downloadLink: 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-desktop',
//     panoramaId: 'id01',
//     panoramaIndex: 0,
//     cubemapReady: true,
//     cubemapLinks: ['cubemap-url1.jpg,', 'cubemap-url2.jpg', 'cubemap-url3.jpg'],
//   }
// ]
/* eslint-disable */

function getPanoCollection () {
  return fetch('/api/panoCollection', {
    method: 'get'
  })
  .then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }
  })
  .catch(function (error) {
    return error.response.json();
  })
}
/* eslint-disable */

const Krpano =  new VRMaker.Krpano()
Krpano.init({
  el: document.querySelector('#vrmaker-krpano'),
  panoramas
})

Krpano.generateKrpano({
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
})

window.setTimeout(() => {
  console.log('change panorama')
  Krpano.selectPanorama('782949e8-c37a-4171-a004-54c76937135c')
}, 3500)
