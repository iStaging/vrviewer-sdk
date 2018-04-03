const VRMaker = function () {
  var _el = null
  var _panoramas = []
  var _currentPanorama = {}

  function clone (object) {
    return JSON.parse(JSON.stringify(object))
  }

  function checkPanoramaFormat (panorama) {
    if (!panorama.id) {
      throw new Error('panorama id is required')
    }
  }

  this.init = function (element, options) {
    _el = element
    this.initPanoramas(options.panoramas)
    _currentPanorama = (options.index !== undefined)
      ? options.index
      : options.panoramas[0]
  }

  this.initPanoramas = function (panoramas) {
    for (var i = 0; i < panoramas.length; i++) {
      checkPanoramaFormat(panoramas[i])
    }
    _panoramas = panoramas
    this.setPanorama(panoramas[0].id)
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

  this.setPanorama = function (id) {
    if (!id) {
      throw new Error('setPanorama id is required')
    }
    var foundPanorama = _panoramas.find(function (panorama) {
      return panorama.id === id
    })
    if (!foundPanorama) {
      throw new Error('Panorama is not found by your id')
    }
    _currentPanorama = foundPanorama
    return this
  }

  this.getPanoramas = function () {
    return clone(_panoramas)
  }

  this.getPanorama = function () {
    return clone(_currentPanorama)
  }
  return this
}

export default VRMaker
