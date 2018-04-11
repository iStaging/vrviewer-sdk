import {
  countText
} from '../../utils'
import {
  isRtl,
  krpanoAutoBlank,
  krpanoEnterString,
  lengthInUtf8Bytes,
  xmlString
} from '../../helpers'

const getMarkerTagXml = (marker, ath, atv, category, hotspotIcon, useCustomIcon, index, krpanoVrModeObj) => {
  let tag = ''
  tag += `<hotspot
    name="marker_${marker.objectId}"
    style="${hotspotIcon(marker, useCustomIcon)}"
    scale="1"
    ath="${ath}"
    atv="${atv}"
    zorder="1"
    ondown="set_marker_info(${index});"
    onover="marker_mousein(${marker.objectId}, ${index}, tag);"
    onhover="marker_mousein(${marker.objectId}, ${index}, tag);"
    onout="marker_mouseout(${marker.objectId}, ${index}, tag);" />`
  const tagInfoPosition = {
    photo: {
      ox: -100,
      oy: -20
    },
    bg: {
      ox: 0,
      oy: 30,
      width: 250,
      height: 240
    },
    title: {
      ox: 0,
      oy: -65
    },
    price: {
      ox: 0,
      oy: -35
    },
    description: {
      ox: 0,
      oy: 40
    },
    descriptionWithoutPrice: {
      ox: 0,
      oy: 40
    }
  }
  if (isRtl()) {
    tagInfoPosition.photo.ox = 100
  }
  if (marker.photo) {
    if (isRtl()) {
      tagInfoPosition.photo.ox = 170
      tagInfoPosition.title.ox = -80
      tagInfoPosition.price.ox = -80
      tagInfoPosition.description.ox = -80
      tagInfoPosition.descriptionWithoutPrice.ox = -80
    } else {
      tagInfoPosition.photo.ox = -170
      tagInfoPosition.title.ox = 80
      tagInfoPosition.price.ox = 80
      tagInfoPosition.description.ox = 80
      tagInfoPosition.descriptionWithoutPrice.ox = 80
    }
    tagInfoPosition.bg.width = 520
    tagInfoPosition.photo.oy = -20
    tagInfoPosition.title.oy = -65
    tagInfoPosition.price.oy = -35
    if (marker.description && (lengthInUtf8Bytes(marker.description) >= 300 || countText(krpanoAutoBlank(krpanoEnterString(marker.description), 18), /\[br\]/) >= 7)) {
      tagInfoPosition.bg.oy = 130
      tagInfoPosition.bg.height = 460
      tagInfoPosition.description.oy = 230
      tagInfoPosition.descriptionWithoutPrice.oy = 210
    } else {
      tagInfoPosition.bg.width = 520
      tagInfoPosition.description.oy = 80
      tagInfoPosition.descriptionWithoutPrice.oy = 60
    }
    krpanoVrModeObj.vrModeShouldShow.push(`markerInfoPhoto_${marker.objectId}`)
    tag += `<hotspot
      name="markerInfoPhoto_${marker.objectId}"
      style="markerInfoTagPhoto_${marker.objectId}"
      scale="0"
      visible="false"
      width="140"
      height="110"
      ox="${tagInfoPosition.photo.ox}"
      oy="${tagInfoPosition.photo.oy}"
      ath="${ath}"
      atv="${atv - 13}"
      zorder="3"
      enabled="false" />`
  } else {
    if (isRtl()) {
      tagInfoPosition.bg.ox = -10
      tagInfoPosition.title.ox = -10
      tagInfoPosition.price.ox = -10
      tagInfoPosition.description.ox = -10
      tagInfoPosition.descriptionWithoutPrice.ox = -10
    } else {
      tagInfoPosition.bg.ox = 10
      tagInfoPosition.title.ox = 10
      tagInfoPosition.price.ox = 10
      tagInfoPosition.description.ox = 10
      tagInfoPosition.descriptionWithoutPrice.ox = 10
    }
    tagInfoPosition.bg.width = 360
    tagInfoPosition.title.oy = -65
    tagInfoPosition.price.oy = -35
    if (marker.description && (lengthInUtf8Bytes(marker.description) >= 300 || countText(krpanoAutoBlank(krpanoEnterString(marker.description), 18), /\[br\]/) >= 7)) {
      tagInfoPosition.bg.oy = 130
      tagInfoPosition.bg.height = 460
      tagInfoPosition.description.oy = 230
      tagInfoPosition.descriptionWithoutPrice.oy = 210
    } else {
      tagInfoPosition.description.oy = 80
      tagInfoPosition.descriptionWithoutPrice.oy = 60
    }
  }
  krpanoVrModeObj.vrModeShouldShow.push(`markerInfoBg_${marker.objectId}`)
  krpanoVrModeObj.vrModeShouldShow.push(`markerInfoTitle_${marker.objectId}`)
  krpanoVrModeObj.vrModeShouldShow.push(`markerInfoPrice_${marker.objectId}`)
  krpanoVrModeObj.vrModeShouldShow.push(`markerInfoDescription_${marker.objectId}`)
  tag += `<hotspot
    name="markerInfoBg_${marker.objectId}"
    style="markerInfoTagBg"
    scale="0"
    visible="false"
    width="${tagInfoPosition.bg.width}"
    height="${tagInfoPosition.bg.height}"
    ath="${ath}"
    atv="${atv - 13}"
    ox="${tagInfoPosition.bg.ox}"
    oy="${tagInfoPosition.bg.oy}"
    zorder="2"
    enabled="false"
    type="text" />
  <hotspot
    name="markerInfoTitle_${marker.objectId}"
    style="markerInfoTag"
    css="font-family:Arial; font-size:22px; color:#fff;"
    scale="0"
    visible="false"
    width="320"
    height="28"
    ox="${tagInfoPosition.title.ox}"
    oy="${tagInfoPosition.title.oy}"
    ath="${ath}"
    atv="${atv - 13}"
    zorder="3"
    enabled="false"
    type="text"
    html="${xmlString(krpanoAutoBlank(marker.name, 12, true))}" />
  <hotspot
    name="markerInfoPrice_${marker.objectId}"
    style="markerInfoTag"
    css="font-family:Arial; font-size:20px; color:#fff;"
    scale="0"
    visible="false"
    width="320"
    height="30"
    ox="${tagInfoPosition.price.ox}"
    oy="${tagInfoPosition.price.oy}"
    ath="${ath}"
    atv="${atv - 13}"
    enabled="false"
    zorder="3"
    type="text"
    html="${xmlString(krpanoAutoBlank(marker.price, 12, true))}" />`
  if (marker.description && (lengthInUtf8Bytes(marker.description) >= 300 || countText(krpanoAutoBlank(krpanoEnterString(marker.description), 18), /\[br\]/) >= 7)) {
    tag += `<hotspot
      name="markerInfoDescription_${marker.objectId}"
      style="markerInfoTag"
      scale="0"
      visible="false"
      width="320"
      height="500"
      ox="${marker.price ? tagInfoPosition.description.ox : tagInfoPosition.descriptionWithoutPrice.ox}"
      oy="${marker.price ? tagInfoPosition.description.oy : tagInfoPosition.descriptionWithoutPrice.oy}"
      ath="${ath}"
      atv="${atv - 13}"
      zorder="3"
      enabled="false"
      type="text"
      html="${xmlString(krpanoAutoBlank(krpanoEnterString(marker.description), 17))}" />`
  } else if (marker.description) {
    tag += `<hotspot
      name="markerInfoDescription_${marker.objectId}"
      style="markerInfoTag"
      scale="0"
      visible="false"
      width="320"
      height="200"
      ox="${marker.price ? tagInfoPosition.description.ox : tagInfoPosition.descriptionWithoutPrice.ox}"
      oy="${marker.price ? tagInfoPosition.description.oy : tagInfoPosition.descriptionWithoutPrice.oy}"
      ath="${ath}"
      atv="${atv - 13}"
      zorder="3"
      enabled="false"
      type="text"
      html="${xmlString(krpanoAutoBlank(krpanoEnterString(marker.description), 17))}" />`
//                      bg="true"
//                      bgcolor="0x00ff00"
//                      console.log(xmlString(krpanoAutoBlank(krpanoEnterString(marker.description))))
  }
  return tag
}

export default getMarkerTagXml
