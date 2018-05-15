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
import { fakeBuilding, fakePanoramas } from '@/api/resources'

// Vue.use(VueAxios, axios)
Vue.use(VueI18n)

class VRViewer {
  init (config) {
    console.log('config:', config)
    const i18n = new VueI18n({
      locale: config.lang,
      fallbackLocale: 'en',
      messages,
      silentTranslationWarn: true
    })
    this.initData(config)
    this.initConfig(config)
    const app = new Vue({
      el: config.el,
      store,
      i18n,
      render: h => h(App)
    }).$mount(config.el)
    console.log('vrviewer app:', app)
  }

  initData (config) {
    store.dispatch('importBuilding', config.panoCollection)
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

const vrViewer = new VRViewer()
vrViewer.init({
  el: '#vrviewer-sdk',
  lang: 'zh-cn',
  panoCollection: fakeBuilding,
  panoramas: fakePanoramas,
  setting: {
    krpanoSetting: {
      mwheel: true,
      focus: false
    }
  }
})

document.getElementById('switch-panorama-list').onclick = vrViewer.onTogglePanoramasList

window.VRViewer = VRViewer
export default VRViewer
