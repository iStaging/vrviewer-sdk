import { clone } from './utils'
import { checkPanoramaFormat } from './helpers'
import Krpano from './vrmaker-krpano'
import Aframe from './vrmaker-aframe'
import classes from 'extends-classes'

class VRMaker extends classes(Krpano, Aframe) {
  constructor () {
    super(...arguments)
    var _el = null
    var _panoramas = []
    var _currentPanorama = {}

    this.init = function (element, options) {
      _el = element
      this.initPanoramas(options.panoramas)
      _currentPanorama = (options.index !== undefined)
        ? options.index
        : options.panoramas[0]
    }

    this.initPanoramas = function (panoramas) {
      panoramas.forEach(panorama => {
        checkPanoramaFormat(panorama)
      })
      _panoramas = panoramas
      this.selectPanorama(panoramas[0].objectId)
      return this
    }

    this.addPanoramas = function (panoramas) {
      _panoramas = _panoramas.concat(panoramas)
      return this
    }

    this.addPanorama = function (panorama) {
      _panoramas.push(panorama)
      return this
    }

    this.selectPanorama = function (id) {
      if (!id) {
        throw new Error('selectPanorama id is required')
      }
      var foundPanorama = _panoramas.find(function (panorama) {
        return panorama.objectId === id
      })
      if (!foundPanorama) {
        throw new Error('Panorama is not found by your id')
      }
      _currentPanorama = foundPanorama
      return _currentPanorama
    }

    this.getPanoramas = function () {
      return clone(_panoramas)
    }

    this.getCurrentPanorama = function () {
      return clone(_currentPanorama)
    }
    return this
  }
}

window.VRMaker = new VRMaker()
export default VRMaker
