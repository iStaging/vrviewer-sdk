import { clone } from '@/common/utils'

class KrpanoBasic {
  constructor () {
    let _basicSettings = {
      mwheel: true,
      focus: false
    }

    this.setBasicSettings = (settings) => {
      _basicSettings = settings
    }

    this.getBasicSettings = () => {
      return clone(_basicSettings)
    }
  }
}

export default KrpanoBasic
