<template>
  <span
    class="floorplan-range"
    :style="{ 'webkit-transform': floorplanPosition }">
    <span
      class="floorplan-range-inner"
      :style="{ 'webkit-transform': floorplanRotation }">
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FloorplanRange',
  props: {
    ratioW: {
      type: Number,
      default () {
        return 1
      }
    },
    ratioH: {
      type: Number,
      default () {
        return 1
      }
    },
    xOffset: {
      type: Number,
      default () {
        return 0
      }
    },
    yOffset: {
      type: Number,
      default () {
        return 0
      }
    },
    floorplanRatioX: {
      type: Number,
      default () {
        return 1
      }
    },
    floorplanRatioY: {
      type: Number,
      default () {
        return 1
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'krpanoLookAtH',
      'krpanoXOffset'
    ]),

    floorplanPosition () {
      if (this.currentPanorama.position) {
        const x = this.currentPanorama.position.x * this.ratioW * this.floorplanRatioX + this.xOffset
        const y = this.currentPanorama.position.y * this.ratioH * this.floorplanRatioY + this.yOffset
        return `translate(${x}px, ${y}px)`
      }
      return ''
    },

    floorplanRotation () {
      if (this.currentPanorama.panoramaRotation) {
        const rotation = this.currentPanorama.floorplanRotation || 0
        const panoramaRotationY = this.currentPanorama.panoramaRotation.y || 0
        const cameraMoving = this.krpanoLookAtH - this.krpanoXOffset + panoramaRotationY
        return `rotateZ(${rotation + cameraMoving}deg)`
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'

.floorplan-range {
  transition: transform .8s ease-out
  position: absolute
  display: flex
  width: 20px
  height: 20px
  border-radius: 50%
  opacity: .9
}

.floorplan-range-inner {
  @extend .bg-center
  $w = 86px
  $h = 50px
  bg-size($w, $h)
  position: absolute
  margin-left: -33px
  margin-top: -40px
  background-image: url('img/range.png')
  transform-origin: 50% 100%
  pointer-events: none
}
</style>
