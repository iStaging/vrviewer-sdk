import { clone } from '@/common/utils'

class KrpanoGyro {
  constructor () {
    let _gyroSettings = {
      active: false
    }

    this.setGyroSettings = (settings) => {
      _gyroSettings = settings
    }

    this.getGyroSettings = () => {
      return clone(_gyroSettings)
    }

    this.setGyroActive = (res = false) => {
      _gyroSettings.active = res
    }
  }
}

export default KrpanoGyro
