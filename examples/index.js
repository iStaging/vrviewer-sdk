// Make sure you have already using vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.

var fetchPanoCollectionPromise = new Promise((resolve, reject) => {
  const url = 'http://evs.c6bfd9b3f17f94cb18b5f72740b1bc300.cn-hangzhou.alicontainer.com'
  const collectionId = 'pc_63739fd9-3290-4230-9462-d4973e072cbc'
  window.axios({
    method: 'get',
    url: `${url}/api/v1/openlink/${collectionId}`
  }).then(function (response) {
    if (response.status === 200) {
      var panoCollection = response.data
      resolve(panoCollection)
      console.log('panoCollection', panoCollection)
    }
  }).catch(function (error) {
    reject(error)
  })
})

Promise.all([fetchPanoCollectionPromise]).then((resp) => {
  var panoCollection = resp[0]
  window.VRViewer.init({
    el: '#vrviewer-sdk',
    lang: 'zh-cn',
    panoCollection: panoCollection,
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

document.getElementById('switch-panorama-list').onclick = window.VRViewer.onTogglePanoramasList
