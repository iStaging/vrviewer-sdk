<docs>
  This is only show for markers point hover event
</docs>

<template>
  <div
    v-show="shouldShowMarkerInfo"
    class="viewer-markers-hover"
    :style="markerInfoPosition">
    <div
      class="viewer-markers-hover-inner"
      @mouseover="htmlMarkerMousein"
      @mouseleave="htmlMarkerMouseout">
      <div v-show="currentMarker.type === 'point'">
        <div class="viewer-markers-hover-thumbnail">
          <icon
            class="viewer-markers-hover-thumbnail-inner"
            :image="nextPanorama.thumbnail"
            :style="{ backgroundPosition: nextThumbnailPosition }"
            :hasLazyload="true">
          </icon>
        </div>
        <p class="viewer-markers-hover-text">
          {{ nextPanoramaName }}
        </p>
      </div>
      <div class="decoration"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isMobile, isEmpty } from '@/api/utils'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'ViewerMarkersHover',
  components: {
    Icon
  },

  props: {
    markerPositionX: {
      type: Number,
      default () {
        return 0
      }
    },
    markerPositionY: {
      type: Number,
      default () {
        return 0
      }
    },
    isMouseOnMarkerInfo: {
      type: Boolean,
      default () {
        return false
      }
    },
    isMouseOnKrpanoMarker: {
      type: Boolean,
      default () {
        return false
      }
    },
    mouseenterMarker: {
      type: Function,
      default () {
        return () => {}
      }
    },
    mouseleaveMarker: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentMarker',
      'panoramas'
    ]),

    shouldShowMarkerInfo () {
      return !isMobile() && this.currentMarker.type === 'point'
    },

    nextPanorama () {
      if (isEmpty(this.panoramas) || this.panoramas.length === 0) {
        return {}
      }
      const nextPanorama = this.panoramas.find(panorama => panorama.panoramaId === this.currentMarker.nextPanoramaId)
      return nextPanorama || {}
    },

    nextThumbnailPosition () {
      if (this.currentMarker.type === 'point') {
        const baseRotation = 0.833 // 300 / 360 // same to stylus variable: $width
        const positionOffset = 90 // fix a-frame panorama rotation offset
        const nextRotation = this.currentMarker.nextRotation ? this.currentMarker.nextRotation.y : 0
        const calcPosition = (nextRotation * baseRotation) - positionOffset
        return `${calcPosition}px 0px`
      }
    },

    markerInfoPosition () {
      if (!isMobile()) {
        return {
          left: `${this.markerPositionX}px`,
          top: `${this.markerPositionY}px`
        }
      }
      return {}
    },

    nextPanoramaName () {
      return this.nextPanorama
        ? (this.nextPanorama.customPanoramaName || this.$t(this.nextPanorama.panoramaName))
        : ''
    }
  },

  methods: {
    ...mapActions([
      'setMarker'
    ]),

    htmlMarkerMousein () {
      this.$emit('setMouseOnMarkerInfo', true)
    },

    htmlMarkerMouseout () {
      this.$emit('setMouseOnMarkerInfo', false)
      this.$nextTick(() => {
        if (this.isMouseOnMarkerInfo === false &&
          this.isMouseOnKrpanoMarker === false) {
          this.mouseleaveMarker()
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

$width = 300px
$height = 145.8px
.viewer-markers-hover {
  position: absolute
  height: auto
  color: $white
  max-width: 660px
  max-height: 80%
  font-size: 20px
  z-index: $viewer-markers-hover-z
  transform: translate(-50%, -100%)
}

.viewer-markers-hover-inner {
  @extend .clear
  position: relative
  display: flex
  flex-direction: column
  background-color: alpha($dark-gray, 80%)
  padding: 10px
  align-self: center
  max-height: 80%
  z-index: $viewer-markers-hover-z
  border-radius: 4px
}

.viewer-markers-hover-thumbnail {
  position: relative
  width: $width
  height: $height
  overflow: hidden

  .viewer-markers-hover-thumbnail-inner {
    background-repeat: repeat
  }
}

.viewer-markers-hover-thumbnail-inner {
  width: inherit
  height: inherit
  background-size: $width $height
  animation-duration: .6s
  animation-name: point-thumbnail-animation
  animation-timing-function: ease-out
  animation-fill-mode: forwards

  @keyframes point-thumbnail-animation {
    from {
      transform: scale(1)
    }
    to {
      transform: scale(1.3)
    }
  }
}

.viewer-markers-hover-text {
  @extend .text-with-gray-bg
  position: relative
  line-height: 20px
  font-size: 14px
  text-align: center
  max-height: 40px
  overflow: hidden
  margin: 5px 0 0
}

.decoration {
  $bd = 10px
  position: absolute
  bottom: 0
  margin-bottom: -($bd * 2 - 1px)
  left: 50%
  transform: translateX(-50%)
  opacity: .8
  font-size: 0
  line-height: 0
  width: 0
  border-top: $bd solid $dark-gray
  border-bottom: $bd solid transparent
  border-left: $bd solid transparent
  border-right: $bd solid transparent
}
</style>
