# VR Viewer

VR Viewer SDK helps you creating a panorama easily on website.

## SDK documents
[https://istaging.gitbook.io/vr-maker-sdk](https://istaging.gitbook.io/vr-maker-sdk)

## How to use

### ES6:

```javascript
npm install vrviewer
import 'vrviewer'

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
```

### Use cdn:

```html
// include script
<script src="https://www.istaging.com/sdk/vrviewer.js"></script>

<div id="vrviewer-sdk"></div>
<script>
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
</script>
```

### VR Viewer SDK is easily bind with VR Editor SDK
iStaging VR Viewer is a WebVR solution for developers, you can fetch data from VR Editor, and import data into VR Viewer
check out node sample server to explore what we do it
Check out the examples folder.

``` bash
npm start
```

## If you want just use VR Viewer without VR Editor
Following the data structure, you can just use your own data without VR Editor to create 360 viewer.
Check out the src folder.

``` bash
npm run dev
```

# Thanks
