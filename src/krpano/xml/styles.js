import {
  isRtl,
  xmlString,
  xmlUrlString,
  krpanoAutoBlank,
  krpanoEnterString
} from '../../common/helpers'
import {
  markerAlpha
} from './common'
import linkImage from '../../../img/krpano-img/markers/link.png'
import memoImage from '../../../img/krpano-img/markers/memo.png'
import pointImage from '../../../img/krpano-img/markers/point.png'
import tagImage from '../../../img/krpano-img/markers/tag.png'
import videoImage from '../../../img/krpano-img/markers/video.png'
import leftArrowImage from '../../../img/krpano-img/markers/arrows/left-arrow.png'
import rightArrowImage from '../../../img/krpano-img/markers/arrows/right-arrow.png'
import frontArrowImage from '../../../img/krpano-img/markers/arrows/front-arrow.png'
import leftFrontArrowImage from '../../../img/krpano-img/markers/arrows/left-front-arrow.png'
import rightFrontArrowImage from '../../../img/krpano-img/markers/arrows/right-front-arrow.png'
import prevPanoramaImage from '../../../img/krpano-img/prev-panorama.png'
import menuImage from '../../../img/krpano-img/menu.png'
import nextPanoramaImage from '../../../img/krpano-img/next-panorama.png'
const markerInfoCss = 'font-family:Arial; color:#fff;'
const markerInfoCommonAttribute = 'scale="1" distorted="true" wordwrap="true" bgcolor="0x000000" bgalpha=".8"'
const markerIconCommonAttribute = `zoom="true" distorted="true" scale="1" vr_timeout="700" keep="false" alpha="${markerAlpha}"`
const markerIconSize = 'width="51.2" height="51.2"'

const basicStyles = () => {
  let prev = '-1'
  let next = '+1'
  if (isRtl()) {
    prev = '+1'
    next = '-1'
  }
  return `<style name="link" url="${linkImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="memo" url="${memoImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="point" url="${pointImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="tag" url="${tagImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="video" url="${videoImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="leftArrow" url="${leftArrowImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="rightArrow" url="${rightArrowImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="frontArrow" url="${frontArrowImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="leftFrontArrow" url="${leftFrontArrowImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="rightFrontArrow" url="${rightFrontArrowImage}" ${markerIconCommonAttribute} ${markerIconSize} />
<style name="markerInfo" css="${markerInfoCss} font-size:16px;" padding="15" bg="true" ${markerInfoCommonAttribute} />
<style name="markerInfoTag" ${markerInfoCommonAttribute} padding="0" bg="false" css="${markerInfoCss} font-size:14px;" />
<style name="markerInfoTagBg" ${markerInfoCommonAttribute} padding="0" bg="true" css="${markerInfoCss} font-size:16px;" />
<style name="vr_menu_style" depth="800" scale="0.2" distorted="true" ath="0" atv="45" visible="false" />
<style name="vr_panorama_style" depth="800" distorted="true" keep="true" scale="0" />
<hotspot name="vr_menu_bg" style="vr_menu_style" keep="true" zorder="5" bgcolor="0x000000" bgalpha=".8" bg="true" type="text"
width="300" height="120" onover="vr_menu_over();" onout="vr_menu_out();" handcursor="false" />
<hotspot name="vr_menu_l" style="vr_menu_style" keep="true" zorder="6" url="${prevPanoramaImage}"
width="60" height="60" ox="-20" onover="vr_menu_over(); delayedcall(0,tween(alpha,0.75,0.1));" onout="vr_menu_out();" vr_timeout="700" onclick="nextscene_loop(${prev});" />
<hotspot name="vr_menu" style="vr_menu_style" keep="true" zorder="6" url="${menuImage}"
width="60" height="60" onover="vr_menu_over(); delayedcall(0,tween(alpha,0.75,0.1));" onout="vr_menu_out();" vr_timeout="700" onclick="toggle_vr_menu(get('view.hlookat'));" />
<hotspot name="vr_menu_r" style="vr_menu_style" keep="true" zorder="6" url="${nextPanoramaImage}"
width="60" height="60" ox="+20" onover="vr_menu_over(); delayedcall(0,tween(alpha,0.75,0.1));" onout="vr_menu_out();" vr_timeout="700" onclick="nextscene_loop(${next});" />`
}

const vrThumbWidth = 160
const getStylesXml = function (panoramas) {
  let style = basicStyles()
  panoramas.forEach((panorama, index) => {
    const verticalCount = index % 4
    const horizontalCount = Math.floor(index / 4)
    // vr mode thumbnail
    let oy = (-(vrThumbWidth / 2 + 30) * 1.5) + (vrThumbWidth / 2 + 30) * (verticalCount)
    let vrThumbAth = this.getVrThumbAth() * horizontalCount
    if (isRtl()) {
      vrThumbAth *= -1
    }
    style += `<hotspot name="vr_panorama_${index}" style="vr_panorama_style" zorder="6" url="${xmlUrlString(panorama.thumbnail)}" vr_timeout="2000"
ath="${vrThumbAth}" oy="${oy}"
width="${vrThumbWidth}" height="${vrThumbWidth / 2}" onclick="prepare_change_scene(panorama_${panorama.objectId}, ${panorama.objectId}, VrModeThumbnail)" />
<hotspot name="vr_panorama_text_${index}" css="font-family:Arial; color:#fff; font-size:12px; text-align: center; line-height: 18px;"
type="text" html="${xmlString(krpanoAutoBlank(krpanoEnterString(panorama.customCategory || panorama.category), 10, true))}" vr_timeout="2000"
style="vr_panorama_style" bgcolor="0x000000" bgalpha=".8" zorder="7"
ath="${vrThumbAth}" oy="${oy + 50}"
width="${vrThumbWidth}" height="20" onclick="prepare_change_scene(panorama_${panorama.objectId}, ${panorama.objectId}, 'VrModeThumbnailText')" />`

    // load all images from markers
    // if (panorama.markers && panorama.markers.length) {
    //   panorama.markers.forEach(marker => {
    //     if (marker.useCustomIcon && marker.iconUrl) {
    //       // add custom icon image
    //       style += `<style name="markerCustomIcon_${marker.objectId}" url="${xmlUrlString(marker.iconUrl)}" ${markerIconCommonAttribute} ${markerIconSize} />`
    //     }
    //     if (marker.type === 'tag' && marker.photo) {
    //       // add tag photo
    //       style += `<style name="markerInfoTagPhoto_${marker.objectId}" url="${xmlUrlString(marker.photo)}" ${markerIconCommonAttribute} />`
    //     }
    //   })
    // }
  })
  return style
}

export default getStylesXml
