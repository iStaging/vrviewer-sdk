<template>
  <div class="floorplan-dots">
    <span
      v-for="panorama in panoramas"
      class="floorplan-point"
      :class="{
        'active': hoveredPanorama.panoramaId === panorama.panoramaId
      }"
      :style="{
        '-webkit-transform': pointPosition(panorama)
      }"
      @mouseenter="setHoveredPanorama(panorama)"
      @mouseleave="setHoveredPanorama({})"
      @click="selectPanorama(panorama)">
    </span>
    <span
      v-if="currentPanorama.position"
      class="floorplan-activated-point"
      :style="{
        '-webkit-transform': pointPosition(currentPanorama),
        backgroundColor: activatedColor
      }">
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FloorplanDots',
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
    },
    activatedColor: {
      type: String,
      default () {
        return ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'hoveredPanorama',
      'krpanoEl',
      'panoramas'
    ])
  },

  methods: {
    ...mapActions([
      'setHoveredPanorama'
    ]),

    selectPanorama (panorama = {}) {
      if (panorama.panoramaId !== this.currentPanorama.panoramaId) {
        this.krpanoEl.call(`prepare_change_scene(panorama_${panorama.panoramaId}, ${panorama.panoramaId}, 'FloorplanDots');`)
      }
    },

    pointPosition (panorama) {
      const x = (panorama.position ? panorama.position.x : 0) * this.ratioW * this.floorplanRatioX + this.xOffset
      const y = (panorama.position ? panorama.position.y : 0) * this.ratioH * this.floorplanRatioY + this.yOffset
      return `translate(${x}px, ${y}px)`
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.floorplan-point {
  cursor: pointer
  background-color: alpha($white, 40%)
  box-shadow: 0 1px 10px alpha($dark-gray, .8)
  transition: transform .25s ease-out

  &.active, &:hover {
    background-color: $light-pink-color
  }
}

.floorplan-activated-point {
  opacity: .9
  transition: transform .8s ease-out
}

.floorplan-point,
.floorplan-activated-point {
  position: absolute
  display: flex
  width: 20px
  height: 20px
  border-radius: 50%
}

.floorplan-activated-point {
  background-color: alpha($pink-color, .9)
}
</style>
