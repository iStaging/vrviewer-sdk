import {
  krpanoAutoBlank,
  krpanoEnterString,
  xmlString
} from '../../common/helpers'

const getMarkerMemoXml = (marker, ath, atv, category, hotspotIcon, useCustomIcon, index) => {
  let memo = ''
  if (marker.description && marker.description.length >= 120) {
    memo += `<hotspot
      name="markerInfo_${marker.objectId}"
      style="markerInfo"
      scale="0"
      visible="false"
      width="400"
      height="450"
      ath="${ath}"
      atv="${atv - 13}"
      enabled="false"
      zorder="2"
      type="text"
      html="${xmlString(krpanoAutoBlank(krpanoEnterString(marker.description), 18))}" />`
  } else {
    memo += `<hotspot
      name="markerInfo_${marker.objectId}"
      style="markerInfo"
      scale="0"
      visible="false"
      width="300"
      height="160"
      ath="${ath}"
      atv="${atv - 13}"
      enabled="false"
      zorder="2"
      type="text"
      html="${xmlString(krpanoAutoBlank(krpanoEnterString(marker.description)))}" />`
  }
  memo += `<hotspot
    name="marker_${marker.objectId}"
    style="${hotspotIcon(marker, useCustomIcon)}"
    scale="1"
    ath="${ath}"
    atv="${atv}"
    zorder="1"
    ondown="set_marker_info(${index});"
    onover="marker_mousein(${marker.objectId}, ${index});"
    onout="marker_mouseout(${marker.objectId}, ${index});" />`
  return memo
}

export default getMarkerMemoXml
