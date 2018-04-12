import { clone } from '@/common/utils'

class KrpanoBasic {
  constructor () {
    let _basicSettings = {
      html5: 'webgl+only',
      webglsettings: { depth: true },
      passQueryParameters: true,
      lazyLoad: true,
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
