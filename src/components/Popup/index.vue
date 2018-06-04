<template>
  <section
    class="vrsdk-popup"
    @click="closePopup">
    <div
      class="vrsdk-popup-inner"
      :style="popupInnerStyle">
      <div
        class="vrsdk-popup-iframe-container"
        :style="popupContainerStyle">
        <a
          href="javascript:"
          @click="closePopup">
          <span class="vrsdk-popup-close"></span>
        </a>
        <div
          v-if="isIFrameNoSupportTimeout"
          class="vrsdk-popup-iframe-hint">
          {{ $t('urlNoSupportIFrameError') }}
        </div>
        <iframe
          class="vrsdk-embed-responsive-item"
          :src="url"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </section>
</template>

<script>
import {
  POPUP
} from '@/api/constants'

export default {
  name: 'Popup',
  props: {
    url: {
      type: String,
      default () {
        return ''
      }
    },
    width: {
      type: Number,
      default () {
        return POPUP.WIDTH
      }
    },
    height: {
      type: Number,
      default () {
        return POPUP.HEIGHT
      }
    },
    widthPercent: {
      type: Number,
      default () {
        return POPUP.WIDTH_PERCENT
      }
    },
    widthType: {
      type: String,
      default () {
        return POPUP.WIDTH_TYPE // percent, pixel
      }
    }
  },

  data () {
    return {
      isIFrameNoSupportTimeout: false
    }
  },

  mounted () {
    window.setTimeout(() => {
      this.isIFrameNoSupportTimeout = true
    }, 2000)
  },

  computed: {
    popupInnerStyle () {
      return {
        width: this.widthType === 'percent'
          ? (`${this.widthPercent || POPUP.WIDTH_PERCENT}%`)
          : 'auto'
      }
    },

    popupContainerStyle () {
      if (this.widthType === 'pixel') {
        return {
          paddingBottom: 0,
          width: `${this.width || POPUP.WIDTH}px`,
          height: `${this.height || POPUP.HEIGHT}px`
        }
      }
      return {}
    }
  },

  methods: {
    closePopup () {
      this.$emit('closePopup')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-popup {
  @extend .vrsdk-position-fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: $popup-z
  background-color: alpha($black, 70%)
}

.vrsdk-popup-inner {
  @extend .vrsdk-flex-center
  margin: 0 auto
  position: relative
  min-width: 320px
  width: 65%
  height: 100%
}

.vrsdk-popup-iframe-container {
  position: relative
  padding-bottom: 56.25%
  width: calc(100% - 20px)
  max-width: calc(100% - 20px)
  max-height: calc(100% - 20px)
  background-color: $white

  iframe {
    @extend .vrsdk-absolute-full
    border: 0
  }
}

.vrsdk-popup-close {
  bg-size(34px, 34px)
  display: inline-block
  position: absolute
  z-index: $popup-close-z
  right: -17px
  top: -17px
  background-position: center center
  background-image: url('img/close-popup.png')
}

.vrsdk-popup-iframe-hint {
  @extend .vrsdk-absolute-full
  @extend .vrsdk-flex-center
  text-shadow: none
}
</style>
