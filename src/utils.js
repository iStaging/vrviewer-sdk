export const clone = (object) => {
  return JSON.parse(JSON.stringify(object))
}

export const isEmpty = (value) => {
  if (!value || value === undefined) {
    return true
  } else if (value.constructor === Object) {
    return Object.keys(value).length === 0
  } else if (value.constructor === Array) {
    return value.length === 0
  }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export const getIEVersion = () => {
  const ua = window.navigator.userAgent
  const msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  const trident = ua.indexOf('Trident/')
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  const edge = ua.indexOf('Edge/')
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return false
}
