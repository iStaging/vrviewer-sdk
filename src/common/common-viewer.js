import {
  clone,
  push
} from '@/common/utils'
import {
  checkPanoramaFormat
} from '@/common/helpers'
import { version } from '../../package.json'

class CommonViewer {
  constructor () {
    let _el = null
    let _panoramas = []
    let _currentPanorama = {}

    this.init = (options) => {
      this.checkVersion()
      this.initEl(options.el)
      this.initPanoramas(options.panoramas)
      _currentPanorama = (options.index !== undefined)
        ? options.index
        : options.panoramas[0]
    }

    this.initEl = (el) => {
      _el = el
      return this
    }

    this.initPanoramas = (panoramas) => {
      // console.log('panoramas: ', panoramas)
      panoramas.map(panorama => checkPanoramaFormat(panorama))

      _panoramas = panoramas
      this.selectPanorama(panoramas[0].objectId)
      return this
    }

    this.addPanoramas = (panoramas) => {
      _panoramas = _panoramas.concat(panoramas)
      return this
    }

    this.addPanorama = (panorama) => {
      _panoramas = push(panorama, _panoramas)
      return this
    }

    this.selectPanorama = (id) => {
      if (!id) {
        throw new Error('selectPanorama id is required')
      }
      const foundPanorama = _panoramas.find(panorama => panorama.objectId === id)
      if (!foundPanorama) {
        throw new Error('Panorama is not found by your id')
      }
      _currentPanorama = foundPanorama
      return _currentPanorama
    }

    this.getEl = () => _el
    this.getPanoramas = () => clone(_panoramas)
    this.getCurrentPanorama = () => clone(_currentPanorama)

    // return this
  }

  // currentPanoramaChanged () {
  //   console.log('aaaa')
  // }

  checkVersion () {
    console.log('version:', version)
    this.version = version
    return version
  }
}

// window.VRMaker = new VRMaker()
export default CommonViewer
