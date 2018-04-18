import { clone } from '@/common/utils'
import krpanoConstants from '@/krpanoViewer/krpano-constants'

let _cameraRotateConfig = {
  isCameraRotating: false,
  autoStartRotateTimer: null
}
let _autoRotateSettings = {
  active: false,
  revert: false,
  rotateDuration: 200000,
  restartTime: 20000
}

class KrpanoAutoRotate {
  setAutoRotateSettings (settings) {
    _autoRotateSettings = settings
  }

  getAutoRotateSettings () {
    return clone(_autoRotateSettings)
  }

  startAutoRotate () {
    if (krpanoConstants.getKrpanoEl) {
      krpanoConstants.getKrpanoEl().call(`auto_rotate();`)
    }
    _cameraRotateConfig.isCameraRotating = true
  }

  stopAutoRotate (shouldAutoStartRotate = false, duration = 20000) {
    if (_cameraRotateConfig.isCameraRotating === true) {
      if (krpanoConstants.getKrpanoEl) {
        krpanoConstants.getKrpanoEl().call(`stop_auto_rotate();`)
      }
      _cameraRotateConfig.isCameraRotating = false
    }
    if (_cameraRotateConfig.autoStartRotateTimer !== null) {
      window.clearTimeout(_cameraRotateConfig.autoStartRotateTimer)
    }
    if (shouldAutoStartRotate) {
      _cameraRotateConfig.autoStartRotateTimer = window.setTimeout(() => {
        this.startAutoRotate()
      }, duration)
    } else {
      _cameraRotateConfig.autoStartRotateTimer = null
    }
  }
}

export default KrpanoAutoRotate
