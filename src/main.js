import Vue from 'vue'
// import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import locales from '@/locales'
import store from '@/store'
// import api from '@/api/index'
// import server from '@/api/server'
import App from '@/App.vue'
// import Tooltip from 'hsy-vue-tooltip'
// import {
//   includes
// } from '@/assets/js/utils'

// Vue.use(VueAxios, axios)
Vue.use(VueI18n)

class VRViewer {
  init (config) {
    console.log('config:', config)
    this.checkAframe()
    const i18n = new VueI18n({
      locale: config.lang,
      fallbackLocale: 'en',
      messages: locales,
      silentTranslationWarn: true
    })
    this.updateEvents()
    const app = new Vue({
      el: config.el,
      store,
      i18n,
      render: h => h(App)
    }).$mount(config.el)
    console.log('vreditor app:', app)
  }

  checkAframe () {
    if (typeof window === 'undefined' || !window.AFRAME) {
      throw new Error('You need to include aframe script or import it first. Use it before vreditor sdk.')
    }
  }

  updateEvents () {
    store.customEvents = {}
    store.customEvents.onSortPanoramas = this.onSortPanoramas
    store.customEvents.onDeletePanoramas = this.onDeletePanoramas
    store.customEvents.onCreatePanoramas = this.onCreatePanoramas
    store.customEvents.onUpdatePanorama = this.onUpdatePanorama
    store.customEvents.onSaveMarkerSuccess = this.onSaveMarkerSuccess
    store.customEvents.onSaveMarkerError = this.onSaveMarkerError
  }

  onSaveMarkerSuccess (data) {
    console.log('onSaveMarkerSuccess', data)
  }

  onSaveMarkerError (err) {
    console.log('onSaveMarkerError', err)
  }

  onSortPanoramas (data) {
    console.log('onSortPanoramas', data)
  }

  onDeletePanoramas (data) {
    console.log('onDeletePanoramas', data)
  }

  onCreatePanoramas (data) {
    console.log('onCreatePanoramas', data)
  }

  onUpdatePanorama (data) {
    console.log('onUpdatePanorama', data)
  }
  // panoCollection CRUD !?
  // panorama CRUD !?
  // marker CRUD !?

  // onUpload(data => { })
  // onSavePanorama(data => { })
  //
  // onCreateMarker(data => { })
  // onUpdateMarker(data => { })
  // onDeleteMarker(data => { })
}

// Vue.config.productionTip = false
// Vue.config.debug = false
// Vue.config.devtools = false
// Vue.config.silent = true

const vrEditor = new VRViewer()
vrEditor.init({
  el: '#vreditor-sdk',
  lang: 'zh-cn'
})

vrEditor.onSaveMarker = (data) => {
  console.log('onSaveMarker', data)
}

vrEditor.onSaveMarkerSuccess = (data) => {
  console.log('onSaveMarkerSuccess', data)
}

vrEditor.onSortPanoramas = (data) => {
  console.log('onSortPanoramas', data)
}

vrEditor.onDeletePanoramas = (data) => {
  console.log('onDeletePanoramas', data)
}

vrEditor.onCreatePanoramas = (data) => {
  console.log('onCreatePanoramas', data)
}

vrEditor.onUpdatePanorama = (data) => {
  console.log('onUpdatePanorama', data)
}

vrEditor.updateEvents()

window.VRViewer = VRViewer
export default VRViewer
