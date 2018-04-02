var VRMaker = function (element, options) {
  var _el = null
  var _panoramas = []
  var _currentPanorama = {}

  function clone (object) {
    return JSON.parse(JSON.stringify(object))
  }

  this.init = function (element, options) {
    _el = element
    this.setPanoramas(options.panoramas)
    _currentPanorama = (options.index !== undefined)
      ? options.index
      : options.panoramas[0]
  }

  this.setPanoramas = function (panoramas) {
    _panoramas = panoramas
    this.setCurrentPanorama(panoramas[0])
    return this
  }

  this.getPanoramas = function () {
    return clone(_panoramas)
  }

  this.addPanoramas = function (panoramas) {
    _panoramas = _panoramas.concat(panoramas)
    return this
  }

  this.addPanorama = function (panorama) {
    _panoramas.push(panorama)
    return this
  }

  this.setCurrentPanorama = function (id) {
    if (!id) {
      return _currentPanorama
    }
    var foundPanorama = _panoramas.find(function (panorama) {
      return panorama.id === id
    })
    if (!foundPanorama) {
      throw new Error('Panorama is not found by your id')
    }
    return clone(foundPanorama)
  }

  this.init(element, options)
  return this
}
