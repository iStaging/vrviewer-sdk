import './prototype'

export const isEmpty = (value) => {
  if (!value || value === undefined) {
    return true
  } else if (value.constructor === Object) {
    return Object.keys(value).length === 0
  } else if (value.constructor === Array) {
    return value.length === 0
  }
}

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const isIOS = () => {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
}

export const isIframe = () => {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

export const includes = (array, value) => {
  return array.indexOf(value) > -1
}

export const isPortrait = () => {
  return window.innerHeight > window.innerWidth
}

export const enterFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) // eslint-disable-line
  }
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

export const loadImage = async (url = '', callback = () => {}, onprogress = e => {}, onerror = () => {}) => {
  if (typeof url === 'string' || url instanceof String) {
    try {
      const xmlHttp = new XMLHttpRequest() // eslint-disable-line
      xmlHttp.open('GET', url, true)
      xmlHttp.responseType = 'arraybuffer'
      xmlHttp.onload = () => {
        callback()
      }
      xmlHttp.onprogress = e => {
        onprogress(Math.ceil(e.loaded / e.total * 100))
      }
      xmlHttp.onerror = () => {
        onerror()
      }
      xmlHttp.send()
    } catch (e) {
    }
  } else if ((typeof url === 'object' || url instanceof Object) && url.length > 0) {
    url = url.filter(uniUrl => uniUrl)
    const loadAllImages = url.map(uniUrl => {
      return new Promise((resolve, reject) => {
        try {
          const xmlHttp = new XMLHttpRequest() // eslint-disable-line
          xmlHttp.open('GET', uniUrl, true)
          xmlHttp.responseType = 'arraybuffer'
          xmlHttp.onload = () => {
            resolve()
          }
          xmlHttp.onerror = () => {
            onerror()
            reject(new Error('image load error'))
          }
          xmlHttp.send()
        } catch (error) {
          reject(new Error(error))
        }
      })
    })
    await Promise.all(loadAllImages).then(() => {
      callback()
    }).catch(error => {
      console.error(error)
    })
  }
}

export const getFilename = (string) => {
  if (!string) {
    return string
  }
  /* eslint-disable */
  const match = string.match(/([^\/]+)\.\w+(?=\?|$)/)
  return match ? match[0] : ''
  /* eslint-enable */
}

// 計算 instr 在 string 裡出現幾次
export const countText = (string, instr) => {
  const re = new RegExp(instr, 'g')
  return (string.match(re) || []).length
}

// obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
export const getPath = (obj, is) => {
  return multiIndex(obj, is.split('.'))
}

// obj,['1','2','3'] -> ((obj['1'])['2'])['3']
export const multiIndex = (obj, is) => {
  return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj
}

export const sort = (array = [], key = '') => {
  array.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1
    } else if (a[key] < b[key]) {
      return -1
    }
    return 0
  })
}

export const completeAssign = (target, ...sources) => {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
      return descriptors
    }, {})
    // Object.assign 預設會複製可列舉的Symbols。
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym)
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor
      }
    })
    Object.defineProperties(target, descriptors)
  })
  return target
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

export const isEqual = (a, b) => {
  let aKeys
  if (a) {
    aKeys = Object.getOwnPropertyNames(a)
  }
  let bKeys
  if (b) {
    bKeys = Object.getOwnPropertyNames(b)
  }
  if (aKeys && bKeys) {
    if (aKeys.length !== bKeys.length) {
      return
    }
    return aKeys.every(key => a[key] === b[key])
  }
  return aKeys === bKeys
}

export const isObject = (obj = {}) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const addParameter = (url = location.href, param) => {
  url += (url.split('?')[1] ? '&' : '?') + param
  return url
}

export const xhr = (url, type = 'get') => {
  return new Promise((resolve, reject) => {
    const XMLRequest = new XMLHttpRequest() // eslint-disable-line
    XMLRequest.open(type, url, true)
    XMLRequest.send()
    XMLRequest.onload = resp => {
      if (XMLRequest.status === 200) {
        resolve(resp)
      } else {
        reject(resp)
      }
    }
  })
}
