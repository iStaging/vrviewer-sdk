import {
  getIEVersion
} from './utils'
import {
  webVRXml,
  gyroXml,
  threeJsXml,
  contextMenuXml,
  gyroMessageXml
} from './krpano-xml/plugins'
import {
  getStylesXml
} from './krpano-xml/styles'
import {
  getLogoTripodXml
} from './krpano-xml/tripod'
import {
  eventsXml
} from './krpano-xml/events'
import {
  getScenesXml
} from './krpano-xml/scenes'
import {
  getActionsXml
} from './krpano-xml/actions'
import {
  getHooks
} from './krpano-hooks'
import tripodImage from '../img/krpano-img/logo-tripod.png'

class Krpano {
  constructor () {
    let _krpanoId = ''
    let _element = null
    let _xml = ''
    let _hooks = getHooks(this)
    this.config = {
      krpanoSettings: {}
    }
    this.krpanoEl = {}
    this.krpanoVrModeObj = {
      vrModeShouldHide: [],
      vrModeShouldShow: ['vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r']
    }
    this.defaultFov = 120
    this.krpanoXOffset = 90
    this.vrThumbAth = 24
    let _krpanoLookAtH = 0
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
      this.initKrpanoVRMode()
      this.generateXml()
      this.embedPano()
      return this
    }

    this.setConfig = function (config) {
      this.config = config
    }

    this.generateXml = function () {
      const panoramas = this.getPanoramas()
      if (panoramas.length <= 0) {
        _xml = ''
        return
      }
      const stylesXml = getStylesXml.call(this, panoramas, 0)
      const scenesXml = getScenesXml.call(this, panoramas, 0)
      const actionsXml = getActionsXml.call(this, panoramas, 0)
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

    this.embedPano = function () {
      window.embedpano({
        id: _krpanoId,
        target: _element.id,
        xml: '',
        bgcolor: this.config.krpanoSettings.bgcolor,
        wmode: this.config.krpanoSettings.wmode,
        vars: this.config.krpanoSettings.vars,
        initvars: this.config.krpanoSettings.initvars,
        basepath: this.config.krpanoSettings.basepath,
        mwheel: this.config.krpanoSettings.mwheel,
        focus: this.config.krpanoSettings.focus,
        consolelog: this.config.krpanoSettings.consolelog,
        mobilescale: this.config.krpanoSettings.mobilescale,
        fakedevice: this.config.krpanoSettings.fakedevice,
        passQueryParameters: this.config.krpanoSettings.passQueryParameters,
        webglsettings: this.config.krpanoSettings.webglsettings,
        onready: (krpanoEl) => {
          this.handleKrpanoReady(krpanoEl)
        },
        onerror (msg) {
          console.error('pano create error', msg)
        }
      })
    }

    this.handleKrpanoReady = function (krpanoEl) {
      this.krpanoEl = krpanoEl
      this.krpanoEl.hooks = _hooks
      // console.log('pano created', this.krpanoEl.hooks)
      this.krpanoEl.call(`loadxml(${escape(_xml)})`)
      const isGyroEnabled = false
      window.setTimeout(() => {
        this.krpanoEl.call(`first_panorama_ready(${isGyroEnabled});`)
      }, 1500)
      if (this.config.autoRotate) {
        this.startAutoRotate()
      }
    }

    this.removePano = function () {
      const { removepano } = window

      if (this.krpanoEl) {
        removepano(_krpanoId)
        console.log('pano removed')
        delete this.krpanoEl
      }
    }

    this.initKrpanoVRMode = function () {
      const panoramas = this.getPanoramas()
      for (let i = 0; i < panoramas.length; i++) {
        this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_${i}`)
        this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_text_${i}`)
      }
    }

    this.setKrpanoLookAtH = function (h) {
      _krpanoLookAtH = h
    }

    this.startAutoRotate = function () {
      this.krpanoEl.call(`auto_rotate();`)
      this.krpanoCamera.isCameraRotating = true
    }

    this.stopAutoRotate = function (shouldAutoStartRotate = false, duration = 20000) {
      if (this.config.autoRotate) {
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
    }
  }
}

export default Krpano
