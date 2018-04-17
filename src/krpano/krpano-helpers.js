import { isFunction } from '@/common/utils'
import getHooks from '@/krpano/hooks'
import krpanoConstants from '@/krpano/krpano-constants'

// Note: all function should use by .call(this)
const krpanoHelpers = {
  embedPano (callback) {
    const el = this.getEl()
    if (!el) {
      throw new Error('element not found')
    }
    const basicSettings = this.getBasicSettings()
    const krpanoId = krpanoConstants.getKrpanoId()

    const handleKrpanoReady = (krpanoEl, callback) => {
      krpanoEl.hooks = getHooks(this)
      krpanoConstants.setKrpanoEl(krpanoEl)
      // console.log('pano created', this.krpanoEl.hooks)
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
          callback()
        }
      }, 1500)
    }

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
        handleKrpanoReady(krpanoEl, callback)
      },
      onerror (msg) {
        console.error('pano create error', msg)
      }
    })
  },

  setConfig (config = {}) {
    const {
      autoRotateSettings,
      gyroSettings,
      tripodSettings,
      basicSettings,
      loadingSettings,
      initViewSettings
    } = config
    if (autoRotateSettings && isFunction(this.setAutoRotateSettings)) {
      this.setAutoRotateSettings(autoRotateSettings)
    }
    if (gyroSettings && isFunction(this.setGyroSettings)) {
      this.setGyroSettings(gyroSettings)
    }
    if (tripodSettings && isFunction(this.setTripodSettings)) {
      this.setTripodSettings(tripodSettings)
    }
    if (basicSettings && isFunction(this.setBasicSettings)) {
      this.setBasicSettings(basicSettings)
    }
    if (loadingSettings && isFunction(this.setLoadingSettings)) {
      this.setLoadingSettings(loadingSettings)
    }
    if (initViewSettings && isFunction(this.setInitViewSettings)) {
      this.setInitViewSettings(initViewSettings)
    }
  },

  stopAutoRotateEvent () {
    const autoRotateSettings = this.getAutoRotateSettings()
    const keydownHandler = (e) => {
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
  }
}

export default krpanoHelpers
