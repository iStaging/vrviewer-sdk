<template>
  <header
    v-show="!isVrMode && !isFullscreen"
    class="i-header">
    <div
      class="header-intro"
      :class="{ 'screen-ready': isScreenReady }">
      <profile></profile>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '../common/Profile/index.vue'

export default {
  name: 'IHeader',
  components: {
    Profile
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

.i-header {
  position: absolute
  width: 100%
  z-index: $i-header-m-z
  pointer-events: none
}

.header-intro {
  position: absolute
  left: $i-header-header-intro-pos
  top: 15px
  opacity: 0
  transform: translateX(-($i-header-header-intro-pos))
  transition: .3s opacity ease-out, .3s transform ease-out

  &.screen-ready {
    opacity: 1
    transform: none
  }
}

.header-center {
  display: none
  position: absolute
  top: 27px
  right: $i-header-header-center-pos
  transition: .3s opacity ease-out, .3s transform ease-out
  opacity: 0
  transform: translateY(-20px)

  &.screen-ready {
    opacity: 1
    transform: none
  }
}

@media screen and (min-width: $response) {
  .i-header {
    z-index: $i-header-z
  }

  .header-intro {
    left: $i-header-header-intro-large-pos
    top: 28px
  }

  .header-center {
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
  .theme-rtl.theme-rtl-overlap {
    .header-intro {
      left: auto
      right: $i-header-header-intro-pos
      transform: translateX($i-header-header-intro-pos)

      &.screen-ready {
        opacity: 1
        transform: none
      }
    }

    .header-center {
      right: auto
      left: $i-header-header-center-pos
    }

    @media screen and (min-width: $response) {
      .header-intro {
        left: auto
        right: $i-header-header-intro-large-pos
      }

      .header-center {
        left: auto
        right: auto
      }
    }
  }
}
</style>
