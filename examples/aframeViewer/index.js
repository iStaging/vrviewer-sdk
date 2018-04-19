/* eslint-disable */

// new VRMaker aframe viewer
var aframeViewer = new VRMaker.AframeViewer()

// get panoCollection from server
function getPanoCollection () {
  return fetch('/api/panoCollection', {
    method: 'get'
  }).then(function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }
  }).catch(function (error) {
    return error.response.json()
  })
}

// init aframe viewer with data
function initAframe (panoramas) {
  aframeViewer.init({
    el: document.getElementById('vrmaker-aframe'),
    panoramas
  })
  // generate aframe viewer
  aframeViewer.generateAframe()
}

// change aframe panorama to viewer
function changePanorama () {
  aframeViewer.changePanorama('782949e8-c37a-4171-a004-54c76937135c', () => {
    console.log('loaded')
  })
}

getPanoCollection().then(initAframe)

setTimeout(changePanorama, 3000)

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

/* eslint-enable */
