import {
  isEmpty,
  xhr
} from './utils'

export const getBrowserLang = () => {
  return navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage)
}

export const getLocale = (lang = '') => {
  let selectedLang = ''
  lang = lang && lang.toLowerCase()
  switch (lang) {
    case 'zh':
    case 'zh-tw':
    case 'zh-hk':
      selectedLang = 'zh-tw'
      break
    case 'zh-cn':
    case 'zh-sg':
      selectedLang = 'zh-cn'
      break
    case 'fr': case 'fr-be': case 'fr-ca': case 'fr-ch': case 'fr-lu': case 'fr-fr':
      selectedLang = 'fr'
      break
    case 'de': case 'de-at': case 'de-ch': case 'de-de': case 'de-gr': case 'de-lu':
      selectedLang = 'de'
      break
    case 'nl': case 'nl-be': case 'nl-nl':
      selectedLang = 'nl'
      break
    case 'ja':
      selectedLang = 'ja'
      break
    // case 'ko':
    // selectedLang = 'ko'
    // break
    case 'ar': case 'ar-dz': case 'ar-bh': case 'ar-eg': case 'ar-iq': case 'ar-jo':
    case 'ar-kw': case 'ar-lb': case 'ar-ly': case 'ar-ma': case 'ar-om': case 'ar-qa':
    case 'ar-sa': case 'ar-sy': case 'ar-tn': case 'ar-ae': case 'ar-ye':
      selectedLang = 'ar'
      break
    case 'en': case 'en-zu': case 'en-bz': case 'en-ca': case 'en-ie': case 'en-jm':
    case 'en-nz': case 'en-ph': case 'en-za': case 'en-tt': case 'en-gb': case 'en-us':
    case 'en-zw':
    default:
      selectedLang = 'en'
      break
  }
  return selectedLang
}

export const locale = () => {
  const browserLang = getBrowserLang()
  // const browserLang = 'ar' // fake locale
  return getLocale(browserLang)
}

export const isRtl = (lang = locale()) => {
  const browserLang = lang.toLowerCase()
  switch (browserLang) {
    case 'ar':
      console.log('is rtl', browserLang)
      return true
    default:
      return false
  }
}

export const iStagingUrl = 'https://www.istaging.com'
export const krpanoHelpers = {
  preloadThreeJsImages (allPanoramas) {
    /* eslint-disable */
    if (!THREE) {
      console.log('no THREE.js loaded')
      return
    }
    THREE.ImageUtils.crossOrigin = ''
    window.threeThumbnails = new Array(allPanoramas.length)
    allPanoramas.forEach((panorama, index) => {
      if (panorama.thumbnail) {
        window.threeThumbnails[index] = panorama.thumbnail
        THREE.ImageUtils.loadTexture(panorama.thumbnail)
      }
    })
    /* eslint-enable */
  },

  adjustKrpanoRendering (krpanoEl = null) {
    if (!krpanoEl) {
      return
    }
    krpanoEl.set('events[__threejs__].onviewchange', () => {
      // adjust krpano rendering
      if (krpanoEl.get('view.fisheye') !== 0.0) {
        // disable the fisheye distortion, ThreeJS objects can't be rendered with it
        krpanoEl.set('view.fisheye', 0.0)
      }
    }) // correct krpano view settings before the rendering
  }
}

export const genMarkerPosition = (deg) => {
  const position = {}
  const rad = deg * (Math.PI / 180)
  const x = -Math.sin(rad)
  const z = -Math.cos(rad)
  const y = Math.sin(rad)
  position.x = x * 200
  position.y = y * 200
  position.z = z * 200
  return position
}

export const coords3dTo2d = ({ x, y, z }) => {
  const r = Math.sqrt(x * x + y * y + z * z)
  const ath = -Math.atan2(x, z) * 180 / Math.PI + 180
  const atv = -Math.asin(y / r) * 180 / Math.PI
  return { ath, atv }
}

export const coords2dTo3d = ({ ath, atv }) => {
  const x = -genMarkerPosition(ath).x
  const y = -genMarkerPosition(atv).y
  const z = genMarkerPosition(ath).z
  return { x, y, z }
}

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'devus' ||
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'testus' ||
    process.env.NODE_ENV === 'test'
}

// if s contains control character, it will let krpano broken
export const xmlUrlString = (s = '') => {
  s = s.replace(/&/g, '&amp;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/'/g, '&apos;')
  s = s.replace(/"/g, '&quot;')
  return s
}

export const xmlString = (s = '') => {
  if (!s) {
    return s
  }
  s = window.escape(s)
  s = s.replace(/%3A/g, ':')
  s = s.replace(/%23/g, '#')
  s = s.replace(/%25/g, '%')
  s = s.replace(/%3F/g, '?')
  s = s.replace(/%26/g, '&amp;')
  s = s.replace(/%3D/g, '=')
  s = s.replace(/%5B/g, '[')
  s = s.replace(/%5D/g, ']')
  return s
}

export const krpanoEnterString = (string = '') => {
  return string.replace(/\n/g, '[br]')
}

export const krpanoAutoBlank = (string = '', n = 15, onlySingleLine = false) => { // n = max Latin-1 text in one line
  let stringAfterBlank
  stringAfterBlank = string.replace(/\[br\]/g, ' [br]')
  stringAfterBlank = stringAfterBlank.split(/[\n\t ]/g)
  stringAfterBlank = stringAfterBlank.map(word => {
    if (lengthInUtf8Bytes(word) >= (n * 2)) {
      for (let i = n; i <= word.length; i += (n + ' [br]'.length)) {
        if (onlySingleLine) {
          word = word.splice(i, 0, '... [br]')
        } else {
          word = word.splice(i, 0, ' [br]')
        }
      }
    }
    return word
  })
  stringAfterBlank = stringAfterBlank.join(' ')
  stringAfterBlank = stringAfterBlank.replace(/ \[br\]/g, '[br]')
  return stringAfterBlank
}

export const lengthInUtf8Bytes = (string = '') => {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  const m = encodeURIComponent(string).match(/%[89ABab]/g)
  return string.length + (m ? (m.length - 1) : 0)
}

export const setCorrectRotation = (value) => {
  // make rotation into -180 ~ 180
  while (value < -180 || value > 180) {
    if (value < -180) {
      value += 360
    }
    if (value > 180) {
      value -= 360
    }
  }

  return value
}

export const getParameterString = (routeQuery = {}) => {
  let parameter = ''
  const queries = Object.keys(routeQuery)
  if (queries && queries.length) {
    queries.forEach((query, index) => {
      index === 0
        ? parameter += '?'
        : parameter += '&'

      parameter += `${query}=${routeQuery[query]}`
    })
  }

  return parameter
}

export const imageIEHack = async (object = {}, keys = []) => {
  if (!isEmpty(object)) {
    await Promise.all(
      keys.map(async key => {
        if (object[key] && object[key].indexOf('getresizemapping') > -1) {
          const resp = await xhr(object[key], 'get')
          object[key] = JSON.parse(resp.target.response).url
          return resp
        }
      })
    )
  }
}

export const convertIndexFromUrlToArray = (index = 1, limit = Infinity) => {
  index = parseInt(index) // for user, panoramas is start from 1, not 0
  if (isNaN(index) || index <= 0) {
    index = 1
  }
  if (index > limit) {
    index = 0
  } else {
    index -= 1
  }
  return index
}

export const convertIndexFromArrayToUrl = (index = 0, limit = Infinity) => {
  index = parseInt(index) // for user, panoramas is start from 1, not 0
  if (isNaN(index) || index < 0) {
    index = 0
  }
  if (index > limit) {
    index = 1
  } else {
    index += 1
  }
  return index
}

export const getCorrectRotation = (value) => {
  // make rotation into -180 ~ 180
  while (value < -180 || value > 180) {
    if (value < -180) {
      value += 360
    }
    if (value > 180) {
      value -= 360
    }
  }
  return value
}

export const hotspotIcon = (marker = {}, useCustomIcon = false) => {
  if (useCustomIcon) {
    return `markerCustomIcon_${marker.id}`
  } else {
    switch (marker.type) {
      case 'point':
        switch (marker.iconType) {
          case 'leftArrow':
            return 'leftArrow'
          case 'leftFrontArrow':
            return 'leftFrontArrow'
          case 'rightFrontArrow':
            return 'rightFrontArrow'
          case 'rightArrow':
            return 'rightArrow'
          case 'frontArrow':
            return 'frontArrow'
          case 'point':
          default:
            return 'point'
        }
      case 'memo':
        switch (marker.iconType) {
          case 'memo':
          default:
            return 'memo'
        }
      case 'tag':
        switch (marker.iconType) {
          case 'tag':
          default:
            return 'tag'
        }
      case 'customizedTag':
        switch (marker.iconType) {
          case 'coupon':
            return 'coupon'
          case 'gift':
            return 'gift'
          case 'shopping':
            return 'shopping'
          case 'stopwatch':
          default:
            return 'stopwatch'
        }
      case 'popup':
        switch (marker.iconType) {
          case 'link':
            return 'link'
          case 'video':
          default:
            return 'video'
        }
      default:
    }
  }
}
