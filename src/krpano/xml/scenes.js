import {
  coords3dTo2d,
  getCorrectRotation,
  xmlString,
  xmlUrlString
} from '../../common/helpers'
import {
  isEmpty
} from '../../common/utils'
import getMarkerMemoXml from './marker-memo'
import getMarkerPointXml from './marker-point'
import getMarkerTagXml from './marker-tag'

// startIndex is started from 0
const getScenesXml = function (panoramas, startIndex) {
  let scene = ''
  let startupScene = ''
  panoramas.forEach((panorama, index) => {
    let hotspot = ''
//     if (panorama.markers && panorama.markers.length) {
//       panorama.markers.forEach((marker, index) => {
//         let { ath, atv } = coords3dTo2d(marker.position)
//         ath = getCorrectRotation(ath + this.getKrpanoXOffset())
//         const useCustomIcon = this.customSetting.customBranding && marker.useCustomIcon && marker.iconUrl
//
//         switch (marker.type) {
//           case 'point':
//             this.addVrModeShouldShow(`markerInfo_${marker.objectId}`)
//             const category = nextPanoramaCategoryName(marker)
//             const isMarkerPoint = true
//             hotspot += getMarkerPointXml(marker, ath, atv, category, hotspotIcon, useCustomIcon, index, isMarkerPoint, this.getKrpanoXOffset)
//             break
//           case 'memo':
//             this.addVrModeShouldShow(`markerInfo_${marker.objectId}`)
//             hotspot += getMarkerMemoXml(marker, ath, atv, category, hotspotIcon, useCustomIcon, index)
//             break
//           case 'tag':
//             hotspot += getMarkerTagXml(marker, ath, atv, category, hotspotIcon, useCustomIcon, index, this.addVrModeShouldShow)
//             break
//           case 'popup':
//             this.addVrModeShouldHide(`marker_${marker.objectId}`)
//             hotspot += `<hotspot name="marker_${marker.objectId}" style="${hotspotIcon(marker, useCustomIcon)}"
// onclick="handle_show_popup(${index});" onover="marker_mousein(${marker.objectId}, ${index});" onout="marker_mouseout(${marker.objectId}, ${index});"
// visible="true" scale="1" zorder="1" ath="${ath}" atv="${atv}" />`
//             break
//           default:
//         }
//       })
//     }

    if (index === startIndex) {
      // for planet view init look at
      startupScene = `<scene name="first_panorama_${panorama.objectId}" isTopLogo="${panorama.isTopLogo}">
    <view hlookat="${(panorama.panoramaRotation ? -panorama.panoramaRotation.y : 0) + this.getKrpanoXOffset()}" vlookat="90" fovtype="MFOV" fov="140" fovmin="30" fovmax="${this.getDefaultFov()}"
    limitview="fullrange" vlookatmin="-90" vlookatmax="90" />
  ${(() => {
        if (panorama.cubemapReady) {
          return `<preview url="${panorama.cubemapPreivewUrl ? xmlUrlString(panorama.cubemapPreivewUrl) : ''}" />
<image><cube url="${panorama.cubemapUrl ? xmlUrlString(panorama.cubemapUrl) : ''}" /></image>`
        } else {
          return `<image><sphere url="${panorama.desktopUrl ? xmlUrlString(panorama.desktopUrl) : ''}" /></image>`
        }
      })()}
${hotspot}</scene>`
    }
    scene += getSceneXml.call(this, panorama, hotspot)
  })
  scene = startupScene + scene
  return scene
}

const getSceneXml = function (panorama, hotspot) {
  let sceneXml = ''
  sceneXml += `<scene name="panorama_${panorama.objectId}" title="${xmlString(panorama.name)}" objectId="${panorama.objectId}" isTopLogo="${panorama.isTopLogo}">
    <view hlookat="${(panorama.panoramaRotation ? -panorama.panoramaRotation.y : 0) + this.getKrpanoXOffset()}" vlookat="0" fovtype="MFOV" fov="${this.getDefaultFov()}" fovmin="30" fovmax="${this.getDefaultFov()}"
    limitview="fullrange" vlookatmin="-90" vlookatmax="90" />
    ${(() => {
    if (panorama.cubemapReady) {
      return `<preview url="${panorama.cubemapPreivewUrl ? xmlUrlString(panorama.cubemapPreivewUrl) : ''}" />
<image><cube url="${panorama.cubemapUrl ? xmlUrlString(panorama.cubemapUrl) : ''}" /></image>`
    } else {
      return `<image><sphere url="${panorama.desktopUrl ? xmlUrlString(panorama.desktopUrl) : ''}" /></image>`
    }
  })()}
    ${hotspot}</scene>`
  return sceneXml
}

function nextPanoramaCategoryName (marker = {}) {
  if (!this.panoramas || this.panoramas.length <= 0) {
    return
  }
  const foundPanorama = this.panoramas.find(panorama =>
    panorama.objectId === marker.nextPanoramaId
  )
  if (isEmpty(foundPanorama)) {
    return
  }
  return xmlString(foundPanorama.customCategory || foundPanorama.category)
}

export default getScenesXml
