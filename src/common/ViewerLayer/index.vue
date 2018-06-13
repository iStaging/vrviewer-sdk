<docs>
  Show this layer in center, with a dark gray background color
</docs>

<template>
  <section class="vrsdk-viewer-layer">
    <div
      class="vrsdk-viewer-layer-close-bg"
      :aria-label="$t('close')"
      @click="closeEvent">
    </div>
    <div
      class="vrsdk-viewer-layer-inner"
      :class="innerClassName">
      <button
        class="vrsdk-viewer-layer-close"
        :aria-label="$t('close')"
        @click="closeEvent">
        <icon class="vrsdk-icon-close-info-white"></icon>
      </button>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'ViewerLayer',
  components: {
    Icon
  },
  props: {
    closeEvent: {
      type: Function,
      default () {
        return () => {}
      }
    },
    innerClassName: {
      type: String,
      default () {
        return ''
      }
    }
  },

  mounted () {
    window.addEventListener('keydown', this.viewerLayerKeydown)
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.viewerLayerKeydown)
  },

  methods: {
    viewerLayerKeydown (e) {
      if (e.keyCode === 27) { // 27 = esc
        this.closeEvent()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

$tabs-text-lh = 20px
$tabs-text-pd = 7px
$tabs-height = $tabs-text-lh + $tabs-text-pd * 2

.vrsdk-viewer-layer {
  @extend .vrsdk-absolute-full
  @extend .vrsdk-flex-center
  z-index: $vrsdk-viewer-layer-m-z
  color: $white
}

.vrsdk-viewer-layer-inner {
  @extend .vrsdk-full
  @extend .vrsdk-overflow-auto
  position: relative
  padding: 48px 20px 20px
  max-height: 100%
  background-color: alpha($dark-gray, 90%)
  box-shadow: 0 1px 1px rgba(20, 20, 20, .6)
  pointer-events: auto
}

.vrsdk-viewer-layer-close {
  @extend .vrsdk-flex-center
  @extend .vrsdk-btn-no-default
  position: fixed
  right: $vrsdk-viewer-layer-vrsdk-viewer-layer-close
  top: 7px
  padding: 10px
  z-index: $vrsdk-viewer-layer-close-z

  .vrsdk-icon-close-info-white {
    $w = 20px
    $h = 20px
    bg-size($w, $h)
  }
}

.vrsdk-viewer-layer-second-inner {
  padding: 25px 0 0
}

.vrsdk-viewer-layer-tabs {
  @extend .vrsdk-flex-center
  position: relative
  overflow: hidden
  height: $tabs-height
}

.vrsdk-viewer-layer-container {
  position: relative
  // height: "calc(100% - %s)" % $tabs-height
  height: 100%
  overflow: auto
}

.vrsdk-viewer-layer-li {
  @extend .vrsdk-flex-center
  position: relative
  z-index: $vrsdk-viewer-layer-li-z
  min-width: 50%

  &::after {
    @extend .vrsdk-absolute-full-width
    content: ''
    bottom: 0
    height: 1px
    background-color: $light-gray-color
  }

  &:nth-child(n + 2) {
    &::before {
      content: ''
      position: absolute
      left: 0
      bottom: 5px
      height: $tabs-text-lh
      width: 1px
      background-color: alpha($white, 70%)
    }
  }
}

.vrsdk-viewer-layer-li-active {
  &::after {
    background-color: $main-color
    height: 4px
  }
}

.vrsdk-viewer-layer-text {
  @extend .vrsdk-text-ellipsis
  @extend .vrsdk-btn-no-default
  @extend .vrsdk-text-with-gray-bg
  padding: $tabs-text-pd 0
  line-height: $tabs-text-lh
  position: relative
  text-align: center
  font-size: 14px
  width: 100%
}

.vrsdk-viewer-layer-close-bg {
  @extend .vrsdk-absolute-full
}

@media screen and (min-width: $response) {
  .vrsdk-viewer-layer-close {
    position: absolute
  }

  .vrsdk-viewer-layer-inner {
    max-width: 700px
    max-height: 450px
    padding: 50px 30px 30px
    border-radius: 8px
  }

  .vrsdk-viewer-layer-second-inner {
    padding: 50px 30px 10px
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-viewer-layer-close {
      right: auto
      left: $vrsdk-viewer-layer-vrsdk-viewer-layer-close
    }
  }
}
</style>
