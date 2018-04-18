import {
  xmlUrlString
} from '@/common/helpers'

// size: 0% ~ 100%
function setLogoTripodSize (logoSize) {
  if (window.isNaN(logoSize) || logoSize <= 0) {
    return 0
  }
  return (logoSize / 100)
}

const getLogoTripodXml = (image, logoSize, showTop = false) => (
  `<hotspot name="logoTripod" keep="true" url="${xmlUrlString(image)}" ath="0" atv="90"
distorted="true" scale="${setLogoTripodSize(logoSize)}" enabled="false" />
<hotspot name="topLogoTripod" keep="true" url="${xmlUrlString(image)}" ath="0" atv="-90" distorted="true"
 scale="${setLogoTripodSize(logoSize)}" visible="${showTop}" enabled="false" />`
)

export default getLogoTripodXml
