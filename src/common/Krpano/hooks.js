import { loadImage } from '@/api/utils'
// import {
//   coords2dTo3d,
//   coords3dTo2d,
//   setCorrectRotation
// } from '@/api/helpers'

// krpano actions use jscall, next step goes here to communicate with vue
// vm is Vue component's method
const hooks = vm => {
  return {
    startAutoRotate () {
      vm.startAutoRotate()
    },
    stopAutoRotate (bool = false) {
      vm.stopAutoRotate({
        shouldAutoStartRotate: bool
      })
    },
    prepareChangeScene (nextName = '', nextPanoramaId = '', nextDefaultViewAngle = 0, isMarkerPoint = false, markerAth = 0) {
      const oldIndex = vm.panoramas.findIndex(panorama => panorama.id === vm.currentPanorama.id)
      const newIndex = vm.panoramas.findIndex(panorama => panorama.id === nextPanoramaId)
      if (newIndex > -1) {
        const foundPanorama = vm.panoramas[newIndex]
        const oldHLookat = vm.krpanoLookAtH
        if (foundPanorama.cubemapReady) {
          vm.krpanoEl.call(`change_scene(${nextName}, ${nextPanoramaId}, ${nextDefaultViewAngle},
           ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${vm.isGyroEnabled});`)
        } else {
          vm.setProgressCount(0)
          vm.setProgressMax(100)
          vm.showProgress()
          loadImage(foundPanorama.resizeUrl, () => {
            vm.closeProgress()
            vm.krpanoEl.call(`change_scene(${nextName}, ${nextPanoramaId}, ${nextDefaultViewAngle},
             ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${vm.isGyroEnabled});`)
          }, (e) => {
            vm.setProgressCount(e * 2)
          }, () => {
            vm.closeProgress()
          })
        }
      }
    },
    changeImage (nextPanoramaId) {
      vm.selectPanorama(nextPanoramaId)
    },
    threeJsMoving (nextDefaultViewAngle = 0, markerAth = 0, newIndex, oldIndex, oldHLookat = 0) {
      // console.log('threeJsMoving', nextDefaultViewAngle, markerAth, newIndex, oldIndex, oldHLookat)
      window.animationStart = true
      window.build_scene(nextDefaultViewAngle, markerAth, newIndex, oldIndex, oldHLookat)
    },
    threeJsMovingStop () {
      // console.log('threeJsMovingStop')
      window.animationStart = false
    },
    markerMousein (index = 0, mouseX = 0, mouseY = 0) {
      vm.krpanoMarkerMousein(index, mouseX, mouseY)
    },
    markerMouseout (index) {
      vm.krpanoMarkerMouseout(index)
    },
    setMarkerInfo (index) {
      vm.setMarkerInfo(index)
    },
    changeCamera (h, v) {
      vm.setKrpanoLookAtH(h)
    },
    handleShowPopup (index) {
      vm.handleShowPopup(index)
    },
    exitVrMode () {
      vm.exitVrMode()
    },
    clickKrpanoScreen () {
      // if (this.shouldEnterClosestPointMarker()) {
      //   if (vm.krpanoEl) {
      //     vm.krpanoEl.call(`enter_closest_point_marker();`)
      //   }
      // }
    },
    shouldEnterClosestPointMarker () {
      // if (vm.krpanoEl) {
      //   if (vm.$route.name === 'yung-ching') {
      //     if (vm.isPanoramasListActive ||
      //       (window.innerWidth < 768 && (vm.isFloorplanActive || vm.isPanoramasListActive))) {
      //       // 768 = CSS assets/css/variables.styl $response value
      //       return false
      //     }
      //   } else if (window.innerWidth < 768 &&
      //     (vm.isFloorplanActive || vm.isPanoramasListActive)) {
      //     // 768 = CSS assets/css/variables.styl $response value
      //     return false
      //   } else if (vm.isMarkerInfoActive ||
      //     vm.isInformationActive ||
      //     vm.isCommentsActive ||
      //     vm.isShareActive) {
      //     return false
      //   }
      //   return true
      // }
      // return false
    },
    findClosestPointMarker (mAth, mAtv, callback) {
      // if (vm.currentPanorama.markers) {
      //   const points = vm.currentPanorama.markers.filter(marker => marker.type === 'point')
      //   if (points) {
      //     let closestDistance = 3600
      //     let closestPoint = null
      //     let closestAth
      //     const { x: mX, y: mY, z: mZ } = coords2dTo3d({ ath: mAth, atv: mAtv })
      //     // console.log('mouse position 2d', mAth, mAtv)
      //     // console.log('mouse position 3d', mX, mY, mZ)
      //     points.forEach(point => {
      //       let { ath, atv } = coords3dTo2d(point.position)
      //       ath = setCorrectRotation(ath + vm.krpanoXOffset)
      //       const { x, y, z } = coords2dTo3d({ ath, atv })
      //       const distance = Math.sqrt(Math.pow(mX - x, 2) + Math.pow(mY - y, 2) + Math.pow(mZ - z, 2))
      //       // console.log('point position 3d', x, y, z, vm.nextPanoramaNameName(point))
      //       // console.log('distance', distance)
      //       if (closestDistance > distance) {
      //         closestDistance = distance
      //         closestPoint = point
      //         closestAth = ath
      //       }
      //     })
      //     // console.log('closestDistance', closestDistance)
      //     // console.log('closestPoint', closestPoint)
      //     // console.log('next point', vm.nextPanoramaNameName(closestPoint))
      //     if (callback && typeof callback === 'function' && callback instanceof Function) {
      //       callback(closestPoint, closestAth)
      //     } else {
      //       return { closestPoint, closestAth }
      //     }
      //   }
      // }
    },
    enterClosestPointMarker (marker, closestAth) {
      // if (marker) {
      //   vm.krpanoEl.call(`prepare_change_scene(panorama_${marker.nextPanoramaId}, ${marker.nextPanoramaId}, 'Screen', ${vm.krpanoXOffset - (marker.nextRotation ? marker.nextRotation.y : 0)}, true, ${closestAth}`)
      // }
    },
    hoverClosestPointMarker (closestPoint) {
      // if (vm.currentPanorama.markers) {
      //   const points = vm.currentPanorama.markers.filter(marker => marker.type === 'point')
      //   if (points) {
      //     if (vm.currentMarker && vm.currentMarker.objectId && vm.currentMarker.type !== 'point') {
      //       // has already hovered in a tag/memo/popup marker, so un-hover all point markers
      //       points.forEach(marker => {
      //         vm.krpanoEl.call(`marker_fadeout(${marker.objectId})`)
      //       })
      //     } else {
      //       // hover focused point marker and un-hover other point markers
      //       const otherPoints = points.filter(marker => marker.objectId !== closestPoint.objectId)
      //       if (otherPoints) {
      //         otherPoints.forEach(marker => {
      //           vm.krpanoEl.call(`marker_fadeout(${marker.objectId})`)
      //         })
      //       }
      //       if (closestPoint) {
      //         vm.krpanoEl.call(`marker_fadein(${closestPoint.objectId})`)
      //       }
      //     }
      //   }
      // }
    }
  }
}

export default hooks
