import {
  isElement
} from '@/common/utils'

let _sceneEl
let _assetsEl
let _skyEl
let _cameraEl
let _cameraContainerEl
let _cameraAnimationEl
let _cameraStartRotation
let _cameraRotation

const aframeConstants = {
  setSceneEl: (sceneEl) => {
    _sceneEl = sceneEl
  },

  setAssetsEl: (assetsEl) => {
    _assetsEl = assetsEl
  },

  setSkyEl: (skyEl) => {
    _skyEl = skyEl
  },

  setCameraEl: (cameraEl) => {
    _cameraEl = cameraEl
  },

  setCameraContainerEl: (cameraContainerEl) => {
    _cameraContainerEl = cameraContainerEl
  },

  setCameraAnimationEl: (cameraAnimationEl) => {
    _cameraAnimationEl = cameraAnimationEl
  },

  setCameraStartRotation: (cameraStartRotation) => {
    _cameraStartRotation = cameraStartRotation
  },

  setCameraRotation: (cameraRotation) => {
    _cameraRotation = cameraRotation
  },

  getSceneEl: () => {
    if (!isElement(_sceneEl)) {
      throw new Error('You need to init and generate aframe first.')
    }
    return _sceneEl
  },
  getAssetsEl: () => _assetsEl,
  getSkyEl: () => _skyEl,
  getCameraEl: () => _cameraEl,
  getCameraContainerEl: () => _cameraContainerEl,
  getCameraAnimationEl: () => _cameraAnimationEl,
  getCameraStartRotation: () => _cameraStartRotation,
  getCameraRotation: () => _cameraRotation
}

export default aframeConstants
