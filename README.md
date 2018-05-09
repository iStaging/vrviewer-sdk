# VRViewer

VRViewer js sdk help you build and edit your 360 panorama solution more easily by aframe or krpano.

## documation
[https://istaging.gitbook.io/vr-marker-sdk](https://istaging.gitbook.io/vr-marker-sdk)

- viewer
  - KrpanoViewer (recommend)
    - auto rotation
    - change animation
    - support cubemap
  - AframeViewer
  - auto rotation
- panorama (pending - need your server communicate with vrviewer backend api)
  - cubemap
  - auto hotspot
- marker (pending - need your server communicate with vrviewer backend api)
  - point
  - tag

## How to use

### ES6:

``` bash
npm install vrviewer
import VRViewer from 'vrviewer'

// init krpano viewer (recommended)
new VRViewer.krpanoViewer()
...

// init aframe viewer
new VRViewer.AframeViewer()
...

// check more in documation or examples, dev folder
```

### Use cdn:

``` bash
// include script
<script src="https://www.istaging.com/sdk/vrviewer.js">

// init krpano viewer (recommended)
new VRViewer.krpanoViewer()
...

// init aframe viewer
new VRViewer.AframeViewer()
...

// check more in documation or examples, dev folder
```

Warning: use aframe will not support auto rotation, animation cubemap.

## Work with vrviewer backend server
Use node express sample server to get the access key to upload your panoramas by vrviewer backend server api and init it by krpano or aframe.
Check in the examples folder.

``` bash
npm start
```

## If you only want to use vrviewer 360 viewer..
You can also only use your own data without istaging api to create 360 viewer. (not recommended)
Check in the dev folder.

``` bash
npm run dev
```

# Thanks
