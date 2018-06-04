<template>
  <div class="vrsdk-i-progress">
    <span
      class="vrsdk-i-progress-inner"
      style="background-image: linear-gradient(to right, #111, #222);"
      :style="{
        'webkit-transform': `scaleX(${currentRatio})`,
        backgroundColor: color,
        backgroundImage
      }">
    </span>
  </div>
</template>

<script>
export default {
  name: 'IProgress',
  props: {
    color: {
      type: String,
      default () {
        return ''
      }
    },
    color2: {
      type: String,
      default () {
        return ''
      }
    },
    value: {
      type: Number,
      default () {
        return 0
      }
    },
    max: {
      type: Number,
      default () {
        return 30
      }
    }
  },

  computed: {
    currentRatio () {
      const ratio = this.value / this.max
      if (ratio > 1) {
        return 1
      } else if (ratio < 0) {
        return 0
      } else {
        return ratio
      }
    },

    backgroundImage () {
      if (this.color && this.color2) {
        return `linear-gradient(to right, ${this.color}, ${this.color2})`
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.vrsdk-i-progress {
  position: relative
  height: 6px
  width: 200px
  background-color: #d8d8d8
  border-radius: 25px
  box-shadow: inset 0 -1px 1px alpha($white, 30%)
  overflow: hidden

  &.vrsdk-top-fixed {
    position: fixed
    width: 100%
    height: 8px
    top: 0
    left: 0
    right: 0
    border-radius: 0
    box-shadow: none
    background-color: transparent
  }
}

.vrsdk-i-progress-inner {
  display: block
  height: 100%
  background-color: mix($sub-color, $main-color)
  background-image: linear-gradient(to right, $sub-color, $main-color)
  position: relative
  overflow: hidden
  transition: transform .05s linear
  transform-origin: $i-progress-i-progress-inner-transform-origin
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .i-progress-inner {
      transform-origin: $i-progress-i-progress-inner-transform-origin-rtl
    }
  }
}
</style>
