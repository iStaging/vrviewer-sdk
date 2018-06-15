<docs>
  This is only show for markers point hover event
</docs>

<template>
  <div
    v-show="shouldShowMarkerInfo"
    class="vrsdk-viewer-markers-hover"
    :style="markerInfoPosition">
    <div
      @mouseover="htmlMarkerMousein"
      @mouseleave="htmlMarkerMouseout">
      <point v-show="currentMarker.type === 'point'"></point>
      <shopping
        v-show="currentMarker.type === 'custom' && currentMarker.iconType === 'shopping'">
      </shopping>
      <stop-watch
        v-show="currentMarker.type === 'custom' && currentMarker.iconType === 'stopwatch'">
      </stop-watch>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  includes,
  isMobile
} from '@/api/utils'
import Point from './Point'
import Shopping from './CustomizedTag/Shopping'
import StopWatch from './CustomizedTag/StopWatch'

export default {
  name: 'ViewerMarkersHover',
  components: {
    Point,
    Shopping,
    StopWatch
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
      return !isMobile() &&
        includes(['point', 'customi'], this.currentMarker.type)
    },

    markerInfoPosition () {
      if (!isMobile()) {
        return {
          left: `${this.markerPositionX}px`,
          top: `${this.markerPositionY - 30}px`
        }
      }
      return {}
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
.vrsdk-viewer-markers-hover {
  position: absolute
  height: auto
  color: $white
  max-width: 660px
  max-height: 80%
  font-size: 20px
  z-index: 4
  transform: translate(-50%, -100%)
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
</style>
