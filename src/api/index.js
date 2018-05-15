import Vue from 'vue'
import server from './server'

const api = {
  env: process.env.NODE_ENV
}
const timeout = { timeout: 300000 }
api.asyncRequest = async (urlEnd, type, payload = {}) => Vue.http[type](server.backendUrl + urlEnd, payload, timeout)
api.sendHeaders = (headerName, sessionToken) => {
  Vue.http.headers.common[headerName] = sessionToken
}
api.isPanoramaCubemapReady = async (panoramaId = '', filename = '') => {
  try {
    const IS_PANORAMA_CUBEMAP_URL = `${server.backendUrl}/v2/panoramas/${panoramaId}/cubemapReady?fileName=${filename}`
    const resp = await Vue.http.get(IS_PANORAMA_CUBEMAP_URL)
    // console.log('api.isPanoramaCubemapReady', resp)
    if (resp.status === 200 && resp.data) {
      return resp.data.cubeMapReady
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}
/* eslint-disable */
if (process.env.USE_GOOGLE_MAP) {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.async = true
    js.defer = true
    js.src = `https://maps.googleapis.com/maps/api/js?key=${server.googleApiKey}&libraries=places`
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'gmap'))
}
/* eslint-enable */

export default api
