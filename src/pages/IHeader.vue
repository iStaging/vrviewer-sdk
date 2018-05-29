<template>
  <header
    v-show="!isVrMode && !isFullscreen"
    class="vrsdk-i-header">
    <div
      class="vrsdk-header-intro"
      :class="{ 'vrsdk-screen-ready': isScreenReady }">
      <pano-collection-info></pano-collection-info>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import PanoCollectionInfo from '../common/PanoCollectionInfo/index.vue'

export default {
  name: 'IHeader',
  components: {
    PanoCollectionInfo
  },

  computed: {
    ...mapGetters([
      'isFullscreen',
      'isScreenReady',
      'isVrMode'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.vrsdk-i-header {
  position: absolute
  width: 100%
  z-index: $i-header-m-z
  pointer-events: none
}

.vrsdk-header-intro {
  position: absolute
  left: $i-header-header-intro-pos
  top: 15px
  opacity: 0
  transform: translateX(-($i-header-header-intro-pos))
  transition: .3s opacity ease-out, .3s transform ease-out

  &.vrsdk-screen-ready {
    opacity: 1
    transform: none
  }
}

.vrsdk-header-center {
  display: none
  position: absolute
  top: 27px
  right: $i-header-header-center-pos
  transition: .3s opacity ease-out, .3s transform ease-out
  opacity: 0
  transform: translateY(-20px)

  &.vrsdk-screen-ready {
    opacity: 1
    transform: none
  }
}

@media screen and (min-width: $response) {
  .vrsdk-i-header {
    z-index: $i-header-z
  }

  .vrsdk-header-intro {
    left: $i-header-header-intro-large-pos
    top: 28px
  }

  .vrsdk-header-center {
    width: 100%
    left: auto
    right: auto
    display: flex
    justify-content: center
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-header-intro {
      left: auto
      right: $i-header-header-intro-pos
      transform: translateX($i-header-header-intro-pos)

      &.vrsdk-screen-ready {
        opacity: 1
        transform: none
      }
    }

    .vrsdk-header-center {
      right: auto
      left: $i-header-header-center-pos
    }

    @media screen and (min-width: $response) {
      .vrsdk-header-intro {
        left: auto
        right: $i-header-header-intro-large-pos
      }

      .vrsdk-header-center {
        left: auto
        right: auto
      }
    }
  }
}
</style>
