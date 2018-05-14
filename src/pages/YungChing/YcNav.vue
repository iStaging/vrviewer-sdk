<template>
  <nav
    role="navigation"
    aria-labelledby="rightnavheading"
    class="yc-nav">
    <i-repeat
      class="yc-nav-ul"
      liClass="yc-nav-li"
      :model="filterItem(icons, 'name')">
      <a
        role="button"
        v-for="icon in icons"
        v-show="!icon.hidden"
        :slot="icon.name"
        class="yc-nav-a ya-nav-a-effect"
        :href="icon.url || 'javascript:'"
        :target="icon.urlTarget || ''"
        @click="handleMethod(icon.method)">
        <!--{{ icon.name }}-->
        <icon :class="icon.className"></icon>
        <icon
          class="yc-nav-effect"
          :class="icon.className">
        </icon>
      </a>
    </i-repeat>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  isIframe,
  isIOS,
  isMobile
} from '~js/utils'
import Icon from '../../components/Icon/index.vue'
import IRepeat from '../../components/IRepeat.vue'
import HandleData from '../../mixins/HandleData.vue'

export default {
  name: 'YcNav',
  components: {
    Icon,
    IRepeat
  },

  mixins: [
    HandleData
  ],

  computed: {
    ...mapGetters([
      'audioEl',
      'isAudioPlaying',
      'isGyroFromIframe',
      'isVrMode',
      'shareUrl'
    ]),

    icons () {
      return [{
        name: 'yc-vrmode',
        className: 'icon-yc-vrmode',
        hidden: !isMobile(),
        method: () => {
          this.enterVrMode()
        }
      }, {
        name: 'yc-qrcode',
        className: 'icon-yc-qrcode',
        method: () => {
          this.toggleShare()
        }
      }, {
        name: 'yc-louder',
        className: 'icon-yc-louder',
        hidden: !this.audioEl || !this.isAudioPlaying,
        method: () => {
          this.pauseAudio()
        }
      }, {
        name: 'yc-quieter',
        className: 'icon-yc-quieter',
        hidden: !this.audioEl || this.isAudioPlaying,
        method: () => {
          this.playAudio()
        }
      }, {
        name: 'yc-zoom-in',
        className: 'icon-yc-zoom-in',
        hidden: isMobile(),
        method: () => {
          this.zoomIn()
        }
      }, {
        name: 'yc-zoom-out',
        className: 'icon-yc-zoom-out',
        hidden: isMobile(),
        method: () => {
          this.zoomOut()
        }
      }, {
        name: 'yc-fullscreen',
        className: 'icon-yc-fullscreen',
        url: this.shareUrl.ycFullscreen,
        urlTarget: '_blank'
      }]
    }
  },

  methods: {
    ...mapActions([
      'enterVrMode',
      'pauseAudio',
      'playAudio',
      'startGyro',
      'stopGyro',
      'toggleShare',
      'zoomIn',
      'zoomOut'
    ]),

    handleMethod (method) {
      if (typeof method === 'function' || method instanceof Function) {
        method()
      }
    }
  },

  watch: {
    isVrMode (newVal) {
      if (isIframe() && this.isGyroFromIframe && isIOS()) {
        if (newVal) {
          this.startGyro()
        } else {
          this.stopGyro()
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.yc-nav {
  margin: 15px
  pointer-events: auto
}

.yc-nav-ul {
  @extend .flex-center
  position: relative
  height: 30px

  .icon {
    $w = 20px
    $h = 20px
    bg-size($w, $h)
  }
}

$p = 10px
.yc-nav-a {
  @extend .flex-center-column
  position: relative
  padding: 0 $p
}

.yc-nav-effect {
  display: none
}

>>> .yc-nav-li {
  @extend .flex-center
  height: inherit
}

@media (min-width: $response) {
  .yc-nav {
    margin: 30px
  }

  .yc-nav-ul {
    background-color: alpha($white, 40%)
    border-radius: 12px
    padding: 5px 8px
    overflow: hidden
  }

  .yc-nav-a {
    overflow: hidden
    height: inherit
  }

  .ya-nav-a-effect {
    > span {
      transition: transform .3s ease-out
    }

    &:hover {
      > span {
        transform: translateY(-35px)
      }
    }
  }

  .yc-nav-effect {
    position: absolute
    top: 5px
    display: block
    margin-top: 35px
    left: $p
    right: $p
  }
}
</style>
