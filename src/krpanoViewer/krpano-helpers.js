import {
  getIEVersion,
  isEmpty,
  isFunction
} from '@/common/utils'
import getHooks from '@/krpanoViewer/hooks'
import krpanoConstants from '@/krpanoViewer/krpano-constants'
import getScenesXml from '@/krpanoViewer/xml/scenes'
import getActionsXml from '@/krpanoViewer/xml/actions'
import getLogoTripodXml from '@/krpanoViewer/xml/tripod'
import { contextMenuXml, gyroMessageXml, gyroXml, threeJsXml, webVRXml } from '@/krpanoViewer/xml/plugins'
import getStylesXml from '@/krpanoViewer/xml/styles'
import eventsXml from '@/krpanoViewer/xml/events'

const krpanoHelpers = {
  embedPano (callback) { // should .call(this)
    const el = this.getEl()
    if (!el) {
      throw new Error('element not found')
    }
    const basicSettings = this.getBasicSettings()
    const krpanoId = krpanoConstants.getKrpanoId()
    window.embedpano({
      id: krpanoId,
      target: el.id,
      xml: '',
      bgcolor: basicSettings.bgcolor,
      wmode: basicSettings.wmode,
      vars: basicSettings.vars,
      initvars: basicSettings.initvars,
      basepath: basicSettings.basepath,
      mwheel: basicSettings.mwheel,
      focus: basicSettings.focus,
      consolelog: basicSettings.consolelog,
      mobilescale: basicSettings.mobilescale,
      fakedevice: basicSettings.fakedevice,
      lazyLoad: true,
      html5: 'webgl+only',
      webglsettings: { depth: true },
      passQueryParameters: true,
      onready: (krpanoEl) => {
        krpanoHelpers.handleKrpanoReady.call(this, krpanoEl, callback)
      },
      onerror (msg) {
        console.error('pano create error', msg)
      }
    })
  },

  handleKrpanoReady (krpanoEl, callback) { // should .call(this)
    krpanoConstants.setKrpanoEl(krpanoEl)
    krpanoEl.hooks = getHooks(this)
    const xml = krpanoConstants.getKrpanoXml()
    krpanoEl.call(`loadxml(${escape(xml)})`)
    window.setTimeout(() => {
      const gyroSettings = this.getGyroSettings()
      const autoRotateSettings = this.getAutoRotateSettings()
      krpanoEl.call(`first_panorama_ready(${gyroSettings.active || false});`)
      if (autoRotateSettings.active) {
        this.startAutoRotate()
        krpanoHelpers.stopAutoRotateEvent.call(this).addEvent()
      }
      if (isFunction(callback)) {
        callback(krpanoEl)
      }
    }, 1500)
  },

  setConfig (config = {}) { // should .call(this)
    const {
      autoRotateSettings,
      gyroSettings,
      tripodSettings,
      basicSettings,
      loadingSettings,
      initViewSettings
    } = config
    if (!isEmpty(autoRotateSettings) && isFunction(this.setAutoRotateSettings)) {
      this.setAutoRotateSettings(autoRotateSettings)
    }
    if (!isEmpty(gyroSettings) && isFunction(this.setGyroSettings)) {
      this.setGyroSettings(gyroSettings)
    }
    if (!isEmpty(tripodSettings) && isFunction(this.setTripodSettings)) {
      this.setTripodSettings(tripodSettings)
    }
    if (!isEmpty(basicSettings) && isFunction(this.setBasicSettings)) {
      this.setBasicSettings(basicSettings)
    }
    if (!isEmpty(loadingSettings) && isFunction(this.setLoadingSettings)) {
      this.setLoadingSettings(loadingSettings)
    }
    if (!isEmpty(initViewSettings) && isFunction(this.setInitViewSettings)) {
      this.setInitViewSettings(initViewSettings)
    }
  },

  stopAutoRotateEvent () { // should .call(this)
    const autoRotateSettings = this.getAutoRotateSettings()
    const keydownHandler = e => {
      if (e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40) {
        this.stopAutoRotate(true, autoRotateSettings.restartTime)
      }
    }
    const stopAutoRotateHandler = () => {
      this.stopAutoRotate(true, autoRotateSettings.restartTime)
    }
    return {
      addEvent () {
        window.addEventListener('keydown', keydownHandler)
        window.addEventListener('mousedown', stopAutoRotateHandler)
        window.addEventListener('touchstart', stopAutoRotateHandler)
      },
      removeEvent () {
        window.removeEventListener('keydown', keydownHandler)
        window.removeEventListener('mousedown', stopAutoRotateHandler)
        window.removeEventListener('touchstart', stopAutoRotateHandler)
      }
    }
  },

  generateXml () {
    const panoramas = this.getPanoramas()
    if (panoramas.length <= 0) {
      krpanoConstants.setKrpanoXml('')
      return
    }
    const tripodSettings = this.getTripodSettings()
    const stylesXml = getStylesXml.call(this, panoramas, 0)
    const scenesXml = getScenesXml.call(this, panoramas, 0)
    const actionsXml = getActionsXml.call(this, panoramas, 0)
    const logoTripodXml = getLogoTripodXml(tripodSettings.image, tripodSettings.size, panoramas[0].isTopLogo)
    krpanoConstants.setKrpanoXml(`<krpano onstart="startup();">
      ${webVRXml}
      ${gyroXml}
      ${gyroMessageXml}
      ${contextMenuXml}
      ${logoTripodXml}
      ${eventsXml}
      ${stylesXml}
      ${scenesXml}
      ${actionsXml}
      ${!getIEVersion() ? threeJsXml : ''}
    </krpano>`)
  },

  checkInit () {
    const krpanoEl = krpanoConstants.getKrpanoEl()
    if (isEmpty(krpanoEl)) {
      throw new Error('You need to call generateKrpano first.')
    }
  },

  checkKrpano () {
    if (typeof window === 'undefined' || !window.krpanoJS) {
      throw new Error('You need to include krpanoJS script or import it first. Use it before vrviewer.')
    }
  }
}

export default krpanoHelpers
