<template>
  <main
    role="main"
    class="vrsdk-i-main">
    <section class="vrsdk-main-krpano-wrapper">
      <!--has panoCollection, but no panoramas-->
      <div
        v-if="isNoPanoramasFound"
        class="vrsdk-full-center vrsdk-error-wrapper">
        <figure class="vrsdk-error-wrapper-container">
          <img
            :src="noPanoramasImage"
            alt="no panoramas">
          <h3>{{ $t('noPanoramas') }}</h3>
        </figure>
      </div>
      <template v-else>
        <krpano
          :isMouseOnMarkerInfo="isMouseOnMarkerInfo"
          :isMouseOnKrpanoMarker="isMouseOnKrpanoMarker"
          :mouseenterMarker="mouseenterMarker"
          :mouseleaveMarker="mouseleaveMarker"
          @setMarkerPositionX="markerPositionX = $event"
          @setMarkerPositionY="markerPositionY = $event">
        </krpano>
      </template>
    </section>

    <!--to show marker point-->
    <viewer-markers-hover
      v-if="!hideUISetting.hideMarkerInfo"
      :markerPositionX="markerPositionX"
      :markerPositionY="markerPositionY"
      :isMouseOnMarkerInfo="isMouseOnMarkerInfo"
      :isMouseOnKrpanoMarker="isMouseOnKrpanoMarker"
      :mouseenterMarker="mouseenterMarker"
      :mouseleaveMarker="mouseleaveMarker"
      @setMouseOnMarkerInfo="isMouseOnMarkerInfo = $event">
    </viewer-markers-hover>

    <!--to show marker memo/tag-->
    <viewer-layer
      v-if="!hideUISetting.hideMarkerInfo"
      v-show="!isVrMode"
      class="vrsdk-bounce-in"
      :class="{ 'vrsdk-bounce-in-active': isMarkerInfoActive }"
      :closeEvent="closeMarkerInfo">
      <ul
        v-show="markerInfoData.type === 'memo'"
        class="vrsdk-viewer-layer-tabs">
        <li class="vrsdk-viewer-layer-li full-width">
          <span class="vrsdk-viewer-layer-text">{{ $t('memo') }}</span>
        </li>
      </ul>
      <div class="vrsdk-viewer-layer-container">
        <marker-info></marker-info>
      </div>
    </viewer-layer>

    <!--share-->
    <viewer-layer
      v-if="shareSetting.shareUrl"
      v-show="shouldViewerLayerShow && isShareReady"
      class="vrsdk-bounce-in"
      :class="{ 'vrsdk-bounce-in-active': isShareActive }"
      :closeEvent="closeShare">
      <ul class="vrsdk-viewer-layer-tabs">
        <li class="vrsdk-viewer-layer-li vrsdk-viewer-layer-li-active">
          <span class="vrsdk-viewer-layer-text">{{ $t('share') }}</span>
        </li>
      </ul>
      <div class="vrsdk-viewer-layer-container">
        <div class="vrsdk-share-container">
          <qr-code
            :height="200"
            :width="200"
            :url="shareUrl.qrcode">
          </qr-code>
        </div>
        <div class="vrsdk-share-text">
          <a
            :href="shareSetting.shareUrl"
            target="_blank">
            {{ shareSetting.shareUrl }}
          </a>
        </div>
      </div>
    </viewer-layer>

    <!--bottom panoramas-->
    <section
      v-if="!hideUISetting.hidePanoramaList"
      v-show="shouldViewerLayerShow"
      class="vrsdk-viewer-list-wrapper"
      :class="{ 'vrsdk-viewer-list-wrapper-active': shouldPanoramasListShow }">
      <span
        class="vrsdk-viewer-list-wrapper-collapse"
        @click="togglePanoramasList">
        <icon
          :class="{
            'vrsdk-icon-collapse-up': !isPanoramasListActive,
            'vrsdk-icon-collapse-down': isPanoramasListActive
          }">
        </icon>
      </span>
      <viewer-list></viewer-list>
    </section>

    <!--floorplan-->
    <section
      v-if="!hideUISetting.hideFloorplan && (floorplan && floorplan !== 'none')"
      v-show="shouldViewerLayerShow"
      class="vrsdk-floorplan-wrapper"
      :class="{
        'vrsdk-floorplan-wrapper-active': shouldFloorplanShow
      }">
      <floorplan
        v-show="isFloorplanReady"
        :floorplanContainerWidth="floorplanContainerWidth"
        :floorplanContainerHeight="floorplanContainerHeight"
        class="vrsdk-floorplan-self"
        :isResizable="useResizeAndDraggable"
        :isDraggable="useResizeAndDraggable">
      </floorplan>
      <span
        class="vrsdk-floorplan-wrapper-collapse"
        @click="toggleFloorplan">
        <icon
          :class="{
            'vrsdk-icon-collapse-right': !isFloorplanActive,
            'vrsdk-icon-collapse-left': isFloorplanActive
          }">
        </icon>
      </span>
    </section>

    <!--ios enter vr mode but is portrait-->
    <instructions></instructions>

    <!--marker popup-->
    <popup
      v-if="isPopupActive"
      :url="popupUrl"
      :width="popupSizeConfig.width"
      :height="popupSizeConfig.height"
      :widthPercent="popupSizeConfig.widthPercent"
      :widthType="popupSizeConfig.widthType"
      @closePopup="closePopup">
    </popup>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isIframe, isMobile, isIOS } from '@/api/utils'
import Floorplan from '../common/Floorplan/index.vue'
import Icon from '../components/Icon/index.vue'
import Instructions from '../common/Instructions/index.vue'
import Krpano from '../common/Krpano/index.vue'
import MarkerInfo from '../common/ViewerLayer/MarkerInfo.vue'
import Popup from '../components/Popup/index.vue'
import QrCode from '../components/QrCode.vue'
import ViewerLayer from '../common/ViewerLayer/index.vue'
import ViewerList from '../common/ViewerList/index.vue'
import ViewerMarkersHover from '../common/ViewerMarkersHover/index.vue'
import noPanoramasImage from '../images/trash-can.png'

export default {
  name: 'IMain',
  components: {
    Floorplan,
    Icon,
    Instructions,
    Krpano,
    MarkerInfo,
    Popup,
    QrCode,
    ViewerLayer,
    ViewerList,
    ViewerMarkersHover
  },

  data () {
    return {
      floorplanContainerHeight: 250,
      floorplanContainerWidth: 250,
      isMapReady: false,
      isMouseOnKrpanoMarker: false,
      isMouseOnMarkerInfo: false,
      isShareReady: false,
      isFloorplanReady: false,
      markerPositionX: 0,
      markerPositionY: 0,
      noPanoramasImage
    }
  },

  mounted () {
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler, false)
    document.addEventListener('webkitfullscreenchange', this.fullscreenChangeHandler, false)
    document.addEventListener('mozfullscreenchange', this.fullscreenChangeHandler, false)
    window.addEventListener('resize', this.resizeHandler)

    this.isFloorplanReady = true
    this.initShare()
    this.resizeHandler()

    window.setTimeout(() => {
      if (this.gyroSetting.active) {
        if (isMobile() && (!isIOS() || ((isIframe() && this.isGyroFromIframe && isIOS()) || !isIframe()))) {
          this.startGyro() // must after initGyroFromIframe
        }
      }
    }, 2500)

    window.setTimeout(() => {
      this.setScreenReady(true)
    }, 3000)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },

  computed: {
    ...mapGetters([
      'currentPanoCollection',
      'floorplan',
      'isFloorplanActive',
      'isFullscreen',
      'isGyroFromIframe',
      'isMarkerInfoActive',
      'isNoPanoramasFound',
      'isPanoramasListActive',
      'isPopupActive',
      'isShareActive',
      'isVrMode',
      'markerInfoData',
      'panoramas',
      'popupSizeConfig',
      'popupUrl',
      'shareUrl',
      'gyroSetting',
      'hideUISetting',
      'shareSetting'
    ]),

    useResizeAndDraggable () {
      // if (process.env.USE_FLOORPLAN_DRAG_AND_RESIZE) {
      return !isMobile()
      // }
    },

    shouldViewerLayerShow () {
      return !(this.isVrMode || this.isFullscreen)
    },

    shouldPanoramasListAndFloorplanShow () {
      return !this.isShareActive &&
        !this.isMarkerInfoActive
    },

    shouldPanoramasListShow () {
      if (this.isPanoramasListActive) {
        return this.shouldPanoramasListAndFloorplanShow
      }
      return false
    },

    shouldFloorplanShow () {
      if (this.isFloorplanActive) {
        return this.shouldPanoramasListAndFloorplanShow
      }
      return false
    }
  },

  methods: {
    ...mapActions([
      'closeMarkerInfo',
      'closePopup',
      'closeShare',
      'exitFullscreen',
      'exitVrMode',
      'setScreenReady',
      'setHoveredPanorama',
      'setMarker',
      'setUIReady',
      'showPanoramasList',
      'startGyro',
      'toggleFloorplan',
      'togglePanoramasList'
    ]),

    fullscreenChangeHandler () {
      if (document.webkitIsFullScreen === false) {
        this.doExitFullscreen()
      } else if (document.mozFullScreen === false) {
        this.doExitFullscreen()
      } else if (document.msFullscreenElement === false) {
        this.doExitFullscreen()
      }
    },

    mouseenterMarker (marker, e) {
      this.setMarker(marker)
      if (marker.type === 'point' && marker.nextPanoramaId) {
        const foundPanorama = this.panoramas.find(panorama =>
          panorama.panoramaId === marker.nextPanoramaId
        ) || {}
        this.setHoveredPanorama(foundPanorama)
      }
    },

    mouseleaveMarker (e) {
      this.setMarker({})
      this.setHoveredPanorama({})
    },

    doExitFullscreen () {
      if (this.isFullscreen) {
        this.exitFullscreen()
      } else if (this.isVrMode) {
        this.exitVrMode()
      }
    },

    resizeHandler () {
      // 768 = CSS assets/css/variables.styl $response value
      if (window.innerWidth >= 768) {
        this.floorplanContainerWidth = 300
        this.floorplanContainerHeight = 300
      } else {
        this.floorplanContainerWidth = 250
        this.floorplanContainerHeight = 250
      }
    },

    initShare () {
      this.isShareReady = false
      this.$nextTick(() => {
        this.isShareReady = true
      })
    }
  },

  watch: {
    shareUrl: {
      handler () {
        this.initShare()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-i-main {
  @extend .vrsdk-absolute-full
}

.vrsdk-main-krpano-wrapper {
  z-index: $main-krpano-wrapper-z
}

.vrsdk-viewer-list-wrapper {
  @extend .vrsdk-absolute-full-width
  @extend .vrsdk-flex-center-column
  bottom: 0
  z-index: $viewer-list-wrapper-z
  pointer-events: none
  opacity: 0
  transform: translateY(100%)
  transition: transform .25s ease-out, opacity .25s ease-out

  > * {
    pointer-events: auto
  }
}

.vrsdk-viewer-list-wrapper-active {
  opacity: 1
  transform: none
}

.vrsdk-viewer-list-wrapper-collapse {
  display: none
}

.vrsdk-floorplan-wrapper {
  @extend .vrsdk-absolute-full-width
  @extend .vrsdk-flex-center
  bottom: 0
  z-index: $floorplan-wrapper-z
  opacity: 0
  transform: translateY(100%)
  transition: transform .25s ease-out, opacity .25s ease-out
  pointer-events: none

  > * {
    pointer-events: auto
  }
}

.vrsdk-floorplan-wrapper-active {
  opacity: 1
  transform: none
}

.vrsdk-floorplan-wrapper-collapse {
  display: none
}

.vrsdk-icon {
  &.vrsdk-icon-collapse-left {
    $w = $i-main-arrow-collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-left.png')
  }

  &.vrsdk-icon-collapse-right {
    $w = $i-main-arrow-collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-right.png')
  }

  &.vrsdk-icon-collapse-up {
    $w = 25px
    $h = $i-main-arrow-collapse-short-side
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-up.png')
  }

  &.vrsdk-icon-collapse-down {
    $w = 25px
    $h = $i-main-arrow-collapse-short-side
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-down.png')
  }
}

.vrsdk-share-container {
  @extend .vrsdk-flex-center-column
  position: relative
  margin: 18px auto 0
}

.vrsdk-share-container,
.vrsdk-share-text {
  width: 260px
}

.vrsdk-share-text {
  margin-top: 15px
  margin-left: auto
  margin-right: auto
}

.vrsdk-floorplan-self {
  padding: 10px
}

@media screen and (orientation: landscape) {
  .vrsdk-floorplan-wrapper {
    position: absolute
    height: 100%
    top: 0
    bottom: 0
    width: auto
    left: $i-main-floorplan-wrapper-landscape-pos
    right: auto
    transform: translateX(-($i-main-floorplan-wrapper-landscape-transform-x))
  }

  .vrsdk-floorplan-wrapper-active {
    transform: none
  }
}

@media screen and (min-width: $response) {
  .vrsdk-viewer-list-wrapper {
    opacity: 1
    transform: translateY(100%) translateY(-($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2))
  }

  .vrsdk-floorplan-wrapper {
    width: auto
    height: auto
    top: auto
    left: $i-main-floorplan-wrapper-landscape-pos
    right: auto
    bottom: 160px + 15px
    opacity: 1
    transform: translateX(-($i-main-floorplan-wrapper-landscape-transform-x)) translateX($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2)
  }

  .vrsdk-viewer-list-wrapper-collapse,
  .vrsdk-floorplan-wrapper-collapse {
    position: relative
    display: flex
    padding: $i-main-arrow-collapse-pd
    cursor: pointer
  }

  .vrsdk-viewer-list-wrapper-active,
  .vrsdk-floorplan-wrapper-active {
    transform: none
  }

  .vrsdk-share-container {
    display: flex
    flex-direction: row
    margin-top: 30px

    .vrsdk-share-list {
      margin-left: $i-main-share-container-share-list-margin
    }
  }

  .vrsdk-floorplan-self {
    padding: 20px
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-icon.vrsdk-icon-collapse-left,
    .vrsdk-icon.vrsdk-icon-collapse-right {
      transform: rotateY(180deg)
    }

    @media screen and (orientation: landscape) {
      .vrsdk-floorplan-wrapper {
        right: $i-main-floorplan-wrapper-landscape-pos
        left: auto
        transform: translateX($i-main-floorplan-wrapper-landscape-transform-x)
      }

      .vrsdk-floorplan-wrapper-active {
        transform: none
      }
    }

    @media screen and (min-width: $response) {
      .vrsdk-floorplan-wrapper {
        right: $i-main-floorplan-wrapper-landscape-pos
        left: auto
        transform: translateX($i-main-floorplan-wrapper-landscape-transform-x) translateX(-($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2))
      }

      .vrsdk-floorplan-wrapper-active {
        transform: none
      }

      .vrsdk-share-container {
        .vrsdk-share-list {
          margin-left: 0
          margin-right: $i-main-share-container-share-list-margin
        }
      }
    }
  }
}
</style>
