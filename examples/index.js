// Make sure you have already using vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.
var vrViewer = new window.VRViewer()

var fetchPanoCollectionPromise = new Promise((resolve, reject) => {
  axios.get('/api/v1/panoCollection')
    .then(function (response) {
      if (response.status === 200) {
        resolve(response.data)
        console.log('panoCollection', panoCollection)
      }
    })
    .catch(function (error) {
      reject(error)
    })
})

var fetchPanoramasPromise = new Promise((resolve, reject) => {
  axios.get('/api/v1/panorama')
    .then(function (response) {
      if (response.status === 200) {
        resolve(response.data)
        console.log('panoramas', panoramas)
      }
    })
    .catch(function (error) {
      reject(error)
    })
})

Promise.all([fetchPanoCollectionPromise, fetchPanoramasPromise]).then((resp) => {
  var panoCollection = resp[0]
  var panoramas = resp[1]
  vrViewer.init({
    el: '#vrviewer-sdk',
    lang: 'zh-cn',
    panoCollection: panoCollection,
    panoramas: panoramas,
    setting: {
      autoRotateSetting: {
        active: true,
        revert: false,
        rotateDuration: 200000,
        restartTime: 20000
      },
      gyroSetting: {
        active: false
      },
      krpanoSetting: {
        mwheel: true,
        focus: false
      },
      tripodSetting: {
        image: 'https://www.istaging.com/sdk/logo-tripod.png',
        size: 60
      }
    }
  })
})

document.getElementById('switch-panorama-list').onclick = vrViewer.onTogglePanoramasList
