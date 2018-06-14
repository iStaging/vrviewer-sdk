import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import messages from '@/messages'
import store from '@/store'
import App from '@/App.vue'
import { fakePanoCollection, fakePanoramas } from '@/api/resources'
import { DEFAULT_SETTING } from '@/api/constants'
import { clone } from '@/api/utils'

// Vue.use(VueAxios, axios)
Vue.use(VueI18n)
export let i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  silentTranslationWarn: true
})
class VRViewer {
  constructor () {
    this.app = null
  }

  init (config) {
    // console.log('config:', config)
    i18n = new VueI18n({
      locale: config.lang,
      fallbackLocale: 'en',
      messages,
      silentTranslationWarn: true
    })
    this.initData(config)
    this.initConfig(config)
    this.app = new Vue({
      el: config.el,
      store,
      i18n,
      render: h => h(App)
    }).$mount()
    // console.log('vrviewer app:', this.app)
  }

  destroy () {
    if (this.app) {
      this.app.$destroy()
      this.app.$el.childNodes.forEach(childNode => {
        childNode.remove()
      })
      this.app = null
    }
  }

  initData (config) {
    if (typeof store.resetState === 'function') {
      store.resetState()
    }
    store.dispatch('importPanoCollection', config.panoCollection)
    store.dispatch('importPanoramas', config.panoramas)
  }

  initConfig (config) {
    store.dispatch('importSetting', config.setting)
  }

  onToggleFloorplan () {
    store.dispatch('toggleFloorplan')
  }

  onEnterFullscreen () {
    store.dispatch('enterFullscreen')
  }

  onExitFullscreen () {
    store.dispatch('exitFullscreen')
  }

  onTogglePanoramasList () {
    store.dispatch('togglePanoramasList')
  }

  onToggleShare () {
    store.dispatch('toggleShare')
  }
}

// Vue.config.productionTip = false
// Vue.config.debug = false
// Vue.config.devtools = false
// Vue.config.silent = true

if (process.env.NODE_ENV === 'development') {
  // const tenant = {
  //   username: 'benson@test1',
  //   password: '000000'
  // }
  // axios({
  //   method: 'post',
  //   url: `${url}/api/v1/tenant/login`,
  //   data: tenant
  // }).then(resp => {
  //   // don't know why not work
  //   // axios.defaults.headers.common['tenant-token'] = resp.data.tenantToken
  //   console.log('axios: ', axios.defaults)
  // }).catch(error => {
  //   console.log(error)
  // })
  axios.defaults.headers.common['tenant-token'] = 'S6nfuaEGytl0GIVopHjbCxv4KFaEq07r'
  let panoramaMarkersReadyCounter = 0
  fakePanoramas.forEach(async panorama => {
    panorama.markers = await fetchMarkers(panorama)
    panoramaMarkersReadyCounter += 1
    if (panoramaMarkersReadyCounter >= fakePanoramas.length) { // when all image thumbnail loaded, do action here
      const vrViewer = new VRViewer()
      let config = {
        el: '#vrviewer-sdk',
        lang: 'zh-cn',
        setting: DEFAULT_SETTING,
        panoCollection: clone(fakePanoCollection),
        panoramas: clone(fakePanoramas)
      }
      vrViewer.init(config)
    }
  })
}

async function fetchMarkers (panorama) {
  return new Promise((resolve, reject) => {
    const url = 'http://evs.c6bfd9b3f17f94cb18b5f72740b1bc300.cn-hangzhou.alicontainer.com'
    axios({
      method: 'get',
      url: `${url}/api/v1/marker?panoramaId=${panorama.id}`
    }).then(resp => {
      const markers = resp.data
      console.log('markers', markers)
      resolve(markers)
    }).catch(err => {
      console.error('fetchMarkers failed', err)
      resolve([])
    })
  })
}

window.VRViewer = new VRViewer()
export default VRViewer
