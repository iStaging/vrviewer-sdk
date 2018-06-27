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

## If you want to fork VR Viewer, go ahead!

VR Viewer is a RWD website, it's split up layout by 768px.


### Structure of VR Viewer SDK
src is our source code, you can modify anything you like.
src/api put some useful js
src/common is put some vue files, like components but it's specific for the project
src/components is vue components, it can use not only vr viewer sdk project
src/images put some images
src/messages is for vue i18n
src/mixins is for vue mixins
src/pages is for vue router, but it's only index page with multiple split vue files
src/store is vuex structure
src/stylesheets is global stylus css

#### api

##### src/api/constants.js
Some default value are put over here


##### src/api/helpers.js
Some functions for this project


##### src/api/prototype.js
Just prevent IE break in some functions


##### src/api/resources.js
Online resources hosted in iStaging website


##### src/api/utils.js
Some functions for global use


#### common


##### src/common/Floorplan
Floorplan component here


##### src/common/Instructions
For blocking portrait iOS in VR mode


##### src/common/Krpano
The core of VR


##### src/common/PanoCollectionInfo
Collection avatar and name


##### src/common/ViewerLayer
It will show up in the center of the VR Viewer SDK, it is used by marker info, share, information


##### src/common/ViewerList
Panoramas list


##### src/common/ViewerMarkersHover
Hovered markers use this component


#### components


##### src/components/Icon/index.vue
All icon use this component, but you need to add image by yourself


##### src/components/Popup/index.vue
This is used for clicked marker popup


##### src/components/SvgIcon/index.vue
This is used for icons, but can change its color


##### src/components/IProgress.vue
While loading each panorama, it will appear


##### src/components/IRepeat.vue
Just a repeater


##### src/components/QrCode.vue
QR code



#### mixins
component IRepeat use filterBy


#### store
Get/set some state in the vuex framework


#### Pages

##### src/pages/IHeader.vue
Collection info is placed here.


##### src/pages/IFooter.vue
Powered by iStaging


##### src/pages/IAside.vue
Including INav component and close full screen or VR mode button


##### src/pages/IMain.vue
Most of the important components are put here. There has the core of VR display area - krpano.
And yet, there has hovered marker info, clicked marker info, share layer, panoramas list,
floor plan, instructions (for iOS) and popup.


##### src/pages/INav.vue
You can depends on what button you want to add, in small layout menu and in large
layout menu. Find it out in the file, there's three menu list in
computed object: navMobileOuterList, navMobileInnerList and navPcList.
Apparently the naming of these menu list is 2 for mobile view, 1 for desktop view, just add some code like this before the value return:



After you finished modifying, you can run ```npm run build```, then your result will built in dist files!
Examples folder is for building your site, but maybe you have no idea how to import the VR viewer SDK.
Now you have a great build example in examples folder.


## Enjoy it!
