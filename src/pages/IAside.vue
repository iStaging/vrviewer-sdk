<template>
  <aside
    class="vrsdk-i-aside"
    :class="{
      'vrsdk-screen-ready': isScreenReady
    }">
    <i-nav
      class="vrsdk-i-nav-parent"
      v-show="!(isVrMode || isFullscreen)">
    </i-nav>
    <button
      role="button"
      v-show="isVrMode || isFullscreen"
      class="vrsdk-aside-icon-close"
      @click="handleExitFullscreen()">
      <svg-icon
        name="close"
        class="vrsdk-vrsdk-icon-close">
      </svg-icon>
    </button>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import INav from './INav.vue'
import SvgIcon from '../components/SvgIcon/index.vue'

export default {
  name: 'IAside',
  components: {
    INav,
    SvgIcon
  },

  computed: {
    ...mapGetters([
      'isFullscreen',
      'isScreenReady',
      'isVrMode'
    ])
  },

  methods: {
    ...mapActions([
      'exitFullscreen',
      'exitVrMode'
    ]),

    handleExitFullscreen () {
      if (this.isFullscreen) {
        this.exitFullscreen()
      }

      if (this.isVrMode) {
        this.exitVrMode()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-i-aside {
  @extend .vrsdk-absolute-full-height
  width: 180px
  right: $i-aside-i-aside-pos
  z-index: $i-aside-m-z
  pointer-events: none
  opacity: 0
  transform: translateX($i-aside-i-aside-animate-x)
  transition: .3s opacity ease-out, .3s transform ease-out

  &.vrsdk-screen-ready {
    opacity: 1
    transform: none
  }

  .vrsdk-icon-close {
    width: 20px
    height: 20px
    pointer-events: auto
  }
}

.vrsdk-aside-icon-close {
  @extend .vrsdk-btn-no-default
  position: absolute
  display: flex
  top: 15px
  right: $i-aside-aside-icon-close-pos
  padding: 0
}

@media screen and (min-width: $response) {
  .vrsdk-i-aside {
    z-index: $i-aside-z
    // don't use extend or it will be replaced
    display: flex
    align-items: center
    justify-content: center
    width: auto
  }

  .vrsdk-i-nav-parent {
    right: $i-aside-i-nav-parent-pos
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-i-aside {
      left: $i-aside-i-aside-pos
      right: auto
      animation-name: aside-init-animate-rtl
      transform: translateX(-($i-aside-i-aside-animate-x))

      &.vrsdk-screen-ready {
        opacity: 1
        transform: none
      }
    }

    .vrsdk-aside-icon-close {
      right: auto
      left: $i-aside-aside-icon-close-pos
    }

    @media screen and (min-width: $response) {
      .vrsdk-i-nav-parent {
        right: auto
        left: $i-aside-i-nav-parent-pos
      }
    }
  }
}
</style>
