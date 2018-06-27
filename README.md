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

<h4>api</h4>

##### src/api/constants.js
<ul>
  <li>Some default value are put over here</li>
</ul>

##### src/api/helpers.js
<ul>
  <li>Some functions for this project</li>
</ul>

##### src/api/prototype.js
<ul>
  <li>Just prevent IE break in some functions</li>
</ul>

##### src/api/resources.js
<ul>
  <li>Online resources hosted in iStaging website</li>
</ul>

##### src/api/utils.js
<ul>
  <li>Some functions for global use</li>
</ul>

<h4>common</h4>

##### src/common/Floorplan
<ul>
  <li>Floorplan component here</li>
</ul>

##### src/common/Instructions
<ul>
  <li>For blocking portrait iOS in VR mode</li>
</ul>

##### src/common/Krpano
<ul>
  <li>The core of VR</li>
</ul>

##### src/common/PanoCollectionInfo
<ul>
  <li>Collection avatar and name</li>
</ul>

##### src/common/ViewerLayer
<ul>
  <li>It will show up in the center of the VR Viewer SDK, it is used by marker info, share, information</li>
</ul>

##### src/common/ViewerList
<ul>
  <li>Panoramas list</li>
</ul>

##### src/common/ViewerMarkersHover
<ul>
  <li>Hovered markers use this component</li>
</ul>

<h4>components</h4>

##### src/components/Icon/index.vue
<ul>
  <li>All icon use this component, but you need to add image by yourself</li>
</ul>

##### src/components/Popup/index.vue
<ul>
  <li>This is used for clicked marker popup</li>
</ul>

##### src/components/SvgIcon/index.vue
<ul>
  <li>This is used for icons, but can change its color</li>
</ul>

##### src/components/IProgress.vue
<ul>
  <li>While loading each panorama, it will appear</li>
</ul>

##### src/components/IRepeat.vue
<ul>
  <li>Just a repeater</li>
</ul>

##### src/components/QrCode.vue
<ul>
  <li>QR code</li>
</ul>

<h4>mixins:</h4>
<ul>
  <li>Component IRepeat use filterBy</li>
</ul>

<h4>store</h4>
<ul>
  <li>Get/set some state in the vuex framework</li>
</ul>

<h4>Pages</h4>

##### src/pages/IHeader.vue
<ul>
  <li>Collection info is placed here.</li>
</ul>

##### src/pages/IFooter.vue
<ul>
  <li>Powered by iStaging</li>
</ul>

##### src/pages/IAside.vue
<ul>
  <li>Including INav component and close full screen or VR mode button</li>
</ul>

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
