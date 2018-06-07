import {
  hotspotIcon
} from '@/api/helpers'

const getMarkerCustomizedTagXml = function (marker, ath, atv, name, useCustomIcon, index) {
  let tag = `<hotspot
    name="marker_${marker.id}"
    style="${hotspotIcon(marker, useCustomIcon)}"
    scale="1"
    ath="${ath}"
    atv="${atv}"
    zorder="1"
    ondown="set_marker_info(${index});"
    onover="marker_mousein(${marker.id}, ${index}, customizedTag);"
    onhover="marker_mousein(${marker.id}, ${index}, customizedTag);"
    onout="marker_mouseout(${marker.id}, ${index}, customizedTag);" />`
  return tag
}

export default getMarkerCustomizedTagXml
