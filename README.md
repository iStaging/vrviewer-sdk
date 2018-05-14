# VRViewer

VRViewer js sdk help you to create your 360 panorama viewer more easily by krpano.

## documation
[https://istaging.gitbook.io/vr-maker-sdk](https://istaging.gitbook.io/vr-maker-sdk)

- viewer
  - KrpanoViewer (recommend)
    - vr mode
    - auto rotation
    - change animation
    - support cubemap

## How to use

### ES6:

``` bash
npm install vrviewer
import VRViewer from 'vrviewer'

// init krpano viewer (recommended)
new VRViewer.krpanoViewer()
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

// check more in documation or examples, dev folder
```

## Work with istaging vrviewer solution which can upload your panorama with cubemap, auto hotspot, edit your marker like point, tag..etc. Get the data from vrviewer backend server.
Use node express sample server to get the access key to upload your panoramas by vrviewer backend server api and init the data by krpano.
Check in the examples folder.

``` bash
npm start
```

## If you only want to use vrviewer 360 viewer..
Following the data structure, you can also only use your own data without istaging api to create 360 viewer.
Check in the dev folder.

``` bash
npm run dev
```

# Thanks
