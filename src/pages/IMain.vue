<template>
  <main
    role="main"
    class="i-main">
    <section class="main-krpano-wrapper">
      <!--has building, but no panoramas-->
      <div
        v-if="isNoPanoramasFound"
        class="full-center error-wrapper">
        <figure class="error-wrapper-container">
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
      v-show="!isVrMode"
      class="bounce-in"
      :class="{ 'bounce-in-active': isMarkerInfoActive }"
      :closeEvent="closeMarkerInfo">
      <ul
        v-show="markerInfoData.type === 'memo'"
        class="viewer-layer-tabs">
        <li class="viewer-layer-li full-width">
          <span class="viewer-layer-text">{{ $t('memo') }}</span>
        </li>
      </ul>
      <div class="viewer-layer-container">
        <marker-info></marker-info>
      </div>
    </viewer-layer>

    <!--share-->
    <viewer-layer
      v-show="shouldViewerLayerShow && isShareReady"
      class="bounce-in"
      :class="{ 'bounce-in-active': isShareActive }"
      :closeEvent="closeShare">
      <ul class="viewer-layer-tabs">
        <li class="viewer-layer-li viewer-layer-li-active">
          <span class="viewer-layer-text">{{ $t('share') }}</span>
        </li>
      </ul>
      <div class="viewer-layer-container">
        <div class="share-container">
          <qr-code :url="shareUrl.qrcode"></qr-code>
          <share-list></share-list>
        </div>
      </div>
    </viewer-layer>

    <!--bottom buildings and panoramas-->
    <section
      v-show="shouldViewerLayerShow"
      class="viewer-list-wrapper"
      :class="{ 'viewer-list-wrapper-active': shouldPanoramasListShow }">
      <span
        class="viewer-list-wrapper-collapse"
        @click="togglePanoramasList">
        <icon
          :class="{
            'icon-collapse-up': !isPanoramasListActive,
            'icon-collapse-down': isPanoramasListActive
          }">
        </icon>
      </span>
      <viewer-list></viewer-list>
    </section>

    <!--floorplan-->
    <section
      v-if="floorplan && floorplan !== 'none'"
      v-show="shouldViewerLayerShow"
      class="floorplan-wrapper"
      :class="{
        'floorplan-wrapper-active': shouldFloorplanShow
      }">
      <floorplan
        v-show="isFloorplanReady"
        :floorplanContainerWidth="floorplanContainerWidth"
        :floorplanContainerHeight="floorplanContainerHeight"
        class="floorplan-self"
        :isResizable="useResizeAndDraggable"
        :isDraggable="useResizeAndDraggable">
      </floorplan>
      <span
        class="floorplan-wrapper-collapse"
        @click="toggleFloorplan">
        <icon
          :class="{
            'icon-collapse-right': !isFloorplanActive,
            'icon-collapse-left': isFloorplanActive
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
import Information from '../common/ViewerLayer/Information.vue'
import Instructions from '../common/Instructions/index.vue'
import Krpano from '../common/Krpano/index.vue'
import MarkerInfo from '../common/ViewerLayer/MarkerInfo.vue'
import Popup from '../components/Popup/index.vue'
import QrCode from '../components/QrCode.vue'
import ShareList from '../common/ShareList/index.vue'
import ViewerLayer from '../common/ViewerLayer/index.vue'
import ViewerList from '../common/ViewerList/index.vue'
import ViewerMarkersHover from '../common/ViewerMarkersHover/index.vue'

export default {
  name: 'IMain',
  components: {
    Floorplan,
    Icon,
    Information,
    Instructions,
    Krpano,
    MarkerInfo,
    Popup,
    QrCode,
    ShareList,
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
      noPanoramasImage: require('img/trash-can.svg'),
      selectedInformation: {}
    }
  },

  mounted () {
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler, false)
    document.addEventListener('webkitfullscreenchange', this.fullscreenChangeHandler, false)
    document.addEventListener('mozfullscreenchange', this.fullscreenChangeHandler, false)
    window.addEventListener('resize', this.resizeHandler)

    this.isFloorplanReady = true
    this.selectedInformation = this.currentBuilding
    this.initShare()
    this.resizeHandler()

    window.setTimeout(() => {
      // if (this.$route.query.gyro !== 'false') {
      if (isMobile() && (!isIOS() || ((isIframe() && this.isGyroFromIframe && isIOS()) || !isIframe()))) {
        this.startGyro() // must after initGyroFromIframe
      }
      // }
    }, 2500)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },

  computed: {
    ...mapGetters([
      'currentBuilding',
      'customSetting',
      'floorplan',
      'isFloorplanActive',
      'isFullscreen',
      'isGyroFromIframe',
      'isInformationActive',
      'isLocationActive',
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
      'shareUrl'
    ]),

    useResizeAndDraggable () {
      if (process.env.USE_FLOORPLAN_DRAG_AND_RESIZE) {
        return !isMobile()
      }
    },

    shouldViewerLayerShow () {
      return !(this.isVrMode || this.isFullscreen)
    },

    shouldPanoramasListAndFloorplanShow () {
      return !this.isShareActive &&
        !this.isMarkerInfoActive &&
        !this.isInformationActive &&
        !this.isLocationActive
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
    },

    shouldGoogleMapActive () {
      return process.env.USE_GOOGLE_MAP &&
        this.customSetting.googleMap &&
        this.currentBuilding.hasPin &&
        this.isMapReady
    }
  },

  methods: {
    ...mapActions([
      'closeInformation',
      'closeLocation',
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
          panorama.objectId === marker.nextPanoramaId
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

    selectInformation (info) {
      this.selectedInformation = info
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
    },

    currentBuilding: {
      handler (newValue, oldValue) {
        if (oldValue.objectId === this.selectedInformation.objectId) {
          this.selectedInformation = newValue
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.i-main {
  @extend .absolute-full
}

.main-krpano-wrapper {
  z-index: $main-krpano-wrapper-z
}

.viewer-list-wrapper {
  @extend .absolute-full-width
  @extend .flex-center-column
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

.viewer-list-wrapper-active {
  opacity: 1
  transform: none
}

.viewer-list-wrapper-collapse {
  display: none
}

.floorplan-wrapper {
  @extend .absolute-full-width
  @extend .flex-center
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

.floorplan-wrapper-active {
  opacity: 1
  transform: none
}

.floorplan-wrapper-collapse {
  display: none
}

.icon {
  &.icon-collapse-left {
    $w = $i-main-arrow-collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-left.svg')
  }

  &.icon-collapse-right {
    $w = $i-main-arrow-collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-right.svg')
  }

  &.icon-collapse-up {
    $w = 25px
    $h = $i-main-arrow-collapse-short-side
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-up.svg')
  }

  &.icon-collapse-down {
    $w = 25px
    $h = $i-main-arrow-collapse-short-side
    bg-size($w, $h)
    background-image: url('../components/Icon/img/collapse-arrow/collapse-down.svg')
  }
}

.share-container {
  @extend .flex-center-column
  position: relative
  width: 240px
  margin: 18px auto 0
}

.floorplan-self {
  padding: 10px
}

@media (orientation: landscape) {
  .floorplan-wrapper {
    position: absolute
    height: 100%
    top: 0
    bottom: 0
    width: auto
    left: $i-main-floorplan-wrapper-landscape-pos
    right: auto
    transform: translateX(-($i-main-floorplan-wrapper-landscape-transform-x))
  }

  .floorplan-wrapper-active {
    transform: none
  }
}

@media (min-width: $response) {
  .viewer-list-wrapper {
    opacity: 1
    transform: translateY(100%) translateY(-($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2))
  }

  .floorplan-wrapper {
    width: auto
    height: auto
    top: auto
    left: $i-main-floorplan-wrapper-landscape-pos
    right: auto
    bottom: 160px + 15px
    opacity: 1
    transform: translateX(-($i-main-floorplan-wrapper-landscape-transform-x)) translateX($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2)
  }

  .floorplan-wrapper-has-buildings {
    bottom: 200px + 15px
  }

  .viewer-list-wrapper-collapse,
  .floorplan-wrapper-collapse {
    position: relative
    display: flex
    padding: $i-main-arrow-collapse-pd
    cursor: pointer
  }

  .viewer-list-wrapper-active,
  .floorplan-wrapper-active {
    transform: none
  }

  .share-container {
    display: flex
    flex-direction: row
    width: auto
    margin-top: 41px

    .share-list {
      margin-left: $i-main-share-container-share-list-margin
    }
  }

  .floorplan-self {
    padding: 20px
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .icon.icon-collapse-left,
  .icon.icon-collapse-right {
    transform: rotateY(180deg)
  }

  @media (orientation: landscape) {
    .floorplan-wrapper {
      right: $i-main-floorplan-wrapper-landscape-pos
      left: auto
      transform: translateX($i-main-floorplan-wrapper-landscape-transform-x)
    }

    .floorplan-wrapper-active {
      transform: none
    }
  }

  @media (min-width: $response) {
    .floorplan-wrapper {
      right: $i-main-floorplan-wrapper-landscape-pos
      left: auto
      transform: translateX($i-main-floorplan-wrapper-landscape-transform-x) translateX(-($i-main-arrow-collapse-short-side + $i-main-arrow-collapse-pd * 2))
    }

    .floorplan-wrapper-active {
      transform: none
    }

    .share-container {
      .share-list {
        margin-left: 0
        margin-right: $i-main-share-container-share-list-margin
      }
    }
  }
}
</style>