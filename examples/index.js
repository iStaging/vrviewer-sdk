// Make sure you have already using aframe and vrviewer-sdk js first.

// New and init vrviewer with the element you give and the data(panoramas) which come from vrmaker backend service.
var vrEditor = new VRViewer()

// axios.get('/api/v1/panorama')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

vrEditor.init({
  el: '#vrviewer-sdk',
  lang: 'zh-cn'
})
