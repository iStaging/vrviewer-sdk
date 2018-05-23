<template>
  <div
    role="application"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp">
    <krpano
      v-if="isKrpanoActive"
      class="vrsdk-krpano-wrapper"
      xml=""
      html5="webgl+only"
      :webglsettings="{ depth: true }"
      :passQueryParameters="true"
      :hooks="hooks"
      :lazy-load="true"
      :mwheel="krpanoSetting.mwheel"
      :focus="krpanoSetting.focus"
      @panoCreated="krpanoInit">
      <!--focus=false: avoid when krpano loaded, will auto scroll and focus on the iframe-->
    </krpano>
    <!--<div-->
      <!--v-if="isKrpanoActive"-->
      <!--id="pano"-->
      <!--class="krpano-wrapper">-->
      <!--<noscript>-->
        <!--<table style="width:100%;height:100%;">-->
          <!--<tr style="vertical-align:middle;">-->
            <!--<td>-->
              <!--<div style="text-align:center;">ERROR:<br/><br/>Javascript not activated<br/><br/></div>-->
            <!--</td>-->
          <!--</tr>-->
        <!--</table>-->
      <!--</noscript>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  convertIndexFromArrayToUrl,
  xmlString
} from '@/api/helpers'
import {
  getIEVersion,
  isEmpty
} from '@/api/utils'
import getActionsXml from './xml/actions'
import eventsXml from './xml/events'
import getStylesXml from './xml/styles'
import hooks from './hooks'
import getScenesXml from './xml/scenes'
import getLogoTripodXml from './xml/tripod'
import { contextMenuXml, gyroMessageXml, gyroXml, threeJsXml, webVRXml } from './xml/plugins'

export default {
  name: 'Krpano',
  components: {
    krpano: require('vue-krpano')
  },

  props: {
    isMouseOnMarkerInfo: Boolean,
    isMouseOnKrpanoMarker: Boolean,
    mouseenterMarker: Function,
    mouseleaveMarker: Function
  },

  data () {
    return {
      defaultFov: 120,
      krpanoVrModeObj: {
        vrModeShouldHide: [],
        vrModeShouldShow: [ 'vr_menu_bg', 'vr_menu_l', 'vr_menu', 'vr_menu_r' ]
      },
      mouseEvent: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      },
      touchEvent: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      },
      vrThumbAth: 24,
      vrThumbWidth: 160
    }
  },

  beforeMount () {
    this.initGyroFromIframe()
    for (let i = 0; i < this.panoramas.length; i++) {
      this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_${i}`)
      this.krpanoVrModeObj.vrModeShouldShow.push(`vr_panorama_text_${i}`)
    }
  },

  mounted () {
    window.addEventListener('keydown', this.keydownHandler)
    // setTimeout(() => {
    //   const vm = this
    //   embedpano({ // eslint-disable-line
    //     id: 'krpano_' + Math.floor(Math.random() * (100000 - 100 + 1) + 100),
    //     xml: '',
    //     target: 'pano',
    //     html5: 'prefer',
    //     mwheel: true,
    //     initvars: { design: 'flat' },
    //     passQueryParameters: true,
    //     onready (krpanoObj) {
    //       krpanoObj.hooks = vm.hooks
    //       vm.krpanoInit(krpanoObj)
    //     }
    //   })
    // }, 1000)
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.keydownHandler)
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'isGyroEnabled',
      'isKrpanoActive',
      'isShareActive',
      'isVrMode',
      'krpanoEl',
      'krpanoLookAtH',
      'krpanoXOffset',
      'panoramas',
      'krpanoSetting',
      'autoRotateSetting',
      'tripodSetting'
    ]),

    krpanoXml () {
      if (this.panoramas.length <= 0) {
        return ''
      }
      const startIndex = 0
      const { panoramas, krpanoXOffset, krpanoVrModeObj, nextPanoramaPanoramaNameName, defaultFov, vrThumbAth, vrThumbWidth, tripodSetting } = this
      const stylesXml = getStylesXml(panoramas, vrThumbAth, vrThumbWidth)
      const scenesXml = getScenesXml(panoramas, startIndex, krpanoXOffset, krpanoVrModeObj, nextPanoramaPanoramaNameName, defaultFov)
      const actionsXml = getActionsXml(this.autoRotateSetting, startIndex, panoramas, defaultFov, krpanoXOffset, vrThumbAth, krpanoVrModeObj)
      const logoTripodXml = getLogoTripodXml(tripodSetting.image, tripodSetting.size, panoramas[0].isTopLogo)
      const xml = `<krpano onstart="startup();">
      ${webVRXml}
      ${gyroXml}
      ${gyroMessageXml}
      ${contextMenuXml}
      ${logoTripodXml}
      ${eventsXml}
      ${stylesXml}
      ${scenesXml}
      ${actionsXml}
      ${!getIEVersion() ? threeJsXml : ''}</krpano>`
      return xml
    },

    hooks () {
      // startAutoRotate, stopAutoRotate , setProgressCount, setProgressMax, closeProgress, showProgress, setMarkerInfo, setKrpanoLookAtH, exitVrMode
      return hooks(this)
    }
  },

  methods: {
    ...mapActions([
      'closeFloorplan',
      'closeMarkerInfo',
      'closeMobileMenu',
      'closePanoramasList',
      'closeProgress',
      'closeShare',
      'exitVrMode',
      'initGyroFromIframe',
      'setKrpanoEl',
      'setKrpanoLookAtH',
      'setMarkerInfoData',
      'setPanorama',
      'setPopupSizeConfig',
      'setPopupUrl',
      'setProgressCount',
      'setProgressMax',
      'showMarkerInfo',
      'showProgress',
      'showPopup',
      'startAutoRotate',
      'stopAutoRotate',
      'startGyro',
      'toggleGyro'
    ]),

    krpanoInit (krpanoObj = {}) {
      if (this.krpanoXml) {
        this.setKrpanoEl(krpanoObj)
        krpanoObj.call(`loadxml(${escape(this.krpanoXml)})`)
      }
    },

    nextPanoramaPanoramaNameName (marker = {}) {
      if (!this.panoramas || this.panoramas.length <= 0) {
        return
      }
      const foundPanorama = this.panoramas.find(panorama =>
        panorama.panoramaId === marker.nextPanoramaId
      )
      if (isEmpty(foundPanorama)) {
        return
      }
      return xmlString(foundPanorama.customPanoramaName || this.$t(foundPanorama.panoramaName))
    },

    selectPanorama (nextPanoramaId = '', selectedMethod = '', isMarkerPoint = false, isWebVr = false) {
      let index = this.panoramas.findIndex(panorama =>
        panorama.panoramaId === nextPanoramaId
      )
      const panorama = this.panoramas[index]
      index = convertIndexFromArrayToUrl(index, this.panoramas.length)
      this.setPanorama(panorama)
    },

    handleShowPopup (index = 0) {
      const marker = this.currentPanorama.markers[index]
      const { width, height, widthPercent, widthType } = marker
      this.setPopupUrl(marker.actionLink)
      this.setPopupSizeConfig({ width, height, widthPercent, widthType })
      this.showPopup()
    },

    krpanoMarkerMousein (index = 0, mouseX = 0, mouseY = 0) {
      this.$emit('isMouseOnKrpanoMarker', true)
      const marker = this.currentPanorama.markers[index]
      this.$emit('setMarkerPositionX', mouseX)
      this.$emit('setMarkerPositionY', mouseY)
      this.mouseenterMarker(marker)
    },

    krpanoMarkerMouseout (index = 0) {
      this.$emit('isMouseOnKrpanoMarker', false)
      this.$nextTick(() => {
        if (this.isMouseOnMarkerInfo === false && this.isMouseOnKrpanoMarker === false) {
          this.mouseleaveMarker()
        }
      })
    },

    setMarkerInfo (index = 0) {
      const marker = this.currentPanorama.markers[index]
      this.showMarkerInfo()
      this.setMarkerInfoData(marker)
    },

    keydownHandler (e) {
      // arrow key up, down, left, right
      if (e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40) {
        this.stopAutoRotate({
          shouldAutoStartRotate: !this.isVrMode && !this.isGyroEnabled,
          stopMethod: 'Keyboard'
        })
      }
    },

    handleTouchStart (e = null) {
      if (!e) {
        return
      }
      this.stopAutoRotate({
        shouldAutoStartRotate: false,
        stopMethod: 'Touch'
      })
      this.touchEvent.startX = e.touches[0].pageX
      this.touchEvent.startY = e.touches[0].pageY
      this.touchEvent.endX = e.touches[0].pageX
      this.touchEvent.endY = e.touches[0].pageY
    },

    handleTouchMove (e = null) {
      if (!e) {
        return
      }
      this.touchEvent.endX = e.touches[0].pageX
      this.touchEvent.endY = e.touches[0].pageY
    },

    handleTouchEnd () {
      this.stopAutoRotate({
        shouldAutoStartRotate: !this.isVrMode && !this.isGyroEnabled
      })
      const movingX = Math.abs(this.touchEvent.startX - this.touchEvent.endX)
      const movingY = Math.abs(this.touchEvent.startY - this.touchEvent.endY)
      const movingOffset = 20
      if (movingX <= movingOffset && movingY <= movingOffset) {
        this.mobileCloseAll()
      }
    },

    handleMouseDown (e = null) {
      if (!e) {
        return
      }
      this.stopAutoRotate({
        shouldAutoStartRotate: false,
        stopMethod: 'Mouse'
      })
      this.mouseEvent.startX = e.clientX
      this.mouseEvent.startY = e.clientY
      this.mouseEvent.endX = e.clientX
      this.mouseEvent.endY = e.clientY
    },

    handleMouseMove (e = null) {
      if (!e) {
        return
      }
      this.mouseEvent.endX = e.clientX
      this.mouseEvent.endY = e.clientY
      if (this.krpanoEl) {
        this.krpanoEl.call(`hover_closest_point_marker();`)
      }
    },

    handleMouseUp () {
      this.stopAutoRotate({
        shouldAutoStartRotate: !this.isVrMode && !this.isGyroEnabled
      })
      const movingX = Math.abs(this.mouseEvent.startX - this.mouseEvent.endX)
      const movingY = Math.abs(this.mouseEvent.startY - this.mouseEvent.endY)
      const movingOffset = 0
      if (movingX <= movingOffset && movingY <= movingOffset) {
        this.pcCloseAll()
      }
    },

    mobileCloseAll () {
      this.closeMobileMenu()
      this.closeShare()
      this.closePanoramasList()
      this.closeFloorplan()
    },

    pcCloseAll () {
      this.closeMarkerInfo()
      this.closeShare()
      // 768 = CSS assets/css/variables.styl $response value
      if (window.innerWidth < 768) {
        this.closeMobileMenu()
        this.closePanoramasList()
        this.closeFloorplan()
      }
    }
  },

  watch: {
    isKrpanoActive (bool = false) {
      if (bool === false) {
        removepano(this.krpanoEl.id) // eslint-disable-line
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'
@import '~css/variables.styl'

.vrsdk-krpano-wrapper {
  @extend .vrsdk-absolute-full
  z-index: $krpano-wrapper-z
}
</style>
