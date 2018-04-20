import krpanoHelpers from '@/krpanoViewer/krpano-helpers'
import krpanoConstants from '@/krpanoViewer/krpano-constants'
import CommonViewer from '@/common/common-viewer'
import KrpanoAutoRotate from '@/krpanoViewer/extends/auto-rotate'
import KrpanoGyro from '@/krpanoViewer/extends/gyro'
import KrpanoTripod from '@/krpanoViewer/extends/tripod'
import KrpanoBasic from '@/krpanoViewer/extends/basic'
import KrpanoInitView from '@/krpanoViewer/extends/init-view'
import KrpanoLoadingPanorama from '@/krpanoViewer/extends/loading-panorama'
import classes from 'extends-classes'

class KrpanoViewer extends classes(CommonViewer, KrpanoAutoRotate, KrpanoGyro, KrpanoTripod, KrpanoBasic, KrpanoInitView, KrpanoLoadingPanorama) {
  constructor () {
    super(...arguments)
    krpanoHelpers.checkKrpano()
  }

  generateKrpano (config, callback) {
    const { embedpano, removepano } = window
    if (!(embedpano && removepano)) {
      throw new Error('krpano player is required')
    }
    krpanoConstants.setKrpanoId('krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100))
    krpanoHelpers.setConfig.call(this, config)
    const panoramas = this.getPanoramas()
    krpanoConstants.initKrpanoVRModeItems(panoramas)
    krpanoHelpers.generateXml.call(this)
    krpanoHelpers.embedPano.call(this, callback)

    return this
  }

  destroy () {
    krpanoHelpers.checkInit()
    const { removepano } = window
    krpanoHelpers.stopAutoRotateEvent.call(this).removeEvent()
    const krpanoId = krpanoConstants.getKrpanoId()
    removepano(krpanoId)
    krpanoConstants.initConstants()
    console.log('pano removed')
  }

  changePanorama (panoramaId = '') {
    krpanoHelpers.checkInit()
    this.selectPanorama(panoramaId)
    const krpanoEl = krpanoConstants.getKrpanoEl()
    krpanoEl.call(`prepare_change_scene(panorama_${panoramaId || ''}, ${panoramaId || ''});`)
  }

  toggleGyro (bool) {
    krpanoHelpers.checkInit()
    const krpanoEl = krpanoConstants.getKrpanoEl()
    if (bool) {
      krpanoEl.call('start_gyro();')
    } else {
      krpanoEl.call('stop_gyro();')
    }
  }

  toggleVRMode (bool) {
    krpanoHelpers.checkInit()
    const krpanoEl = krpanoConstants.getKrpanoEl()
    if (bool) {
      krpanoEl.call('WebVR.enterVR();')
    } else {
      krpanoEl.call('WebVR.exitVR();')
    }
  }
}

export default KrpanoViewer
