import {
  clone,
  getIEVersion,
  isEmpty
} from '../utils'
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
import tripodImage from '../../img/krpano-img/logo-tripod.png'

class Krpano {
  constructor () {
    let _krpanoId = ''
    let _element = null
    let _xml = ''
    let _config = {
      autoRotateSettings: {
        active: true,
        rotateDuration: 200000,
        restartTime: 20000
      },
      gyroSettings: {
        active: false
      },
      krpanoSettings: {
        html5: 'webgl+only',
        webglsettings: { depth: true },
        passQueryParameters: true,
        lazyLoad: true,
        mwheel: true,
        focus: false
      }
    }
    this.krpanoEl = {}
    this.krpanoVrModeObj = {
      vrModeShouldHide: [],
      vrModeShouldShow: ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    }
    this.defaultFov = 120
    this.krpanoXOffset = 90
    this.vrThumbAth = 24
    this.krpanoLookAtH = 0
    this.krpanoCamera = {
      isCameraRotating: false,
      autoStartRotateTimer: null
    }

    this.generateKrpano = function (el, config) {
      _element = document.querySelector(el)
      if (!_element) {
        throw new Error('element not found')
      }
      const { embedpano, removepano } = window
      if (!(embedpano && removepano)) {
        throw new Error('krpano player is required')
      }

      _krpanoId = 'krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100)
      this.setConfig(config)
      initKrpanoVRMode.call(this)
      generateXml.call(this)
      this.embedPano()
      return this
    }

    this.setConfig = function (config) {
      if (!isEmpty(config)) {
        _config = config
      }
    }

    this.getConfig = function () {
      return clone(_config)
    }

    function generateXml () {
      const panoramas = this.getPanoramas()
      if (panoramas.length <= 0) {
        _xml = ''
        return
      }
      // console.log('getStylesXml', getStylesXml)
      const stylesXml = getStylesXml.call(this, panoramas, 0)
      const scenesXml = getScenesXml.call(this, panoramas, 0)
      const actionsXml = getActionsXml.call(this, panoramas, 0, _config.autoRotateSettings.rotateDuration)
      const logoTripodXml = getLogoTripodXml(tripodImage, 100, false)
      _xml = `<krpano onstart="startup();">
      ${webVRXml}
      ${gyroXml}
      ${gyroMessageXml}
      ${contextMenuXml}
      ${logoTripodXml}
      ${eventsXml}
      ${stylesXml}
      ${scenesXml}
      ${actionsXml}
      ${!getIEVersion()
        ? threeJsXml
        : ''}
      </krpano>`
    }

    this.embedPano = function (callback) {
      window.embedpano({
        id: _krpanoId,
        target: _element.id,
        xml: '',
        bgcolor: _config.krpanoSettings.bgcolor,
        wmode: _config.krpanoSettings.wmode,
        vars: _config.krpanoSettings.vars,
        initvars: _config.krpanoSettings.initvars,
        basepath: _config.krpanoSettings.basepath,
        mwheel: _config.krpanoSettings.mwheel,
        focus: _config.krpanoSettings.focus,
        consolelog: _config.krpanoSettings.consolelog,
        mobilescale: _config.krpanoSettings.mobilescale,
        fakedevice: _config.krpanoSettings.fakedevice,
        passQueryParameters: _config.krpanoSettings.passQueryParameters,
        webglsettings: _config.krpanoSettings.webglsettings,
        onready: (krpanoEl) => {
          handleKrpanoReady.call(this, krpanoEl, callback)
        },
        onerror (msg) {
          console.error('pano create error', msg)
        }
      })
    }

    function handleKrpanoReady (krpanoEl, callback) {
      this.krpanoEl = krpanoEl
      this.krpanoEl.hooks = getHooks(this)
      // console.log('pano created', this.krpanoEl.hooks)
      this.krpanoEl.call(`loadxml(${escape(_xml)})`)
      window.setTimeout(() => {
        this.krpanoEl.call(`first_panorama_ready(${_config.gyroSettings.active || false});`)
        if (_config.autoRotateSettings.active) {
          this.startAutoRotate()
          const stopAutoRotateHandler = () => {
            this.stopAutoRotate(true, _config.autoRotateSettings.restartTime)
          }
          window.addEventListener('mousedown', stopAutoRotateHandler)
          window.addEventListener('touchstart', stopAutoRotateHandler)
        }
        if (typeof callback === 'function' && callback instanceof Function) {
          callback()
        }
      }, 1500)
    }

    this.removePano = function () {
      const { removepano } = window

      if (this.krpanoEl) {
        removepano(_krpanoId)
        console.log('pano removed')
        delete this.krpanoEl
      }
    }

    function initKrpanoVRMode () {
      const panoramas = this.getPanoramas()
      for (let i = 0; i < panoramas.length; i++) {
        this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_${i}`)
        this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_text_${i}`)
      }
    }

    this.setKrpanoLookAtH = function (h) {
      this.krpanoLookAtH = h
    }

    this.startAutoRotate = function () {
      this.krpanoEl.call(`auto_rotate();`)
      this.krpanoCamera.isCameraRotating = true
    }

    this.stopAutoRotate = function (shouldAutoStartRotate = false, duration = 20000) {
      if (this.krpanoCamera.isCameraRotating === true) {
        this.krpanoEl.call(`stop_auto_rotate();`)
        this.krpanoCamera.isCameraRotating = false
      }
      if (this.krpanoCamera.autoStartRotateTimer !== null) {
        window.clearTimeout(this.krpanoCamera.autoStartRotateTimer)
      }
      if (shouldAutoStartRotate) {
        this.krpanoCamera.autoStartRotateTimer = window.setTimeout(() => {
          this.startAutoRotate()
        }, duration)
      } else {
        this.krpanoCamera.autoStartRotateTimer = null
      }
    }

    this.currentPanoramaChanged = function (newPanorama = {}, oldPanorama = {}) {
      if (!isEmpty(this.krpanoEl)) {
        this.krpanoEl.call(`prepare_change_scene(panorama_${newPanorama.objectId || ''}, ${newPanorama.objectId || ''});`)
      }
    }
  }
}

export default Krpano
