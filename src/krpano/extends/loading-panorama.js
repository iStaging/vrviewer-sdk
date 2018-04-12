import { clone } from '@/common/utils'

class KrpanoLoadingPanorama {
  constructor () {
    let _loadingSettings = {
      onLoadingPanoramaStart () {},
      onLoadingPanoramaFinish () {},
      onLoadingPanoramaProgress (event) {},
      onLoadingPanoramaError (error) {}
    }

    this.setLoadingSettings = (settings) => {
      _loadingSettings = settings
    }

    this.getLoadingSettings = () => {
      return clone(_loadingSettings)
    }
  }
}

export default KrpanoLoadingPanorama
