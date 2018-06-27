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

## If you want to fork VR Viewer, please go ahead!

VR Viewer is a RWD website, it's split up layout by 768px.<br><br>

### Structure of VR Viewer SDK
Src is our source code, you can modify anything you like.<br>
src/api put some useful js<br>
src/common is put some vue files, like components but it's specific for the project<br>
src/components is vue components, it can use not only vr viewer sdk project<br>
src/images put some images<br>
src/messages is for vue i18n<br>
src/mixins is for vue mixins<br>
src/pages is for vue router, but it's only index page with multiple split vue files<br>
src/store is vuex structure<br>
src/stylesheets is global stylus css<br>

### api

##### src/api/constants.js
Some default value are put over here<br><br>

##### src/api/helpers.js
Some functions for this project<br><br>

##### src/api/prototype.js
Just prevent IE break in some functions<br><br>

##### src/api/resources.js
Online resources hosted in iStaging website<br><br>

##### src/api/utils.js
Some functions for global use<br><br>

### common

##### src/common/Floorplan
Floorplan component here<br><br>

##### src/common/Instructions
For blocking portrait iOS in VR mode<br><br>

##### src/common/Krpano
The core of VR<br><br>

##### src/common/PanoCollectionInfo
Collection avatar and name<br><br>

##### src/common/ViewerLayer
It will show up in the center of the VR Viewer SDK, it is used by marker info, share, information<br><br>

##### src/common/ViewerList
Panoramas list<br><br>

##### src/common/ViewerMarkersHover
Hovered markers use this component<br><br>

### components

##### src/components/Icon/index.vue
All icon use this component, but you need to add image by yourself<br><br>

##### src/components/Popup/index.vue
This is used for clicked marker popup<br><br>

##### src/components/SvgIcon/index.vue
This is used for icons, but can change its color<br><br>

##### src/components/IProgress.vue
While loading each panorama, it will appear<br><br>

##### src/components/IRepeat.vue
Just a repeater<br><br>

##### src/components/QrCode.vue
QR code<br><br>

### mixins
Component IRepeat use filterBy<br><br>

### store
Get/set some state in the vuex framework<br><br>

### Pages

##### src/pages/IHeader.vue
Collection info is placed here.<br><br>

##### src/pages/IFooter.vue
Powered by iStaging<br><br>

##### src/pages/IAside.vue
Including INav component and close full screen or VR mode button<br><br>

##### src/pages/IMain.vue
Most of the important components are put here. There has the core of VR display area - krpano.
And yet, there has hovered marker info, clicked marker info, share layer, panoramas list,
floor plan, instructions (for iOS) and popup.<br><br>

##### src/pages/INav.vue
You can depends on what button you want to add, in small layout menu and in large
layout menu. Find it out in the file, there's three menu list in
computed object: navMobileOuterList, navMobileInnerList and navPcList.
Apparently the naming of these menu list is 2 for mobile view, 1 for desktop view,
just add some code like this before the value return:<br><br>

After you finished modifying, you can run ```npm run build```, then your result will built in dist files!
Examples folder is for building your site, but maybe you have no idea how to import the VR viewer SDK.
Now you have a great build example in examples folder.<br><br>

## Enjoy it!<br>
