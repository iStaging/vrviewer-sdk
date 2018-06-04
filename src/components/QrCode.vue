<template>
  <div class="vrsdk-qr-code">
    <div ref="qrCode" :class="innerClass"></div>
    <slot></slot>
  </div>
</template>

<script>
import QrCode from 'davidshimjs-qrcodejs'

export default {
  name: 'QrCode',
  props: {
    url: {
      type: String,
      default () {
        return ''
      }
    },
    innerClass: {
      type: String,
      default () {
        return ''
      }
    },
    width: {
      type: Number,
      default () {
        return 200
      }
    },
    height: {
      type: Number,
      default () {
        return 200
      }
    },
    colorDark: {
      type: String,
      default () {
        return '#000'
      }
    },
    colorLight: {
      type: String,
      default () {
        return '#fff'
      }
    }
  },

  mounted () {
    const config = {
      width: this.width,
      height: this.height,
      colorDark: this.colorDark,
      colorLight: this.colorLight
    }
    generateQrCode(this.$refs.qrCode, this.url, config) // if url has changed, it need to re render
  }
}

function generateQrCode (qrCodeEl = null, url = '', config = {}) {
  const qrCode = new QrCode(qrCodeEl, config)
  if (qrCode) {
    qrCode.clear()
    qrCode.makeCode(url)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-qr-code {
  @extend .vrsdk-flex-center-column
  position: relative
  width: 260px
  height: 260px
  background-color: $white

  &.vrsdk-is-transparent {
    background-color: transparent
  }
}

.vrsdk-qr-code-inner {
  padding: 5px
  background-color: $white
}
</style>
