class Krpano {
  constructor () {
    let _krpanoId = ''
    let _element = null
    this.config = {}
    this.krpanoObj = {}
    this.xml = ''

    this.generateKrpano = function (el, config) {
      _element = document.querySelector(el)
      if (!_element) {
        throw new Error('element not found')
      }
      const { embedpano, removepano } = window
      if (!(embedpano && removepano)) {
        throw new Error('krpano player is required')
      }

      _krpanoId = 'krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100)
      this.setConfig(config)
      this.embedPano()
      return this
    }

    this.setConfig = function (config) {
      this.config = config
    }

    this.embedPano = function () {
      window.embedpano({
        id: _krpanoId,
        target: _element.id,
        xml: this.xml,
        bgcolor: this.config.bgcolor,
        wmode: this.config.wmode,
        vars: this.config.vars,
        initvars: this.config.initvars,
        basepath: this.config.basepath,
        mwheel: this.config.mwheel,
        focus: this.config.focus,
        consolelog: this.config.consolelog,
        mobilescale: this.config.mobilescale,
        fakedevice: this.config.fakedevice,
        passQueryParameters: this.config.passQueryParameters,
        webglsettings: this.config.webglsettings,
        onready (krpanoObj) {
          this.krpanoObj = krpanoObj
          console.log('pano created', krpanoObj)
        },
        onerror (msg) {
          console.error('pano create error', msg)
        }
      })
    }

    this.removePano = function () {
      const { removepano } = window

      if (this.krpanoObj) {
        removepano(_krpanoId)
        console.log('pano removed')
        delete this.krpanoObj
      }
    }

    this.generateXml = function () {

    }
  }
}

export default Krpano
