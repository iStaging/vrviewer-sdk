/* eslint-disable */

// new VRViewer krpano viewer
var krpanoViewer =  new VRViewer.KrpanoViewer()

// get panoCollection from server
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

// init krpano viewer with data
function initKrpano (panoramas) {
  krpanoViewer.init({
    el: document.querySelector('#vrviewer-krpano'),
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

getPanoCollection().then(initKrpano)

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

/* eslint-enable */
