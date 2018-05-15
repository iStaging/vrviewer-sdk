<template>
  <footer
    class="i-footer fade-in-out"
    :class="{
      'fade-in-out-active': !isPanoramasListActive,
      'screen-ready': isScreenReady
    }"
    role="contentinfo">
    <span class="footer-powered-text">
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

.i-footer {
  @extend .absolute-full-width
  bottom: 0
  opacity: 0
  transform: translateY(20px)
  transition: .3s opacity ease-out, .3s transform ease-out

  &.screen-ready {
    opacity: 1
    transform: none
  }
}

.footer-powered-text {
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

#vrviewer-sdk {
  .theme-rtl.theme-rtl-overlap {
    .footer-powered-text {
      left: auto
      right: $footer-footer-powered-text-pos
    }
  }
}
</style>
