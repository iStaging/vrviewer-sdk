import { clone } from '@/common/utils'
import krpanoConstants from '@/krpanoViewer/krpano-constants'

class KrpanoAutoRotate {
  constructor () {
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

    this.setAutoRotateSettings = (settings) => {
      _autoRotateSettings = settings
    }

    this.getAutoRotateSettings = () => {
      return clone(_autoRotateSettings)
    }

    this.startAutoRotate = function () {
      if (krpanoConstants.getKrpanoEl) {
        krpanoConstants.getKrpanoEl().call(`auto_rotate();`)
      }
      _cameraRotateConfig.isCameraRotating = true
    }

    this.stopAutoRotate = function (shouldAutoStartRotate = false, duration = 20000) {
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
}

export default KrpanoAutoRotate
