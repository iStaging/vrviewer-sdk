import {
  coords3dTo2d,
  getCorrectRotation,
  hotspotIcon,
  xmlString,
  xmlUrlString
} from '@/api/helpers'
import getMarkerCustomXml from './marker-custom'
import getMarkerMemoXml from './marker-memo'
import getMarkerPointXml from './marker-point'
import getMarkerTagXml from './marker-tag'

const getScenesXml = (panoramas, startIndex, krpanoXOffset, krpanoVrModeObj, nextPanoramaNameName, defaultFov) => {
  let scene = ''
  let startupScene = ''
  panoramas.forEach((panorama, index) => {
    let hotspot = ''
    if (panorama.markers && panorama.markers.length) {
      panorama.markers.forEach((marker, index) => {
        let { ath, atv } = coords3dTo2d(marker.position)
        ath = getCorrectRotation(ath + krpanoXOffset)
        const useCustomIcon = marker.useCustomIcon && marker.iconUrl

        switch (marker.type) {
          case 'point':
            krpanoVrModeObj.vrModeShouldShow.push(`markerInfo_${marker.id}`)
            const name = nextPanoramaNameName(marker)
            const isMarkerPoint = true
            hotspot += getMarkerPointXml(marker, ath, atv, name, useCustomIcon, index, isMarkerPoint, krpanoXOffset)
            break
          case 'memo':
            krpanoVrModeObj.vrModeShouldShow.push(`markerInfo_${marker.id}`)
            hotspot += getMarkerMemoXml(marker, ath, atv, name, useCustomIcon, index)
            break
          case 'custom':
            hotspot += getMarkerCustomXml(marker, ath, atv, name, useCustomIcon, index)
            break
          case 'tag':
            hotspot += getMarkerTagXml(marker, ath, atv, name, useCustomIcon, index, krpanoVrModeObj)
            break
          case 'popup':
            krpanoVrModeObj.vrModeShouldHide.push(`marker_${marker.id}`)
            hotspot += `<hotspot name="marker_${marker.id}" style="${hotspotIcon(marker, useCustomIcon)}"
onclick="handle_show_popup(${index});" onover="marker_mousein(${marker.id}, ${index});" onout="marker_mouseout(${marker.id}, ${index});"
visible="true" scale="1" zorder="1" ath="${ath}" atv="${atv}" />`
            break
          default:
        }
      })
    }

    if (index === startIndex) {
      // for planet view init look at
      startupScene = `<scene name="first_panorama_${panorama.id}" isTopLogo="${panorama.isTopLogo}">
    <view hlookat="${(panorama.defaultViewAngle ? -panorama.defaultViewAngle.y : 0) + krpanoXOffset}" vlookat="90" fovtype="MFOV" fov="140" fovmin="30" fovmax="${defaultFov}"
    limitview="fullrange" vlookatmin="-90" vlookatmax="90" />
  ${(() => {
    if (panorama.cubemapReady) {
      return `<preview url="${panorama.cubemapLinkPreview ? xmlUrlString(panorama.cubemapLinkPreview) : ''}" />
<image><cube url="${panorama.cubemapLink ? xmlUrlString(panorama.cubemapLink) : ''}" /></image>`
    } else {
      return `<image><sphere url="${panorama.resizeUrl ? xmlUrlString(panorama.resizeUrl) : ''}" /></image>`
    }
  })()}
${hotspot}</scene>`
    }
    scene += getSceneXml(panorama, hotspot, defaultFov, krpanoXOffset)
  })
  scene = startupScene + scene
  return scene
}

const getSceneXml = function (panorama, hotspot, defaultFov, krpanoXOffset) {
  let sceneXml = ''
  sceneXml += `<scene name="panorama_${panorama.id}" title="${xmlString(panorama.name)}" panoramId="${panorama.id}" isTopLogo="${panorama.isTopLogo}">
    <view hlookat="${(panorama.defaultViewAngle ? -panorama.defaultViewAngle.y : 0) + krpanoXOffset}" vlookat="0" fovtype="MFOV" fov="${defaultFov}" fovmin="30" fovmax="${defaultFov}"
    limitview="fullrange" vlookatmin="-90" vlookatmax="90" />
    ${(() => {
    if (panorama.cubemapReady) {
      return `<preview url="${panorama.cubemapLinkPreview ? xmlUrlString(panorama.cubemapLinkPreview) : ''}" />
<image><cube url="${panorama.cubemapLink ? xmlUrlString(panorama.cubemapLink) : ''}" /></image>`
    } else {
      return `<image><sphere url="${panorama.resizeUrl ? xmlUrlString(panorama.resizeUrl) : ''}" /></image>`
    }
  })()}
    ${hotspot}</scene>`
  return sceneXml
}

export default getScenesXml
