import { clone } from '@/common/utils'

class KrpanoInitView {
  constructor () {
    let _initViewSettings = {
      active: true
    }

    this.setInitViewSettings = (settings) => {
      _initViewSettings = settings
    }

    this.getInitViewSettings = () => {
      return clone(_initViewSettings)
    }
  }
}

export default KrpanoInitView
