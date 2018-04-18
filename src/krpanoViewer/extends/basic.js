import { clone } from '@/common/utils'

let _basicSettings = {
  mwheel: true,
  focus: false
}

class KrpanoBasic {
  setBasicSettings (settings) {
    _basicSettings = settings
  }

  getBasicSettings () {
    return clone(_basicSettings)
  }
}

export default KrpanoBasic
