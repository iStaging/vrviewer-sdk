import {
  isElement
} from '@/common/utils'

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

  getSceneEl: () => {
    if (!isElement(_sceneEl)) {
      throw new Error('You need to init and generate aframe first.')
    }
    return _sceneEl
  },
  getSkyEl: () => _skyEl,
  getCameraEl: () => _cameraEl
}

export default aframeConstants
