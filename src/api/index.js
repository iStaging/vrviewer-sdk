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
