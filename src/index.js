import { clone, push } from './utils'
import { checkPanoramaFormat } from './helpers'
import Krpano from './vrmaker-krpano'
import Aframe from './vrmaker-aframe'
import classes from 'extends-classes'

class VRMaker extends classes(Krpano, Aframe) {
  constructor () {
    super(...arguments)
    var _el = null //eslint-disable-line
    var _panoramas = []
    var _currentPanorama = {}

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
      panoramas.map(panorama => checkPanoramaFormat(panorama))

      _panoramas = panoramas
      this.selectPanorama(panoramas[0].id)
      return this
    }

    this.addPanoramas = (panoramas) => {
      _panoramas = _panoramas.concat(panoramas)
      return this
    }

    this.addPanorama = (panorama) => {
      push(panorama, _panoramas)
      return this
    }

    this.selectPanorama = (id) => {
      if (!id) {
        throw new Error('setPanorama id is required')
      }
      const foundPanorama = _panoramas.find((panorama) => panorama.id === id)
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

  checkVersion () {
    const version = 'v1.0.0'
    this.version = version
  }
}

window.VRMaker = new VRMaker()
export default VRMaker
