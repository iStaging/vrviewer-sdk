<template>
  <div class="vrsdk-viewer-markers-hover-point-inner">
    <div class="vrsdk-viewer-markers-hover-thumbnail">
      <icon
        class="vrsdk-viewer-markers-hover-thumbnail-inner"
        :image="nextPanorama.thumbnail"
        :style="{ backgroundPosition: nextThumbnailPosition }"
        :hasLazyload="true">
      </icon>
    </div>
    <p class="vrsdk-viewer-markers-hover-text">
      {{ nextPanorama.name }}
    </p>
    <div class="vrsdk-decoration"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  isEmpty
} from '@/api/utils'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'Point',
  components: {
    Icon
  },

  computed: {
    ...mapGetters([
      'currentMarker',
      'panoramas'
    ]),

    nextPanorama () {
      if (isEmpty(this.panoramas) || this.panoramas.length === 0) {
        return {}
      }
      const nextPanorama = this.panoramas.find(panorama => panorama.id === this.currentMarker.nextPanoId)
      return nextPanorama || {}
    },

    nextThumbnailPosition () {
      if (this.currentMarker.type === 'point') {
        const baseRotation = 0.833 // 300 / 360 // same to stylus variable: $width
        const positionOffset = 90 // fix a-frame panorama rotation offset
        const nextRotation = this.currentMarker.nextRotation || { y: 0 }
        const calcPosition = (nextRotation.y * baseRotation) - positionOffset
        return `${calcPosition}px 0px`
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

$width = 300px
$height = 145.8px
.vrsdk-viewer-markers-hover-point-inner {
  @extend .vrsdk-clear
  position: relative
  display: flex
  flex-direction: column
  background-color: alpha($dark-gray, 80%)
  padding: 10px
  align-self: center
  max-height: 80%
  z-index: 4
  border-radius: 4px
}

.vrsdk-viewer-markers-hover-customized-tag-inner {
  @extend .vrsdk-clear
  position: relative
  display: flex
  flex-direction: column
  background-color: $black
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5)
  align-self: center
  max-height: 80%
  z-index: 4
  border-radius: 5px
}

.vrsdk-viewer-markers-hover-thumbnail {
  position: relative
  width: $width
  height: $height
  overflow: hidden

  .vrsdk-viewer-markers-hover-thumbnail-inner {
    background-repeat: repeat
  }
}

.vrsdk-viewer-markers-hover-thumbnail-inner {
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

.vrsdk-viewer-markers-hover-text {
  @extend .vrsdk-text-with-gray-bg
  position: relative
  line-height: 20px
  font-size: 14px
  text-align: center
  max-height: 40px
  overflow: hidden
  margin: 5px 0 0
}

.vrsdk-decoration {
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
