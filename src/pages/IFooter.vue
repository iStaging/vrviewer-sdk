<template>
  <footer
    class="vrsdk-i-footer vrsdk-fade-in-out"
    :class="{
      'vrsdk-fade-in-out-active': !isPanoramasListActive,
      'vrsdk-screen-ready': isScreenReady
    }"
    role="contentinfo">
    <span class="vrsdk-footer-powered-text">
      Powered by iStaging
    </span>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IFooter',
  computed: {
    ...mapGetters([
      'isPanoramasListActive',
      'isScreenReady'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-i-footer {
  @extend .vrsdk-absolute-full-width
  bottom: 0
  opacity: 0
  transform: translateY(20px)
  transition: .3s opacity ease-out, .3s transform ease-out

  &.vrsdk-screen-ready {
    opacity: 1
    transform: none
  }
}

.vrsdk-footer-powered-text {
  z-index: $footer-powered-text-z
  position: absolute
  display: inline-block
  left: $footer-footer-powered-text-pos
  bottom: 16px
  font-size: 12px
  transform: scale(.83) // font-size: 10px
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-footer-powered-text {
      left: auto
      right: $footer-footer-powered-text-pos
    }
  }
}
</style>
