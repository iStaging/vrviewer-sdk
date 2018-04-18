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

console.log(VRMaker)

// get panoCollection from server
getPanoCollection()
  .then(function (panoramas) {
    // init vrmaker aframe viewer
    console.log('panoramas: ', panoramas)
    var aframeViewer =  new VRMaker.AframeViewer()
    aframeViewer.init({
      el: document.getElementById('vrmaker-aframe'),
      panoramas
    })
    aframeViewer.generateAframe()

    // change panorama
    setTimeout(() => {
      aframeViewer.changePanorama('782949e8-c37a-4171-a004-54c76937135c', () => {
        console.log('loaded')
      })
    }, 3000)
  })
