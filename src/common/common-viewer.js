import {
  clone,
  push,
  updateObject
} from '@/common/utils'

import {
  checkPanoramaFormat
} from '@/common/helpers'
import { version } from '@/../package.json'

class CommonViewer {
  constructor () {
    let _el = null
    let _panoramas = []
    let _currentPanorama = {}
    let _version = ''

    this.init = (options) => {
      this.setVersion(version)
      this.initEl(options.el)
      this.initPanoramas(options.panoramas)
      console.log('VRMaker version: ', this.getVersion())
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

    this.updatePanorama = (id, payload = {}) => {
      let foundIndex
      const foundPanorama = _panoramas.find((panorama, index) => {
        foundIndex = index
        return panorama.objectId === id
      })
      if (!foundPanorama) {
        throw new Error('updatePanorama failed, id can\'t find panorama')
      }
      const updatedPanorama = updateObject(foundPanorama, payload)
      const newPanoramas = clone(_panoramas)
      newPanoramas.splice(foundIndex, 1, updatedPanorama)
      _panoramas = newPanoramas
    }

    this.updateCurrentPanorama = (payload = {}) => {
      const foundIndex = _panoramas.findIndex(panorama => (
        panorama.objectId === _currentPanorama.objectId
      ))
      if (!_currentPanorama) {
        throw new Error('updatePanorama failed, id can\'t find panorama')
      }
      const updatedPanorama = updateObject(_currentPanorama, payload)
      _currentPanorama = updatedPanorama
      const newPanoramas = clone(_panoramas)
      newPanoramas.splice(foundIndex, 1, updatedPanorama)
      _panoramas = newPanoramas
    }

    this.removePanorama = (id) => {
      const filteredPanoramas = _panoramas.filter(panorama => (
        panorama.objectId !== id
      ))
      _panoramas = clone(filteredPanoramas)
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

    this.setVersion = (version) => {
      _version = version
    }

    this.getVersion = () => _version
  }
}

export default CommonViewer
