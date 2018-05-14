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
      class="krpano-wrapper"
      xml=""
      html5="webgl+only"
      :webglsettings="{ depth: true }"
      :passQueryParameters="true"
      :hooks="hooks"
      :lazy-load="true"
      :mwheel="true"
      :focus="false"
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
import gaEvents from '~js/ga-events'
import {
  convertIndexFromArrayToUrl,
  convertIndexFromUrlToArray,
  xmlString
} from '~js/helpers'
import {
  getIEVersion,
  isEmpty
} from '~js/utils'
import getActionsXml from './xml/actions'
import eventsXml from './xml/events'
import getStylesXml from './xml/styles'
import hooks from './hooks'
import getScenesXml from './xml/scenes'
import getLogoTripodXml from './xml/tripod'
import { contextMenuXml, gyroMessageXml, gyroXml, threeJsXml, webVRXml } from './xml/plugins'
import router from '../../router'

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
      'currentMarker',
      'currentBuilding',
      'currentPanorama',
      'customSetting',
      'headquarter',
      'isCommentsActive',
      'isGyroEnabled',
      'isFloorplanActive',
      'isKrpanoActive',
      'isInformationActive',
      'isMarkerInfoActive',
      'isPanoramasListActive',
      'isShareActive',
      'isUiMode',
      'isVrMode',
      'krpanoEl',
      'krpanoLookAtH',
      'krpanoXmlPlugins',
      'krpanoXOffset',
      'logoSize',
      'panoramas',
      'user'
    ]),

    krpanoXml () {
      if (this.panoramas.length <= 0) {
        return ''
      }
      const startIndex = convertIndexFromUrlToArray(this.$route.query.index, this.panoramas.length)
      const { panoramas, krpanoXOffset, customSetting, krpanoVrModeObj, nextPanoramaCategoryName, defaultFov, vrThumbAth, vrThumbWidth } = this
      const stylesXml = getStylesXml(panoramas, vrThumbAth, vrThumbWidth)
      const scenesXml = getScenesXml(panoramas, startIndex, krpanoXOffset, customSetting, krpanoVrModeObj, nextPanoramaCategoryName, defaultFov)
      const actionsXml = getActionsXml(startIndex, panoramas, defaultFov, krpanoXOffset, vrThumbAth, krpanoVrModeObj)
      const logoTripodXml = getLogoTripodXml(this.logoTripod, this.logoSize, this.panoramas[0].isTopLogo)
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
    },

    logoTripod () {
      if (this.customSetting.customBranding) {
        return this.headquarter.tripodUrl ||
          this.currentBuilding.logo ||
          ''
      } else {
        return require('./img/logo-tripod.png')
      }
    }
  },

  methods: {
    ...mapActions([
      'closeComments',
      'closeFloorplan',
      'closeInformation',
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

    nextPanoramaCategoryName (marker = {}) {
      if (!this.panoramas || this.panoramas.length <= 0) {
        return
      }
      const foundPanorama = this.panoramas.find(panorama =>
        panorama.objectId === marker.nextPanoramaId
      )
      if (isEmpty(foundPanorama)) {
        return
      }
      return xmlString(foundPanorama.customCategory || this.$t(foundPanorama.category))
    },

    selectPanorama (nextPanoramaId = '', selectedMethod = '', isMarkerPoint = false, isWebVr = false) {
      let index = this.panoramas.findIndex(panorama =>
        panorama.objectId === nextPanoramaId
      )
      const panorama = this.panoramas[index]
      index = convertIndexFromArrayToUrl(index, this.panoramas.length)
      this.setPanorama(panorama)
      router.replace({
        query: {
          ...this.$route.query,
          index
        }
      })
      if (selectedMethod) {
        switch (selectedMethod) {
          case 'Screen':
            gaEvents.sendEvent('Panorama', 'ClickScreenOnPanorama', nextPanoramaId)
            break
          case 'VrMode':
            gaEvents.sendEvent('Panorama', 'ClickDotInVRView', nextPanoramaId)
            break
          case 'VrModePrev':
            gaEvents.sendEvent('Panorama', 'ClickPrevInVRView', nextPanoramaId)
            break
          case 'VrModeNext':
            gaEvents.sendEvent('Panorama', 'ClickNextInVRView', nextPanoramaId)
            break
          case 'VrModeThumbnail':
            gaEvents.sendEvent('Panorama', 'ClickNextThumbnailInVRVIEW', nextPanoramaId)
            break
          case 'VrModeThumbnailText':
            gaEvents.sendEvent('Panorama', 'ClickNextThumbnailTextInVRVIEW', nextPanoramaId)
            break
          case 'Hotspot':
            if (isMarkerPoint) {
              if (isWebVr) {
                gaEvents.sendEvent('Panorama', 'ClickDotInVRView', nextPanoramaId)
              } else {
                gaEvents.sendEvent('Panorama', 'ClickDotInPanorama', nextPanoramaId)
              }
            }
            break
          case 'PanoramaList':
            gaEvents.sendEvent('Panorama', 'ClickInPanoramaList', nextPanoramaId)
            break
          case 'YcPanoramaList':
            gaEvents.sendEvent('Panorama', 'SelectYCInPanoramaList', nextPanoramaId)
            break
          case 'FloorplanDots':
            gaEvents.sendEvent('Panorama', 'ClickDotOnFloorPlan', nextPanoramaId)
            break
        }
      }
    },

    handleShowPopup (index = 0) {
      const marker = this.currentPanorama.markers[index]
      const { objectId, width, height, widthPercent, widthType } = marker
      this.setPopupUrl(marker.actionLink)
      this.setPopupSizeConfig({ width, height, widthPercent, widthType })
      this.showPopup()
      gaEvents.sendEvent('Marker', 'LinkClicks', objectId)
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
      this.closeInformation()
      this.closeComments()
      this.closeShare()
      // 768 = CSS assets/css/variables.styl $response value
      if (window.innerWidth < 768) {
        this.closeMobileMenu()
        this.closePanoramasList()
        this.closeFloorplan()
      }
      if (this.$route.name === 'yung-ching') {
        this.closePanoramasList()
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

.krpano-wrapper {
  @extend .absolute-full
  z-index: $krpano-wrapper-z
}
</style>
