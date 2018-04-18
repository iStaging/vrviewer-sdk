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
      aframeViewer.changePanorama('id01', () => {
        console.log('loaded')
      })
    }, 3000)
  })
