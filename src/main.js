import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import messages from '@/messages'
import store from '@/store'
import App from '@/App.vue'
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
    this.checkBrowser()
    // need krpano first
    this.checkKrpano()
    i18n = new VueI18n({
      locale: config.lang,
      fallbackLocale: 'en',
      messages,
      silentTranslationWarn: true
    })
    this.initData(config)
    this.initConfig(config)
    this.updateEvents()
    this.app = new Vue({
      el: config.el,
      store,
      i18n,
      render: h => h(App)
    }).$mount()
    // console.log('vrviewer app:', this.app)
  }

  checkBrowser () {
    // if (getBrowserType() === 'ie' && getIEVersion() !== 0 && getIEVersion() <= 12) {
    // throw new Error('Your browser is not supported. Please use the modern browser.')
    // }
  }

  checkKrpano () {
    if (typeof window === 'undefined' || !window.krpanoJS) {
      throw new Error('You need to include krpano script or import it first. Use it before vreditor sdk.')
    }
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
    store.dispatch('importPanoCollection', clone(config.panoCollection))
    store.dispatch('importPanoramas', clone(config.panoCollection.panoramas))
  }

  initConfig (config) {
    store.dispatch('importSetting', config.setting)
  }

  updateEvents () {
    store.customEvents = {}
    store.customEvents.onMarkerClick = this.onMarkerClick
  }

  onMarkerClick (data) {
    console.log('onMarkerClick', data)
  }

  toggleFloorplan () {
    store.dispatch('toggleFloorplan')
  }

  enterFullscreen () {
    store.dispatch('enterFullscreen')
  }

  exitFullscreen () {
    store.dispatch('exitFullscreen')
  }

  togglePanoramasList () {
    store.dispatch('togglePanoramasList')
  }

  toggleShare () {
    store.dispatch('toggleShare')
  }

  // start / stop auto rotation trigger !?
}

const isProductionMode = process.env.NODE_ENV === 'production'
if (isProductionMode) {
  Vue.config.productionTip = false
  Vue.config.debug = false
  Vue.config.devtools = false
  Vue.config.silent = true
  // remove all console in production
  console.log = function () {}
  console.warn(`You are using iStaging vreditor sdk ${process.env.VERSION}`)
} else {
  Vue.config.productionTip = true
  Vue.config.debug = true
  Vue.config.devtools = true
  Vue.config.silent = false
}

if (!isProductionMode) {
  const url = 'https://evs-test-api.istaging.com.cn'
  const collectionId = 'pc_e99fd45d-8efc-4289-9f5d-c230ac2ac98f'
  axios({
    method: 'get',
    url: `${url}/api/v1/openlink/${collectionId}`
  }).then(resp => {
    const panoCollection = resp.data
    const vrViewer = new VRViewer()
    let config = {
      el: '#vrviewer-sdk',
      lang: 'zh-cn',
      setting: DEFAULT_SETTING,
      panoCollection
    }
    vrViewer.init(config)
  }).catch(error => {
    console.log(error)
  })
}

window.VRViewer = new VRViewer()
export default VRViewer
