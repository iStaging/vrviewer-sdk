import {
  clone,
  isEmpty,
  push,
  updateObject
} from '@/common/utils'
import {
  checkPanoramaFormat
} from '@/common/helpers'
import { version } from '@/../package.json'

let _el = new WeakMap()
let _panoramas = new WeakMap()
let _currentPanorama = new WeakMap()
let _version = new WeakMap()

class CommonViewer {
  init (options) {
    this.setVersion(version)
    this.initEl(options.el)
    this.initPanoramas(options.panoramas)
    // console.log('VRViewer version: ', this.getVersion())
    _currentPanorama = (options.panoramaIndex !== undefined)
      ? options.panoramaIndex
      : options.panoramas[0]
  }

  initPanoramas (panoramas) {
    panoramas.map(panorama => checkPanoramaFormat(panorama))

    _panoramas = panoramas
    this.selectPanorama(panoramas[0].panoramaId)
  }

  addPanoramas (panoramas) {
    panoramas.map(panorama => checkPanoramaFormat(panorama))
    _panoramas = _panoramas.concat(panoramas)
  }

  addPanorama (panorama) {
    checkPanoramaFormat(panorama)
    _panoramas = push(_panoramas, panorama)
  }

  updatePanorama (id, payload = {}) {
    let foundIndex
    const foundPanorama = _panoramas.find((panorama, index) => {
      foundIndex = index
      return panorama.panoramaId === id
    })
    if (!foundPanorama) {
      throw new Error('updatePanorama failed, id can\'t find panorama')
    }
    const updatedPanorama = updateObject(foundPanorama, payload)
    checkPanoramaFormat(updatedPanorama)
    const newPanoramas = clone(_panoramas)
    newPanoramas.splice(foundIndex, 1, updatedPanorama)
    _panoramas = newPanoramas
  }

  updateCurrentPanorama (payload = {}) {
    if (isEmpty(_currentPanorama)) {
      throw new Error('currentPanorama doesn\'t found')
    }
    const foundIndex = _panoramas.findIndex(panorama => (
      panorama.panoramaId === _currentPanorama.panoramaId
    ))
    const updatedPanorama = updateObject(_currentPanorama, payload)
    checkPanoramaFormat(updatedPanorama)
    _currentPanorama = updatedPanorama
    const newPanoramas = clone(_panoramas)
    newPanoramas.splice(foundIndex, 1, updatedPanorama)
    _panoramas = newPanoramas
  }

  removePanorama (id) {
    const filteredPanoramas = _panoramas.filter(panorama => (
      panorama.panoramaId !== id
    ))
    _panoramas = clone(filteredPanoramas)
  }

  selectPanorama (id) {
    if (!id) {
      throw new Error('selectPanorama id is required')
    }
    const foundPanorama = _panoramas.find(panorama => panorama.panoramaId === id)
    if (!foundPanorama) {
      throw new Error('Panorama is not found by your id')
    }
    _currentPanorama = foundPanorama
    return _currentPanorama
  }

  initEl (el) {
    _el = el
  }

  getEl () {
    return _el
  }

  getPanoramas () {
    return clone(_panoramas)
  }

  getCurrentPanorama () {
    return clone(_currentPanorama)
  }

  getVersion () {
    return _version
  }

  setVersion (version) {
    _version = version
  }
}

export default CommonViewer
