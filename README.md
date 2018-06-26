# VR Viewer

VR Viewer SDK helps you creating a panorama easily on website.

## Documents

[https://istaging.gitbook.io/vr-maker-sdk](https://istaging.gitbook.io/vr-maker-sdk)

## How to use

```javascript
npm install vrviewer-sdk (or use yarn)
```

Run sample nodejs server, change the panoCollection id you have and start it, that's all.

### ES6:

```bash
// Before use vreditor-sdk, you need to have threejs and krpano first.
// go to https://threejs.org/ and https://krpano.com/ to purchase krpano license.

// import vrviewer-sdk js, css.
import 'vrviewer-sdk'
import 'vrviewer-sdk/dist/vrviewer-sdk.css'

VRViewer.init({
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
...
// Everything is ready, enjoy.
```

### Use static file by cdn:

```html
<head>
  <link href="https://www.istaging.com/sdk/dist/vrviewer-sdk.css" rel="stylesheet"></link>
</head>

<body>
  <div id="vrviewer-sdk"></div>
  <!-- make sure you have threejs and krpano first. -->
  <script src="https://www.istaging.com/sdk/three.min.js"></script>
  <script src="https://www.istaging.com/sdk/vrviewer-sdk.js"></script>

</body>
```

```bash
<script>
VRViewer.init({
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
</script>
```

### VR Viewer SDK is easily bind with VR Editor SDK
iStaging VR Viewer is a WebVR solution for developers, you can fetch data from VR Editor, and import data into VR Viewer.
Check out node sample server in the exmaples folder to explore what we do it.

``` bash
npm start
```


# Thanks
