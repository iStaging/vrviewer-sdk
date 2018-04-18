# VRMaker

VRMaker js sdk help you build and edit your 360 panorama solution more easily by aframe or krpano.

## documation
[vrmaker js sdk documation](https://istaging.gitbook.io/vr-marker-sdk/)

- viewer
  - AframeViewer
  - KrpanoViewer
- panorama (need your server communicate with vrmaker backend api - need your server communicate with vrmaker backend api)
  - cubemap
  - auto hotspot
- marker (need your server communicate with vrmaker backend api - panding)
  - point
  - tag

## installation

Install dependencies by npm or yarn

``` bash
npm install
```

## How to use
Use node express sample server to get panoramas from vrmaker backend server api and init it by krpano or aframe.
Check in the examples folder.

``` bash
npm start
```

## If you only want to use vrmaker 360 viewer..
You can also use your own data without istaging api to create 360 viewer. (not recommended)
Check in the dev folder.

``` bash
npm run dev
```

# Thanks


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
