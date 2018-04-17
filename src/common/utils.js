export const push = (array, value) => [...array, value]
export const unshift = (array, value) => [value, ...array]

export const clone = (obj) => {
  if (!obj && typeof obj !== 'object') {
    return
  }
  let newObj = obj.constructor === Object ? {} : []
  for (let key in obj) {
    newObj[key] = (obj[key] && typeof obj[key] === 'object') ? clone(obj[key]) : obj[key]
  }
  return newObj
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

export const isEqual = (a, b) => {
  const aKeys = Object.getOwnPropertyNames(a)
  const bKeys = Object.getOwnPropertyNames(b)
  if (aKeys.length !== bKeys.length) {
    return
  }
  return aKeys.every(key => a[key] === b[key])
}

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
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

export const loadImage = async (url = '', callback = () => {
}, onprogress = e => {
}, onerror = () => {
}) => {
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

// 計算 instr 在 string 裡出現幾次
export const countText = (string, instr) => {
  const re = new RegExp(instr, 'g')
  return (string.match(re) || []).length
}

export const isFunction = (callee) => {
  return typeof callee === 'function' && callee instanceof Function
}
