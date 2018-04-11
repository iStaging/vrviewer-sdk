import {
  clone,
  getIEVersion,
  isEmpty
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
import getHooks from './krpano-hooks'
import CommonViewer from '@/common/common-viewer'
import KrpanoAutoRotate from './extends/krpano-auto-rotate'
import KrpanoGyro from './extends/krpano-gyro'
import KrpanoTripod from './extends/krpano-tripod'
import KrpanoSettings from './extends/krpano-settings'
import classes from 'extends-classes'

class Krpano extends classes(CommonViewer, KrpanoAutoRotate, KrpanoGyro, KrpanoTripod, KrpanoSettings) {
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
    initKrpanoVRMode.call(this)
    generateXml.call(this)
    this.embedPano()

    function initKrpanoVRMode () {
      const panoramas = this.getPanoramas()
      for (let i = 0; i < panoramas.length; i++) {
        this.addVrModeShouldShow(`vr_panorama_${i}`)
        this.addVrModeShouldShow(`vr_panorama_text_${i}`)
      }
    }

    function generateXml () {
      const panoramas = this.getPanoramas()
      if (panoramas.length <= 0) {
        this.setKrpanoXml('')
        return
      }
      // console.log('getStylesXml', getStylesXml)
      const autoRotateSettings = this.getAutoRotateSettings()
      const tripodSettings = this.getTripodSettings()
      const stylesXml = getStylesXml.call(this, panoramas, 0)
      const scenesXml = getScenesXml.call(this, panoramas, 0)
      const actionsXml = getActionsXml.call(this, panoramas, 0, autoRotateSettings.rotateDuration)
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

    return this
  }

  setConfig (config = {}) {
    if (config.autoRotateSettings && this.setAutoRotateSettings instanceof Function) {
      this.setAutoRotateSettings(config.autoRotateSettings)
    }
    if (config.gyroSettings && this.setGyroSettings instanceof Function) {
      this.setGyroSettings(config.gyroSettings)
    }
    if (config.tripodSettings && this.setTripodSettings instanceof Function) {
      this.setTripodSettings(config.tripodSettings)
    }
    if (config.krpanoSettings && this.setKrpanoSettings instanceof Function) {
      this.setKrpanoSettings(config.krpanoSettings)
    }
  }

  embedPano (callback) {
    const el = this.getEl()
    if (!el) {
      throw new Error('element not found')
    }
    const krpanoSettings = this.getKrpanoSettings()
    const krpanoId = this.getKrpanoId()
    window.embedpano({
      id: krpanoId,
      target: el.id,
      xml: '',
      bgcolor: krpanoSettings.bgcolor,
      wmode: krpanoSettings.wmode,
      vars: krpanoSettings.vars,
      initvars: krpanoSettings.initvars,
      basepath: krpanoSettings.basepath,
      mwheel: krpanoSettings.mwheel,
      focus: krpanoSettings.focus,
      consolelog: krpanoSettings.consolelog,
      mobilescale: krpanoSettings.mobilescale,
      fakedevice: krpanoSettings.fakedevice,
      passQueryParameters: krpanoSettings.passQueryParameters,
      webglsettings: krpanoSettings.webglsettings,
      onready: (krpanoEl) => {
        handleKrpanoReady.call(this, krpanoEl, callback)
      },
      onerror (msg) {
        console.error('pano create error', msg)
      }
    })

    function handleKrpanoReady (krpanoEl, callback) {
      krpanoEl.hooks = getHooks(this)
      this.setKrpanoEl(krpanoEl)
      // console.log('pano created', this.krpanoEl.hooks)
      const xml = this.getKrpanoXml()
      this.getKrpanoEl().call(`loadxml(${escape(xml)})`)
      window.setTimeout(() => {
        const gyroSettings = this.getGyroSettings()
        const autoRotateSettings = this.getAutoRotateSettings()
        this.getKrpanoEl().call(`first_panorama_ready(${gyroSettings.active || false});`)
        if (autoRotateSettings.active) {
          this.startAutoRotate()
          const stopAutoRotateHandler = () => {
            this.stopAutoRotate(true, autoRotateSettings.restartTime)
          }
          window.addEventListener('mousedown', stopAutoRotateHandler)
          window.addEventListener('touchstart', stopAutoRotateHandler)
        }
        if (typeof callback === 'function' && callback instanceof Function) {
          callback()
        }
      }, 1500)
    }
  }

  removePano () {
    const { removepano } = window
    if (this.getKrpanoId && this.getKrpanoEl) {
      removepano(this.getKrpanoId())
      console.log('pano removed')
      this.setKrpanoEl({})
    }
  }

  currentPanoramaChanged (newPanorama = {}, oldPanorama = {}) {
    // fixme
    console.log(1)
    if (!isEmpty(this.getKrpanoEl)) {
      this.getKrpanoEl().call(`prepare_change_scene(panorama_${newPanorama.objectId || ''}, ${newPanorama.objectId || ''});`)
    }
  }
}

export default Krpano
