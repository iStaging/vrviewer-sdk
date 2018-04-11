import { loadImage } from '../utils'

// krpano actions use jscall, next step goes here to communicate with vue
// vm is Vue component's method
const getHooks = vm => {
  return {
    startAutoRotate () {
      vm.startAutoRotate()
    },
    stopAutoRotate (bool = false) {
      vm.stopAutoRotate(bool)
    },
    prepareChangeScene (nextPanoramaName = '', nextPanoramaId = '', selectedMethod = '', nextPanoramaRotation = 0, isMarkerPoint = false, markerAth = 0) {
      const panoramas = vm.getPanoramas()
      const currentPanorama = vm.getCurrentPanorama()
      const config = vm.getConfig()
      const oldIndex = panoramas.findIndex(panorama => panorama.objectId === currentPanorama.objectId)
      const newIndex = panoramas.findIndex(panorama => panorama.objectId === nextPanoramaId)
      if (newIndex > -1) {
        const foundPanorama = panoramas[newIndex]
        const oldHLookat = vm.krpanoLookAtH
        // if (foundPanorama.cubemapReady) {
        //   vm.krpanoEl.call(`change_scene(${nextPanoramaName}, ${nextPanoramaId}, ${selectedMethod}, ${nextPanoramaRotation},
        //    ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${config.gyroSettings.active});`)
        // } else {
          // vm.setProgressCount(0)
          // vm.setProgressMax(100)
          // vm.showProgress()
          loadImage(foundPanorama.desktopUrl, () => {
            // vm.closeProgress()
            vm.krpanoEl.call(`change_scene(${nextPanoramaName}, ${nextPanoramaId}, ${selectedMethod}, ${nextPanoramaRotation},
             ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${config.gyroSettings.active});`)
          }, (e) => {
            // vm.setProgressCount(e * 2)
          }, () => {
            // vm.closeProgress()
          })
        // }
      }
    },
    changeImage (nextPanoramaId, selectedMethod, isMarkerPoint, isWebVr) {
      // vm.selectPanorama(nextPanoramaId, selectedMethod, isMarkerPoint, isWebVr)
    },
    threeJsMoving (nextPanoramaRotation = 0, markerAth = 0, newIndex, oldIndex, oldHLookat = 0) {
      // console.log('threeJsMoving', nextPanoramaRotation, markerAth, newIndex, oldIndex, oldHLookat)
      window.animationStart = true
      window.build_scene(nextPanoramaRotation, markerAth, newIndex, oldIndex, oldHLookat)
    },
    threeJsMovingStop () {
      // console.log('threeJsMovingStop')
      window.animationStart = false
    },
    markerMousein (index = 0, mouseX = 0, mouseY = 0) {
      // vm.krpanoMarkerMousein(index, mouseX, mouseY)
    },
    markerMouseout (index) {
      // vm.krpanoMarkerMouseout(index)
    },
    setMarkerInfo (index) {
      // vm.setMarkerInfo(index)
    },
    changeCamera (h, v) {
      vm.setKrpanoLookAtH(h)
    },
    handleShowPopup (index) {
      vm.handleShowPopup(index)
    },
    exitVrMode () {
      vm.exitVrMode()
    }
  }
}

export default getHooks
