import { clone } from '@/common/utils'

let _loadingSettings = {
  onLoadingPanoramaStart () {},
  onLoadingPanoramaFinish () {},
  onLoadingPanoramaProgress (event) {},
  onLoadingPanoramaError (error) { return error }
}

class KrpanoLoadingPanorama {
  setLoadingSettings (settings) {
    _loadingSettings = settings
  }

  getLoadingSettings () {
    return clone(_loadingSettings)
  }
}

export default KrpanoLoadingPanorama
