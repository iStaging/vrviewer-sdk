import { clone } from '@/common/utils'

let _initViewSettings = {
  active: true
}

class KrpanoInitView {
  setInitViewSettings (settings) {
    _initViewSettings = settings
  }

  getInitViewSettings () {
    return clone(_initViewSettings)
  }
}

export default KrpanoInitView
