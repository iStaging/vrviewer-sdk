import {
  clone,
  getIEVersion,
  isEmpty, isFunction
} from '@/common/utils'
import {
  webVRXml,
  gyroXml,
  threeJsXml,
  contextMenuXml,
  gyroMessageXml
} from './xml/plugins'
import getStylesXml from './xml/styles'
import getLogoTripodXml from './xml/tripod'
import eventsXml from './xml/events'
import getScenesXml from './xml/scenes'
import getActionsXml from './xml/actions'
import getHooks from './hooks'
import CommonViewer from '@/common/common-viewer'
import KrpanoAutoRotate from './extends/auto-rotate'
import KrpanoGyro from './extends/gyro'
import KrpanoTripod from './extends/tripod'
import KrpanoBasic from './extends/basic'
import KrpanoInitView from './extends/init-view'
import KrpanoLoadingPanorama from './extends/loading-panorama'
import classes from 'extends-classes'

class Krpano extends classes(CommonViewer, KrpanoAutoRotate, KrpanoGyro, KrpanoTripod, KrpanoBasic, KrpanoInitView, KrpanoLoadingPanorama) {
  constructor () {
    super(...arguments)
    let _krpanoId = ''
    let _xml = ''
    let _krpanoEl = {}
    let _krpanoVrModeObj = {
      vrModeShouldHide: [],
      vrModeShouldShow: ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    }
    let _krpanoLookAtH = 0

    this.setKrpanoId = (krpanoId) => {
      _krpanoId = krpanoId
    }

    this.setKrpanoXml = (xml) => {
      _xml = xml
    }

    this.setKrpanoEl = (krpanoEl) => {
      _krpanoEl = krpanoEl
    }

    this.addVrModeShouldHide = (item) => {
      _krpanoVrModeObj.vrModeShouldHide.push(item)
    }

    this.addVrModeShouldShow = (item) => {
      _krpanoVrModeObj.vrModeShouldShow.push(item)
    }

    this.setKrpanoLookAtH = (h) => {
      _krpanoLookAtH = h
    }

    this.getKrpanoId = () => _krpanoId
    this.getKrpanoXml = () => _xml
    this.getKrpanoEl = () => _krpanoEl
    this.getKrpanoVrModeObj = () => clone(_krpanoVrModeObj)
    this.getKrpanoLookAtH = () => _krpanoLookAtH
    this.getDefaultFov = () => 120
    this.getKrpanoXOffset = () => 90
    this.getVrThumbAth = () => 24
  }

  generateKrpano (config) {
    const { embedpano, removepano } = window
    if (!(embedpano && removepano)) {
      throw new Error('krpano player is required')
    }
    this.setKrpanoId('krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100))
    this.setConfig(config)
    const panoramas = this.getPanoramas()

    const initKrpanoVRMode = () => {
      for (let i = 0; i < panoramas.length; i++) {
        this.addVrModeShouldShow(`vr_panorama_${i}`)
        this.addVrModeShouldShow(`vr_panorama_text_${i}`)
      }
    }

    const generateXml = () => {
      if (panoramas.length <= 0) {
        this.setKrpanoXml('')
        return
      }
      const tripodSettings = this.getTripodSettings()
      const stylesXml = getStylesXml.call(this, panoramas, 0)
      const scenesXml = getScenesXml.call(this, panoramas, 0)
      const actionsXml = getActionsXml.call(this, panoramas, 0)
      const logoTripodXml = getLogoTripodXml(tripodSettings.image, tripodSettings.size, panoramas[0].isTopLogo)
      this.setKrpanoXml(`<krpano onstart="startup();">
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
    }

    initKrpanoVRMode()
    generateXml()
    this.embedPano()

    return this
  }

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
  }

  embedPano (callback) {
    const el = this.getEl()
    if (!el) {
      throw new Error('element not found')
    }
    const basicSettings = this.getBasicSettings()
    const krpanoId = this.getKrpanoId()

    const handleKrpanoReady = (krpanoEl, callback) => {
      krpanoEl.hooks = getHooks(this)
      this.setKrpanoEl(krpanoEl)
      // console.log('pano created', this.krpanoEl.hooks)
      const xml = this.getKrpanoXml()
      krpanoEl.call(`loadxml(${escape(xml)})`)
      window.setTimeout(() => {
        const gyroSettings = this.getGyroSettings()
        const autoRotateSettings = this.getAutoRotateSettings()
        krpanoEl.call(`first_panorama_ready(${gyroSettings.active || false});`)
        if (autoRotateSettings.active) {
          this.startAutoRotate()
          this.stopAutoRotateEvent().addEvent()
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
  }

  removePano () {
    const { removepano } = window
    if (this.getKrpanoId && this.getKrpanoEl) {
      const krpanoId = this.getKrpanoId()
      removepano(krpanoId)
      console.log('pano removed')
      this.setKrpanoEl({})
      this.stopAutoRotateEvent().removeEvent()
    }
  }

  changePanorama (panoramaId = '') {
    this.selectPanorama(panoramaId)
    if (!isEmpty(this.getKrpanoEl)) {
      const krpanoEl = this.getKrpanoEl()
      krpanoEl.call(`prepare_change_scene(panorama_${panoramaId || ''}, ${panoramaId || ''});`)
    }
  }

  toggleGyro (bool) {
    const krpanoEl = this.getKrpanoEl()
    if (bool) {
      krpanoEl.krpanoEl.call('start_gyro();')
    } else {
      krpanoEl.krpanoEl.call('stop_gyro();')
    }
  }

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

export default Krpano
