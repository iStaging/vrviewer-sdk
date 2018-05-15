<docs>
  Only iOS system vr mode does not forced to landscape mode, so show it if is mobile and is portrait mode
</docs>

<template>
  <div
    v-show="isInstructionsActive && isVrMode"
    class="instructions">
    <a
      href="javascript:"
      class="instructions-close"
      @click="exitVrMode">
      <svg-icon
        name="close"
        class="icon-close">
      </svg-icon>
    </a>
    <div class="instructions-inner">
      <icon class="icon-mobile"></icon>
      <icon class="icon-cardboard"></icon>
      <p class="instructions-text" v-html="$t('vrInstructions')"></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isPortrait } from '@/api/utils'
import Icon from '../../components/Icon/index.vue'
import SvgIcon from '../../components/SvgIcon/index.vue'

export default {
  name: 'Instructions',
  components: {
    Icon,
    SvgIcon
  },

  data () {
    return {
      isInstructionsActive: isPortrait()
    }
  },

  mounted () {
    window.addEventListener('resize', this.handleToggleInstructions, false)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleToggleInstructions, false)
  },

  computed: {
    ...mapGetters([
      'isVrMode'
    ])
  },

  methods: {
    ...mapActions([
      'exitVrMode'
    ]),

    handleToggleInstructions () {
      setTimeout(() => { // innerWidth and innerHeight will change delay
        this.isInstructionsActive = isPortrait()
      }, 200)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.instructions {
  @extend .flex-center
  @extend .absolute-full
  z-index: $instructions-z
  background: #4d4d4d
  color: $white

  .icon-mobile {
    $w = 70px
    $h = 70px
    position: absolute
    top: 0
    left: "calc(50% - %s)" % ($w * 0.6 / 2)
    margin-top: -80px
    width: $w * 0.6
    height: $h
    background-size: $w $h
    background-image: url('img/mobile.svg')
    animation: rotateDown 2s infinite normal ease-out

    @keyframes rotateDown {
      0% {
        transform: none
      }
      70% {
        transform: translateY(70px) rotate(90deg)
      }
      100% {
        transform: translateY(70px) rotate(90deg)
      }
    }
  }

  .icon-cardboard {
    $w = 80px
    $h = 80px
    position: relative
    z-index: $icon-cardboard-z
    width: $w
    height: $h * 0.6
    background-size: $w $h
    background-image: url('img/cardboard.png')
  }
}

.instructions-close {
  position: absolute
  top: 15px
  right: $instructions-instructions-close-pos
}

.instructions-inner {
  @extend .flex-center-column
  position: relative
}

.instructions-text {
  @extend .text-with-gray-bg
  margin-top: 10px

  strong {
    color: $white
    font-weight: 400
  }
}

.icon-close-white {
  width: 20px
  height: 20px
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

#vrviewer-sdk {
  .theme-rtl.theme-rtl-overlap {
    .instructions-close {
      right: auto
      left: $instructions-instructions-close-pos
    }
  }
}
</style>
