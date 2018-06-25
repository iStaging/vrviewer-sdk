import {
  hotspotIcon
} from '@/api/helpers'

const getMarkerPointXml = function (marker, ath, atv, name, useCustomIcon, index, isMarkerPoint, krpanoXOffset) {
  return `<hotspot
  name="markerInfo_${marker.id}"
  style="markerInfo"
  scale="0"
  visible="false"
  ath="${ath}"
  atv="${atv - 6}"
  enabled="false"
  zorder="2"
  type="text"
  html="${name}" />
    <hotspot
  name="marker_${marker.id}"
  style="${hotspotIcon(marker, useCustomIcon)}"
  scale="1"
  ath="${ath}"
  atv="${atv}"
  zorder="1"
  onclick="prepare_change_scene(panorama_${marker.nextPanoId}, ${marker.nextPanoId}, 'Hotspot', ${krpanoXOffset - (marker.nextRotation ? marker.nextRotation.y : 0)}, ${isMarkerPoint}, ${ath});"
  ondown="marker_mousein(${marker.id}, ${index});"
  onover="marker_mousein(${marker.id}, ${index});"
  onout="marker_mouseout(${marker.id}, ${index});" />`
}

export default getMarkerPointXml
