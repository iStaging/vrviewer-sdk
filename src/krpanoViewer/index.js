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
} from '@/krpanoViewer/xml/plugins'
import krpanoHelpers from '@/krpanoViewer/krpano-helpers'
import krpanoConstants from '@/krpanoViewer/krpano-constants'
import getStylesXml from '@/krpanoViewer/xml/styles'
import getLogoTripodXml from '@/krpanoViewer/xml/tripod'
import eventsXml from '@/krpanoViewer/xml/events'
import getScenesXml from '@/krpanoViewer/xml/scenes'
import getActionsXml from '@/krpanoViewer/xml/actions'
import CommonViewer from '@/common/common-viewer'
import KrpanoAutoRotate from '@/krpanoViewer/extends/auto-rotate'
import KrpanoGyro from '@/krpanoViewer/extends/gyro'
import KrpanoTripod from '@/krpanoViewer/extends/tripod'
import KrpanoBasic from '@/krpanoViewer/extends/basic'
import KrpanoInitView from '@/krpanoViewer/extends/init-view'
import KrpanoLoadingPanorama from '@/krpanoViewer/extends/loading-panorama'
import classes from 'extends-classes'

class KrpanoViewer extends classes(CommonViewer, KrpanoAutoRotate, KrpanoGyro, KrpanoTripod, KrpanoBasic, KrpanoInitView, KrpanoLoadingPanorama) {
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

export default KrpanoViewer
