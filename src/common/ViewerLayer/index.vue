<docs>
  Show this layer in center, with a dark gray background color
</docs>

<template>
  <section class="viewer-layer">
    <div
      :aria-label="$t('close')"
      class="viewer-layer-close-bg"
      @click="closeEvent">
    </div>
    <div
      class="viewer-layer-inner"
      :class="innerClassName">
      <button
        :aria-label="$t('close')"
        class="viewer-layer-close"
        @click="closeEvent">
        <icon class="icon-close-info-white"></icon>
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

.viewer-layer {
  @extend .absolute-full
  @extend .flex-center
  z-index: $viewer-layer-m-z
  color: $white
}

.viewer-layer-inner {
  @extend .full
  @extend .overflow-auto
  position: relative
  padding: 48px 20px 20px
  max-height: 100%
  background-color: alpha($dark-gray, 90%)
  box-shadow: 0 1px 1px rgba(20, 20, 20, .6)
  pointer-events: auto
}

.viewer-layer-close {
  @extend .flex-center
  @extend .btn-no-default
  position: fixed
  right: $viewer-layer-viewer-layer-close
  top: 7px
  padding: 10px
  z-index: $viewer-layer-close-z

  .icon-close-info-white {
    $w = 20px
    $h = 20px
    bg-size($w, $h)
  }
}

.viewer-layer-second-inner {
  padding: 25px 0 0
}

.viewer-layer-tabs {
  @extend .flex-center
  position: relative
  overflow: hidden
  height: $tabs-height
}

.viewer-layer-container {
  position: relative
  height: "calc(100% - %s)" % $tabs-height
  overflow: auto
}

.viewer-layer-li {
  @extend .flex-center
  position: relative
  z-index: $viewer-layer-li-z
  min-width: 50%

  &::after {
    @extend .absolute-full-width
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

.viewer-layer-li-active {
  &::after {
    background-color: $pink-color
    height: 4px
  }
}

.viewer-layer-text {
  @extend .text-ellipsis
  @extend .btn-no-default
  @extend .text-with-gray-bg
  padding: $tabs-text-pd 0
  line-height: $tabs-text-lh
  position: relative
  text-align: center
  font-size: 14px
  width: 100%
}

.viewer-layer-close-bg {
  @extend .absolute-full
}

@media screen and (min-width: $response) {
  .viewer-layer-close {
    position: absolute
  }

  .viewer-layer-inner {
    max-width: 700px
    max-height: 450px
    padding: 50px 30px 30px
    border-radius: 8px
  }

  .viewer-layer-second-inner {
    padding: 50px 30px 10px
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .viewer-layer-close {
    right: auto
    left: $viewer-layer-viewer-layer-close
  }
}
</style>
