import {
  getIEVersion,
  isEmpty
} from '@/common/utils'
import {
  webVRXml,
  gyroXml,
  threeJsXml,
  contextMenuXml,
  gyroMessageXml
} from '@/krpano/xml/plugins'
import krpanoHelpers from '@/krpano/krpano-helpers'
import krpanoConstants from '@/krpano/krpano-constants'
import getStylesXml from '@/krpano/xml/styles'
import getLogoTripodXml from '@/krpano/xml/tripod'
import eventsXml from '@/krpano/xml/events'
import getScenesXml from '@/krpano/xml/scenes'
import getActionsXml from '@/krpano/xml/actions'
import CommonViewer from '@/common/common-viewer'
import KrpanoAutoRotate from '@/krpano/extends/auto-rotate'
import KrpanoGyro from '@/krpano/extends/gyro'
import KrpanoTripod from '@/krpano/extends/tripod'
import KrpanoBasic from '@/krpano/extends/basic'
import KrpanoInitView from '@/krpano/extends/init-view'
import KrpanoLoadingPanorama from '@/krpano/extends/loading-panorama'
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

  toggleVRMode (bool) {
    const krpanoEl = krpanoConstants.getKrpanoEl()
    if (bool) {
      krpanoEl.call('WebVR.enterVR();')
    } else {
      krpanoEl.call('WebVR.exitVR();')
    }
  }
}

export default Krpano
