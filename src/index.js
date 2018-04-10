import {
  clone,
  push
} from './utils'
import {
  checkPanoramaFormat
} from './helpers'
import Krpano from './vrmaker-krpano'
import Aframe from './vrmaker-aframe'
import classes from 'extends-classes'
import WatchJS from 'melanke-watchjs'
var watch = WatchJS.watch
var unwatch = WatchJS.unwatch

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

      watch(_currentPanorama, function () {
        console.log('some attribute of ex3 changes!');
      });
    }

    this.initEl = (el) => {
      _el = el
      return this
    }

    this.initPanoramas = (panoramas) => {
      panoramas.map(panorama => checkPanoramaFormat(panorama))

      _panoramas = panoramas
      this.selectPanorama(panoramas[0].objectId)
      return this
    }

    this.addPanoramas = (panoramas) => {
      const newPanoramas = _panoramas.concat(panoramas)
      if (this.panoramasChanged instanceof Function) {
        this.panoramasChanged(newPanoramas, _panoramas)
      }
      _panoramas = newPanoramas
      return this
    }

    this.addPanorama = (panorama) => {
      const newPanoramas = push(panorama, _panoramas)
      if (this.panoramasChanged instanceof Function) {
        this.panoramasChanged(newPanoramas, _panoramas)
      }
      _panoramas = newPanoramas
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
      if (this.currentPanoramaChanged instanceof Function) {
        this.currentPanoramaChanged(foundPanorama, _currentPanorama)
      }
      console.log('selectPanorama', foundPanorama, _currentPanorama)
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
