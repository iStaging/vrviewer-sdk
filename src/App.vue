<template>
  <div id="vrviewer-sdk" class="vrviewer-sdk">
    <template v-if="isBrowserSupport && isWebGlSupport">
      <default-view></default-view>
    </template>
    <template v-else>
      <div class="full-center error-wrapper">
        <div v-if="!isBrowserSupport">
          <figure class="error-wrapper-container">
            <img
              :src="noSupportedImage"
              alt="browser no support">
            <div v-html="$t('browserNoSupport')"></div>
          </figure>
        </div>
        <div v-else-if="!isWebGlSupport">
          <figure class="error-wrapper-container">
            <img
              :src="noSupportedImage"
              alt="webgl no support">
            <div v-html="$t('webGlNoSupport')"></div>
          </figure>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import DefaultView from './pages/index.vue'

export default {
  name: 'app',
  components: {
    DefaultView
  },

  data () {
    return {
      isBrowserSupport: false,
      isWebGlSupport: false,
      noSupportedImage: require('img/error.png')
    }
  },

  mounted () {
    if (!Function('/*@cc_on return document.documentMode===10@*/ ')()) { // eslint-disable-line
      // if (!(window.ActiveXObject) && 'ActiveXObject' in window) {
      this.isBrowserSupport = true
    }

    const canvas = document.createElement('canvas')
    // Get WebGLRenderingContext from canvas element.
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) { // eslint-disable-line
      this.isWebGlSupport = true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'stylesheets/global.styl'

#vrviewer-sdk {
  .app {
    height: 100%
  }

  .error-wrapper {
    background-color: #f1f8fc
    pointer-events: auto

    .error-wrapper-container {
      @extend .flex-center-column
      text-align: center

      img {
        margin-bottom: 20px
      }

      &, p, h3 {
        color: $black
        text-shadow: none
      }

      a {
        color: $pink-color
        text-decoration: none
        display: inline-block
        padding: 0 3px
        text-shadow: none

        &:hover {
          text-decoration: underline
        }
      }

      h3 {
        font-size: 18px
        letter-spacing: -.4px
      }

      p, a {
        font-size: 14px
        letter-spacing: -.3px
      }

      h3, p, a {
        margin-top: 7px
      }

      h3 {
        font-size: 18px
        letter-spacing: -.4px
      }

      p, a {
        font-size: 14px
        letter-spacing: -.3px
      }

      h3, p, a {
        margin-top: 7px
      }
    }
  }
}
</style>
