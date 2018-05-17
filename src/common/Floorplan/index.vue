<docs>
  Floorplan
</docs>

<template>
  <section class="floorplan">
    <div
      class="floorplan-container"
      :class="{
        'floorplan-dragging': isDragging,
        'floorplan-overflow-hidden': isDraggable || isResizable
      }"
      @mousedown="handleDragStart"
      @mousewheel="handleScroll"
      @DOMMouseScroll="handleScroll">
      <span
        class="floorplan-inner"
        :style="{
          transform: `translate(${interactX}px, ${interactY}px)`
        }">
        <icon
          class="floorplan-image"
          :hasLazyload="true"
          :image="floorplan"
          :style="{
            width: `${floorplanContainerWidth}px`,
            height: `${floorplanContainerHeight}px`,
            transform: `translateZ(${floorplanZ}px)`
          }">
          <floorplan-dots
            :ratioW="ratioW"
            :ratioH="ratioH"
            :xOffset="xOffset"
            :yOffset="yOffset"
            :floorplanRatioX="floorplanRatioX"
            :floorplanRatioY="floorplanRatioY"
            :activatedColor="activatedColor">
          </floorplan-dots>
          <floorplan-range
            :ratioW="ratioW"
            :ratioH="ratioH"
            :xOffset="xOffset"
            :yOffset="yOffset"
            :floorplanRatioX="floorplanRatioX"
            :floorplanRatioY="floorplanRatioY">
          </floorplan-range>
        </icon>
      </span>
      <i-repeat
        v-if="isResizable"
        class="floorplan-zoom-in-container"
        liClass="floorplan-zoom-in-item"
        :model="filterItem(zoomInButtons, 'name')">
        <icon
          v-for="button in zoomInButtons"
          :key="button.name"
          :slot="button.name"
          :class="button.className"
          @click.native="button.method">
        </icon>
      </i-repeat>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from '../../components/Icon/index.vue'
import IRepeat from '../../components/IRepeat.vue'
import FloorplanDots from './FloorplanDots.vue'
import FloorplanRange from './FloorplanRange.vue'
import HandleData from '../../mixins/HandleData.vue'

export default {
  name: 'Floorplan',
  components: {
    FloorplanRange,
    FloorplanDots,
    Icon,
    IRepeat
  },

  mixins: [
    HandleData
  ],

  props: {
    floorplanContainerWidth: {
      type: Number,
      default () {
        return 200
      }
    },
    floorplanContainerHeight: {
      type: Number,
      default () {
        return 200
      }
    },
    activatedColor: {
      type: String,
      default () {
        return ''
      }
    },
    isResizable: {
      type: Boolean,
      default () {
        return false
      }
    },
    isDraggable: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  data () {
    return {
      floorplanHeight: this.floorplanContainerHeight,
      floorplanRatioX: 1,
      floorplanRatioY: 1,
      floorplanWidth: this.floorplanContainerWidth,
      floorplanZ: 0,
      floorplanZMax: 150,
      floorplanZMin: -80,
      interactX: 0,
      interactY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
      xOffset: 0,
      yOffset: 0,
      zoomInButtons: [{
        name: 'zoom-in',
        className: 'icon-floorplan-add',
        method: () => {
          this.setFloorplanZ(75)
        }
      }, {
        name: 'zoom-out',
        className: 'icon-floorplan-minus',
        method: () => {
          this.setFloorplanZ(-75)
        }
      }]
    }
  },

  mounted () {
    if (this.isDraggable) {
      window.addEventListener('mousemove', this.handleDragging)
      window.addEventListener('mouseup', this.handleDragStop)
    }
    if (this.floorplan) {
      const image = new Image() // eslint-disable-line
      image.src = this.floorplan
      image.onload = () => {
        this.floorplanWidth = image.width
        this.floorplanHeight = image.height
        const offset = (this.floorplanWidth - this.floorplanHeight) / 2
        const containerOffset = (this.floorplanContainerWidth - this.floorplanContainerHeight) / 2
        // 正值代表與長寬設定值較扁的長方形圖，負值代表與長寬設定值較高的長方形圖
        if (this.ratioW < this.ratioH) {
          this.yOffset = offset * this.ratioW - containerOffset
          this.floorplanRatioY = (this.floorplanHeight / this.floorplanWidth) / (this.floorplanContainerHeight / this.floorplanContainerWidth)
        } else if (this.ratioW > this.ratioH) {
          this.xOffset = -(offset * this.ratioH - containerOffset)
          this.floorplanRatioX = (this.floorplanWidth / this.floorplanHeight) / (this.floorplanContainerWidth / this.floorplanContainerHeight)
        }
      }
    }
  },

  beforeDestroy () {
    if (this.isDraggable) {
      window.removeEventListener('mousemove', this.handleDragging)
      window.removeEventListener('mouseup', this.handleDragStop)
    }
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'floorplan',
      'panoramas'
    ]),

    ratioW () {
      return this.floorplanContainerWidth / this.floorplanWidth
    },

    ratioH () {
      return this.floorplanContainerHeight / this.floorplanHeight
    }
  },

  methods: {
    setFloorplanZ (n = 0) {
      if ((this.floorplanZ + n) > this.floorplanZMax) {
        this.floorplanZ = this.floorplanZMax
      } else if ((this.floorplanZ + n) < this.floorplanZMin) {
        this.floorplanZ = this.floorplanZMin
      } else {
        this.floorplanZ += n
      }
    },

    handleScroll (e = null) {
      if (this.isResizable) {
        e.preventDefault()
        e.stopPropagation()
        const ratio = 12.5
        const n = (e.wheelDelta ? e.wheelDelta : -e.detail) > 0 ? ratio : -ratio
        this.setFloorplanZ(n)
      }
    },

    handleDragStart (e = null) {
      if (this.isDraggable) {
        this.lastX = e.pageX - this.interactX
        this.lastY = e.pageY - this.interactY
        this.isDragging = true
      }
    },

    handleDragging (e = null) {
      if (this.isDragging) {
        this.cancelSelection()
        this.interactX = e.pageX - this.lastX
        this.interactY = e.pageY - this.lastY
        const ratio = 0.75
        ;[this.interactX, this.interactY] = limitPosition(this.floorplanWidth * ratio, this.floorplanHeight * ratio, this.interactX, this.interactY)
      }
    },

    cancelSelection () {
      if (window.getSelection) {
        if (window.getSelection().empty) { // Chrome
          window.getSelection().empty()
        } else if (window.getSelection().removeAllRanges) { // Firefox
          window.getSelection().removeAllRanges()
        }
      } else if (document.selection) { // IE?
        document.selection.empty()
      }
    },

    handleDragStop () {
      this.isDragging = false
    }
  }
}

function limitPosition (limitW = 0, limitH = 0, x = 0, y = 0) {
  if (x < -limitW) {
    x = -limitW
  }
  if (y < -limitH) {
    y = -limitH
  }
  if (x > limitW) {
    x = limitW
  }
  if (y > limitH) {
    y = limitH
  }
  return [x, y]
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.floorplan {
  @extend .full
  @extend .flex-center
  position: relative
  background-color: alpha($dark-gray, 80%)
}

.floorplan-image {
  @extend .bg-center
  position: relative
  background-size: contain
  transition: transform .1s ease-out
}

.floorplan-container {
  @extend .flex-center
  position: relative
  background-color: $white

  &.floorplan-overflow-hidden {
    overflow: hidden
  }
}

.floorplan-dragging {
  cursor: move
}

.floorplan-inner {
  @extend .flex-center
  perspective: 225px
}

.floorplan-zoom-in-container {
  position: absolute
  right: $floorplan-floorplan-zoom-in-container-pos
  bottom: 0
  margin-bottom: 10px
  margin-right: $floorplan-floorplan-zoom-in-container-margin
  border-width: .5px
  border-style: solid
  border-color: alpha(#979797, 80%)
  background-color: alpha($white, 80%)

  .icon {
    @extend .full
    background-size: 20px 20px
  }
}

>>> .floorplan-zoom-in-item {
  @extend .flex-center-column
  position: relative
  width: 30px
  height: 30px
  cursor: pointer

  & + & {
    &::before {
      content: ''
      position: absolute
      top: 0
      left: 4px
      right: 4px
      height: 0.5px
      background-color: alpha(#979797, 80%)
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .theme-rtl.theme-rtl-overlap {
    // floorplan no need to be rtl
    .floorplan-container {
      direction: ltr
    }

    .floorplan-zoom-in-container {
      right: auto
      left: $floorplan-floorplan-zoom-in-container-pos
      margin-right: auto
      margin-left: $floorplan-floorplan-zoom-in-container-margin
    }
  }
}
</style>
