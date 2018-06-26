import {
  hotspotIcon
} from '@/api/helpers'

const getMarkerProductXml = function (marker, ath, atv, name, useCustomIcon, index) {
  let product = ''
  product += `<hotspot
    name="marker_${marker.id}"
    style="${hotspotIcon(marker, useCustomIcon)}"
    scale="1"
    ath="${ath}"
    atv="${atv}"
    zorder="1"
    ondown="set_marker_info(${index});"
    onover="marker_mousein(${marker.id}, ${index}, product);"
    onhover="marker_mousein(${marker.id}, ${index}, product);"
    onout="marker_mouseout(${marker.id}, ${index}, product);" />`
  return product
}

export default getMarkerProductXml
