import { clone } from '@/common/utils'

let _gyroSettings = {
  active: false
}

class KrpanoGyro {
  setGyroSettings (settings) {
    _gyroSettings = settings
  }

  getGyroSettings () {
    return clone(_gyroSettings)
  }

  setGyroActive (res = false) {
    _gyroSettings.active = res
  }
}

export default KrpanoGyro
