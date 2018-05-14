<template>
  <section
    class="full-center loading"
    :class="{
      'loading-active': isProgressActive,
      'loading-init-complete': isAppReady,
      'transparent': isTransparent
    }">
    <h1
      v-show="isProgressActive && !isAppReady"
      class="progress-preview-title">
      {{ currentBuilding.name }}
    </h1>
    <!--.top-fixed = put the progress bar to top, not in center-->
    <i-progress
      v-show="isProgressActive"
      :class="{ 'top-fixed': isAppReady }"
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
      'currentBuilding',
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

.loading {
  z-index: $loading-z

  &.loading-active {
    background-color: $loading-bgc

    &.transparent {
      background-color: transparent
    }
  }

  &.loading-init-complete {
    background-color: transparent
    pointer-events: none
    transition: .8s background-color ease-out 1s

    &.loading-active {
      background-color: transparent
    }
  }
}

.progress-preview-title {
  @extend .text-with-gray-bg
  line-height: 25px
  font-size: 18px
  margin-bottom: 21px
}
</style>
