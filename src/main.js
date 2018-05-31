import Vue from 'vue'
// import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import messages from '@/messages'
import store from '@/store'
// import api from '@/api/index'
// import server from '@/api/server'
import App from '@/App.vue'
// import Tooltip from 'hsy-vue-tooltip'
// import {
//   includes
// } from '@/assets/js/utils'
import { fakePanoCollection, fakePanoramas } from '@/api/resources'
import { DEFAULT_SETTING } from '@/api/constants'

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

  onTogglePanoramasList () {
    store.dispatch('togglePanoramasList')
  }
}

// Vue.config.productionTip = false
// Vue.config.debug = false
// Vue.config.devtools = false
// Vue.config.silent = true

if (process.env.NODE_ENV === 'development') {
  const vrViewer = new VRViewer()
  let config = {
    el: '#vrviewer-sdk',
    lang: 'zh-cn',
    setting: DEFAULT_SETTING,
    panoCollection: fakePanoCollection,
    panoramas: fakePanoramas
  }
  vrViewer.init(config)
}

window.VRViewer = new VRViewer()
export default VRViewer
