export const checkPanoramaFormat = (panorama) => {
  if (!panorama.panoramaId) {
    throw new Error('panoramaId is required')
  }
}

export const isRtl = (lang = '') => {
  const browserLang = lang.toLowerCase()
  switch (browserLang) {
    case 'ar': case 'ar-dz': case 'ar-bh': case 'ar-eg': case 'ar-iq': case 'ar-jo':
    case 'ar-kw': case 'ar-lb': case 'ar-ly': case 'ar-ma': case 'ar-om': case 'ar-qa':
    case 'ar-sa': case 'ar-sy': case 'ar-tn': case 'ar-ae': case 'ar-ye':
      console.log('is rtl', browserLang)
      return true
    default:
      return false
  }
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

export const coords3dTo2d = ({ x, y, z }) => {
  const r = Math.sqrt(x * x + y * y + z * z)
  const ath = -Math.atan2(x, z) * 180 / Math.PI + 180
  const atv = -Math.asin(y / r) * 180 / Math.PI
  return { ath, atv }
}
