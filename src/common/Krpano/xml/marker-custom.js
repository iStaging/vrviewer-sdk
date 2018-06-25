import {
  hotspotIcon
} from '@/api/helpers'

const getMarkerCustomXml = function (marker, ath, atv, name, useCustomIcon, index) {
  let custom = `<hotspot
    name="marker_${marker.id}"
    style="${hotspotIcon(marker, useCustomIcon)}"
    scale="1"
    ath="${ath}"
    atv="${atv}"
    zorder="1"
    ondown="set_marker_info(${index});"
    onover="marker_mousein(${marker.id}, ${index}, custom);"
    onhover="marker_mousein(${marker.id}, ${index}, custom);"
    onout="marker_mouseout(${marker.id}, ${index}, custom);" />`
  return custom
}

export default getMarkerCustomXml
