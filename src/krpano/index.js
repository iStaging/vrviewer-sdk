import {
  clone,
  getIEVersion,
  isEmpty,
  isFunction
} from '@/common/utils'
import {
  webVRXml,
  gyroXml,
  threeJsXml,
  contextMenuXml,
  gyroMessageXml
} from './xml/plugins'
import krpanoHelpers from './krpano-helpers'
import krpanoConstants from './krpano-constants'
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
  }

  generateKrpano (config) {
    const { embedpano, removepano } = window
    if (!(embedpano && removepano)) {
      throw new Error('krpano player is required')
    }
    krpanoConstants.setKrpanoId('krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100))
    krpanoHelpers.setConfig.call(this, config)
    const panoramas = this.getPanoramas()

    const initKrpanoVRMode = () => {
      for (let i = 0; i < panoramas.length; i++) {
        krpanoConstants.addVrModeShouldShow(`vr_panorama_${i}`)
        krpanoConstants.addVrModeShouldShow(`vr_panorama_text_${i}`)
      }
    }

    const generateXml = () => {
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
    }

    initKrpanoVRMode()
    generateXml()
    krpanoHelpers.embedPano.call(this)

    return this
  }

  destroy () {
    const { removepano } = window
    if (krpanoConstants.getKrpanoId && krpanoConstants.getKrpanoEl) {
      const krpanoId = krpanoConstants.getKrpanoId()
      removepano(krpanoId)
      console.log('pano removed')
      krpanoConstants.setKrpanoEl({})
      krpanoHelpers.stopAutoRotateEvent.call(this).removeEvent()
    }
  }

  changePanorama (panoramaId = '') {
    this.selectPanorama(panoramaId)
    if (!isEmpty(krpanoConstants.getKrpanoEl)) {
      const krpanoEl = krpanoConstants.getKrpanoEl()
      krpanoEl.call(`prepare_change_scene(panorama_${panoramaId || ''}, ${panoramaId || ''});`)
    }
  }

  toggleGyro (bool) {
    const krpanoEl = krpanoConstants.getKrpanoEl()
    if (bool) {
      krpanoEl.call('start_gyro();')
    } else {
      krpanoEl.call('stop_gyro();')
    }
  }
}

export default Krpano
