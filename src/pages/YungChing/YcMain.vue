<template>
  <main
    role="main"
    class="yc-main">
    <section class="yc-main-krpano-wrapper">
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
      <div class="full-center">
        <img
          :src="headquarter.brandUrl"
          :alt="headquarter.title">
      </div>
    </section>

    <!--is used to show marker point-->
    <viewer-markers-hover
      :markerPositionX="markerPositionX"
      :markerPositionY="markerPositionY"
      :isMouseOnMarkerInfo="isMouseOnMarkerInfo"
      :isMouseOnKrpanoMarker="isMouseOnKrpanoMarker"
      :mouseenterMarker="mouseenterMarker"
      :mouseleaveMarker="mouseleaveMarker"
      @setMouseOnMarkerInfo="isMouseOnMarkerInfo = $event">
    </viewer-markers-hover>

    <!--is used to show marker memo/tag-->
    <viewer-layer
      v-show="!isVrMode"
      class="bounce-in"
      :class="{ 'bounce-in-active': isMarkerInfoActive }"
      :closeEvent="closeMarkerInfo">
      <ul
        v-show="markerInfoData.type === 'memo'"
        class="viewer-layer-tabs">
        <li class="viewer-layer-li">
          <span class="viewer-layer-text">{{ $t('memo') }}</span>
        </li>
      </ul>
      <div class="viewer-layer-container">
        <marker-info></marker-info>
      </div>
    </viewer-layer>

    <section
      v-if="isShareReady"
      v-show="!(isVrMode || isFullscreen) && isShareActive"
      @click="closeShare"
      class="share">
      <div class="share-inner">
        <button
          class="share-close"
          @click="closeShare">
          <svg-icon
            name="close"
            class="icon-close">
          </svg-icon>
        </button>
        <div class="share-content">
          <qr-code
            :url="shareUrl.qrcode"
            class="is-transparent"
            innerClass="qr-code-inner"
            :width="150"
            :height="150">
            <p class="share-text">
              手機掃描QR CODE<br>立即體驗VR實境看屋
            </p>
          </qr-code>
        </div>
      </div>
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
import Icon from '../../components/Icon/index.vue'
import Instructions from '../../common/Instructions/index.vue'
import Krpano from '../../common/Krpano/index.vue'
import MarkerInfo from '../../common/ViewerLayer/MarkerInfo.vue'
import Popup from '../../components/Popup/index.vue'
import QrCode from '../../components/QrCode.vue'
import SvgIcon from '../../components/SvgIcon/index.vue'
import ViewerLayer from '../../common/ViewerLayer/index.vue'
import ViewerMarkersHover from '../../common/ViewerMarkersHover/index.vue'

export default {
  name: 'YcMain',
  components: {
    Icon,
    Instructions,
    Krpano,
    MarkerInfo,
    Popup,
    QrCode,
    SvgIcon,
    ViewerLayer,
    ViewerMarkersHover
  },

  data () {
    return {
      isMouseOnMarkerInfo: false,
      isMouseOnKrpanoMarker: false,
      isShareReady: false,
      markerPositionX: 0,
      markerPositionY: 0,
      noPanoramasImage: require('~img/trash-can.svg')
    }
  },

  mounted () {
    this.isShareReady = true
  },

  computed: {
    ...mapGetters([
      'currentBuilding',
      'headquarter',
      'isBuildingNotFound',
      'isFullscreen',
      'isMarkerInfoActive',
      'isNoPanoramasFound',
      'isPopupActive',
      'isShareActive',
      'isVrMode',
      'markerInfoData',
      'popupSizeConfig',
      'popupUrl',
      'shareUrl'
    ])
  },

  methods: {
    ...mapActions([
      'closeMarkerInfo',
      'closePopup',
      'closeShare',
      'setMarker',
      'setShareUrl'
    ]),

    mouseenterMarker (marker, e) {
      this.setMarker(marker)
    },

    mouseleaveMarker (e) {
      this.setMarker({})
    }
  },

  watch: {
    'shareUrl.qrcode': {
      handler () {
        this.isShareReady = false
        this.$nextTick(() => {
          this.isShareReady = true
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

$collapse-short-side = 16px
$collapse-pd = 15px
.yc-main {
  @extend .absolute-full
}

.yc-main-krpano-wrapper {
  z-index: $yc-main-krpano-wrapper-z
}

.icon {
  &.icon-collapse-left {
    $w = $collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../../components/Icon/img/collapse-arrow/collapse-left.svg')
  }

  &.icon-collapse-right {
    $w = $collapse-short-side
    $h = 25px
    bg-size($w, $h)
    background-image: url('../../components/Icon/img/collapse-arrow/collapse-right.svg')
  }

  &.icon-collapse-up {
    $w = 25px
    $h = $collapse-short-side
    bg-size($w, $h)
    background-image: url('../../components/Icon/img/collapse-arrow/collapse-up.svg')
  }

  &.icon-collapse-down {
    $w = 25px
    $h = $collapse-short-side
    bg-size($w, $h)
    background-image: url('../../components/Icon/img/collapse-arrow/collapse-down.svg')
  }
}

.share {
  @extend .absolute-full
  @extend .flex-center-column
  -webkit-backface-visibility: hidden
  z-index: $yc-main-share-z
  background-color: alpha($black, 50%)
}

.share-inner {
  @extend .flex-center-column
  position: relative
  width: 300px
  height: 300px
  max-width: 98%
  pointer-events: auto
  margin: 0 auto
  border-radius: 8px
}

.share-content {
  @extend .flex-center-column
  position: relative
  width: 180px
  margin: 0 auto

  .qr-code {
    width: auto
    height: auto
  }
}

.share-text {
  @extend .text-with-gray-bg
  position: relative
  font-size: 14px
  margin-top: 10px
  letter-spacing: 2px
  font-weight: normal
  line-height: 22px
  text-align: center
}

.share-close {
  @extend .btn-no-default
  position: absolute
  display: block
  right: 18px
  top: 18px
  cursor: pointer

  .icon-close-white {
    width: 20px
    height: 20px
  }
}
</style>
