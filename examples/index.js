// axios.get('/api/v1/panorama')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const fakePanoCollection = {
  'createdAt': 1526283327000,
  'description': 'aegbrew',
  'hasPin': false,
  'logoSize': 50,
  'name': 'awerg43',
  'objectId': '7e548395-f720-49c4-95ce-e31217bd5ae2',
  'requireVisitorData': false,
  'showComment': true,
  'showContactInfo': true,
  'showPoweredBy': true,
  'themeColor': 'pink',
  'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-thumbnail',
  'unavailable': false,
  'updatedAt': 1526283355000
}

const fakePanoramas = [{
  'adjustedRawUrl': '',
  'panoramaName': 'others',
  'createdAt': 1526283353000,
  'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/24fb9231-873d-4fbb-85f6-db2bb81b01cb.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-desktop',
  'floorplanRotation': 0,
  'index': 3,
  'is720': false,
  'isTopLogo': false,
  'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-mobile',
  'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p0',
  'panoramaId': '24fb9231-873d-4fbb-85f6-db2bb81b01cb',
  'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
  'position': { 'x': 0, 'y': 0 },
  'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/24fb9231-873d-4fbb-85f6-db2bb81b01cb.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-thumbnail',
  'updatedAt': 1526283355000
}, {
  'adjustedRawUrl': '',
  'panoramaName': 'others',
  'createdAt': 1526283353000,
  'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-desktop',
  'floorplanRotation': 0,
  'index': 1,
  'is720': false,
  'isTopLogo': false,
  'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-mobile',
  'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p2',
  'panoramaId': '47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970',
  'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
  'position': { 'x': 0, 'y': 0 },
  'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-thumbnail',
  'updatedAt': 1526283355000
}, {
  'adjustedRawUrl': '',
  'panoramaName': 'others',
  'createdAt': 1526283353000,
  'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/5cf21b3e-ae20-49e1-9fef-0a4c9cba4564.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-desktop',
  'floorplanRotation': 0,
  'index': 2,
  'is720': false,
  'isTopLogo': false,
  'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-mobile',
  'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p1',
  'panoramaId': '5cf21b3e-ae20-49e1-9fef-0a4c9cba4564',
  'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
  'position': { 'x': 0, 'y': 0 },
  'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/5cf21b3e-ae20-49e1-9fef-0a4c9cba4564.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-thumbnail',
  'updatedAt': 1526283355000
}, {
  'adjustedRawUrl': '',
  'panoramaName': 'others',
  'createdAt': 1526283353000,
  'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/b4530a6b-de01-4dba-9795-ab430556ff98.jpg',
  'cubemapReady': true,
  'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-desktop',
  'floorplanRotation': 0,
  'index': 0,
  'is720': false,
  'isTopLogo': false,
  'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-mobile',
  'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p3',
  'panoramaId': 'b4530a6b-de01-4dba-9795-ab430556ff98',
  'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
  'position': { 'x': 0, 'y': 0 },
  'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/b4530a6b-de01-4dba-9795-ab430556ff98.jpg',
  'stereoUrl': '',
  'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-thumbnail',
  'updatedAt': 1526283355000
}]

window.VRViewer.init({
  el: '#vrviewer-sdk',
  lang: 'zh-cn',
  panoCollection: fakePanoCollection,
  panoramas: fakePanoramas,
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
    },
    hideUISetting: {
      hideCollectionInfo: false,
      hidePanoramaList: false,
      hideFloorplan: false,
      hideFullscreen: false,
      hideLoading: false,
      hideMarkerInfo: false
    },
    shareSetting: {
      shareUrl: 'https://www.istaging.com/'
    }
  }
})

document.getElementById('switch-panorama-list').onclick = window.VRViewer.onTogglePanoramasList
