import { clone } from '@/common/utils'

class KrpanoSettings {
  constructor () {
    let _krpanoSettings = {
      html5: 'webgl+only',
      webglsettings: { depth: true },
      passQueryParameters: true,
      lazyLoad: true,
      mwheel: true,
      focus: false
    }

    this.setKrpanoSettings = (settings) => {
      _krpanoSettings = settings
    }

    this.getKrpanoSettings = () => {
      return clone(_krpanoSettings)
    }
  }
}

export default KrpanoSettings
