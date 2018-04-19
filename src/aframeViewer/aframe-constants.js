let _sceneEl = {}
let _skyEl = {}
let _cameraEl = {}

const aframeConstants = {
  setSceneEl: (sceneEl) => {
    _sceneEl = sceneEl
  },

  setSkyEl: (skyEl) => {
    _skyEl = skyEl
  },

  setCameraEl: (cameraEl) => {
    _cameraEl = cameraEl
  },

  getSceneEl: () => _sceneEl,
  getSkyEl: () => _skyEl,
  getCameraEl: () => _cameraEl
}

export default aframeConstants
