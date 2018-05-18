<template>
  <section
    class="vrsdk-full-center vrsdk-loading"
    :class="{
      'vrsdk-loading-active': isProgressActive,
      'vrsdk-loading-init-complete': isAppReady,
      'vrsdk-transparent': isTransparent
    }">
    <h1
      v-show="isProgressActive && !isAppReady"
      class="vrsdk-progress-preview-title">
      {{ currentPanoCollection.name }}
    </h1>
    <!--.top-fixed = put the progress bar to top, not in center-->
    <i-progress
      v-show="isProgressActive"
      :class="{ 'vrsdk-top-fixed': isAppReady }"
      :value="progressValue"
      :max="progressMax"
      :color="color"
      :color2="color2">
    </i-progress>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import IProgress from '../components/IProgress.vue'

export default {
  name: 'Loading',
  components: {
    IProgress
  },

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
    }
  },

  computed: {
    ...mapGetters([
      'currentPanoCollection',
      'isAppReady',
      'isProgressActive',
      'progressMax',
      'progressValue'
    ]),

    isTransparent () {
      // return this.$route.query.background === 'transparent'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-loading {
  z-index: $loading-z

  &.vrsdk-loading-active {
    background-color: $loading-bgc

    &.vrsdk-transparent {
      background-color: transparent
    }
  }

  &.vrsdk-loading-init-complete {
    background-color: transparent
    pointer-events: none
    transition: .8s background-color ease-out 1s

    &.vrsdk-loading-active {
      background-color: transparent
    }
  }
}

.vrsdk-progress-preview-title {
  @extend .vrsdk-text-with-gray-bg
  line-height: 25px
  font-size: 18px
  margin-bottom: 21px
}
</style>
