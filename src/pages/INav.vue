<template>
  <nav
    role="navigation"
    class="i-nav">
    <div
      class="i-nav-mobile-outer"
      :class="{ 'i-nav-mobile-outer-active': !isMobileMenuActive }">
      <i-repeat
        class="i-nav-mobile-outer-icon-wrapper"
        :model="filterItem(navMobileOuterList, 'name')">
        <button
          role="button"
          v-for="item in navMobileOuterList"
          :key="item.name"
          :slot="item.name"
          class="i-repeat-a"
          :class="{
            'icon-disabled': item.disabled,
            'i-repeat-a-active': item.isActive
          }"
          @click.prevent="item.method"
          :aria-label="item.caption">
          <span class="i-repeat-icon-wrapper">
            <svg-icon
              :name="item.name"
              :class="`i-repeat-icon icon-${item.name}${item.isActive ? ' icon-active' : ''}`"
              :color="item.isActive ? mainColor : icon[item.name].color">
            </svg-icon>
          </span>
        </button>
      </i-repeat>
    </div>
    <div
      class="i-nav-mobile-inner"
      :class="{ 'i-nav-mobile-inner-active': isMobileMenuActive }">
      <div class="i-nav-mobile-inner-collapse-menu-wrapper">
        <button
          :aria-label="$t('close')"
          @click="closeMobileMenu">
          <svg-icon
            name="closeMobileMenu"
            class="icon-close-menu"
            :color="defaultColor">
          </svg-icon>
        </button>
      </div>
      <i-repeat
        class="i-nav-mobile-inner-icon-wrapper"
        :model="filterItem(navMobileInnerList, 'name')">
        <button
          role="button"
          v-for="item in navMobileInnerList"
          :key="item.name"
          :slot="item.name"
          class="i-repeat-a"
          :class="{
            'icon-disabled': item.disabled,
            'i-repeat-a-active': item.isActive
          }"
          @click.prevent="item.method"
          :aria-label="item.caption">
          <span class="i-repeat-icon-wrapper">
            <svg-icon
              :name="item.name"
              :class="`i-repeat-icon icon-${item.name}${item.isActive ? ' icon-active' : ''}`"
              :color="item.isActive ? mainColor : icon[item.name].color">
            </svg-icon>
          </span>
          <span class="i-repeat-text">{{ item.caption }}</span>
        </button>
      </i-repeat>
    </div>
    <div class="i-nav-pc">
      <i-repeat
        class="i-nav-pc-icon-wrapper"
        :model="filterItem(navPcList, 'name')">
        <div
          v-for="item in navPcList"
          :key="item.name"
          :slot="item.name"
          class="i-nav-pc-li-inner">
          <button
            role="button"
            class="i-repeat-a i-repeat-a-horizontal"
            :class="{
              'icon-disabled': item.disabled,
              'i-repeat-a-active': item.isActive
            }"
            :aria-label="item.caption"
            @click.prevent="item.method"
            @mouseenter="changeColor(icon[item.name], mainColor)"
            @mouseleave="changeColor(icon[item.name], defaultColor)">
            <span class="i-repeat-icon-wrapper">
              <svg-icon
                :name="item.name"
                :class="`i-repeat-icon icon-${item.name}${item.isActive ? ' icon-active' : ''}`"
                :color="item.isActive ? mainColor : icon[item.name].color">
              </svg-icon>
            </span>
          </button>
          <span class="i-nav-pc-tooltip">
            {{ item.caption }}
          </span>
        </div>
      </i-repeat>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  isIframe,
  isMobile,
  isIOS
} from '@/api/utils'
import IRepeat from '../components/IRepeat.vue'
import Icon from '../components/Icon/index.vue'
import SvgIcon from '../components/SvgIcon/index.vue'
import HandleData from '../mixins/HandleData.vue'

export default {
  name: 'INav',
  components: {
    IRepeat,
    Icon,
    SvgIcon
  },

  mixins: [
    HandleData
  ],

  data () {
    return {
      defaultColor: '#fff',
      icon: {
        fullscreen: { color: this.defaultColor },
        gyro: { color: this.defaultColor },
        like: { color: this.defaultColor },
        location: { color: this.defaultColor },
        qrcode: { color: this.defaultColor },
        share: { color: this.defaultColor },
        floorplan: { color: this.defaultColor },
        panoSelect: { color: this.defaultColor },
        vrmode: { color: this.defaultColor },
        showMobileMenu: { color: this.defaultColor }
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentBuilding',
      'customSetting',
      'floorplan',
      'isFloorplanActive',
      'isFullscreen',
      'isGyroEnabled',
      'isGyroFromIframe',
      'isInformationActive',
      'isMobileMenuActive',
      'isPanoramasListActive',
      'isShareActive',
      'isVrMode'
    ]),

    canDeviceSupportGyro () {
      // 1. 不是 IOS 且不是 iframe 時顯示
      // 2. 是 IOS 是 iframe，但是 isGyroFromIframe = true 時顯示
      return isMobile() && (!isIOS() || ((isIframe() && this.isGyroFromIframe && isIOS()) || !isIframe()))
    },

    navMobileOuterList () {
      return [{
        name: 'showMobileMenu',
        method: () => {
          this.showMobileMenu()
        }
      }, {
        name: 'gyro',
        hidden: !this.canDeviceSupportGyro,
        isActive: this.isGyroEnabled,
        method: () => {
          this.toggleGyro()
        }
      }, {
        name: 'share',
        // hidden: this.$route.query.share === 'hidden',
        isActive: this.isShareActive,
        method: () => {
          this.toggleShare()
        }
      }, {
        name: 'floorplan',
        hidden: !(this.floorplan && this.floorplan !== 'none'),
        isActive: this.isFloorplanActive,
        method: () => {
          this.toggleFloorplan()
          this.closePanoramasList()
        }
      }, {
        name: 'panoSelect',
        isActive: this.isPanoramasListActive,
        method: () => {
          this.togglePanoramasList()
          this.closeFloorplan()
        }
      }]
    },

    navMobileInnerList () {
      let list = [{
        name: 'information',
        caption: this.$t('information'),
        isActive: this.isInformationActive,
        method: () => {
          this.showInformation()
          this.closeMobileMenu()
          this.closeShare()
          this.closeMarkerInfo()
        }
      }]
      list.push(...[{
        name: 'vrmode',
        caption: this.$t('vrmode'),
        hidden: !this.canDeviceSupportGyro,
        isActive: this.isVrMode,
        method: () => {
          this.closeMobileMenu()
          this.enterVrMode()
        }
      }, {
        name: 'fullscreen',
        caption: this.$t('fullscreen'),
        hidden: isIframe() && isMobile() && isIOS(),
        isActive: this.isFullscreen,
        method: () => {
          this.closeMobileMenu()
          this.enterFullscreen()
        }
      }])
      return list
    },

    navPcList () {
      let list = [{
        name: 'information',
        caption: this.$t('information'),
        isActive: this.isInformationActive,
        method: () => {
          this.toggleInformation()
          this.closeShare()
          this.closeMarkerInfo()
        }
      }, {
        name: 'panoSelect',
        caption: this.$t('panoSelect'),
        isActive: this.isPanoramasListActive,
        method: () => {
          this.togglePanoramasList()
        }
      }, {
        name: 'floorplan',
        caption: this.$t('floorplan'),
        hidden: !(this.floorplan && this.floorplan !== 'none'),
        isActive: this.isFloorplanActive,
        method: () => {
          this.toggleFloorplan()
        }
      }]
      list.push(...[{
        name: 'share',
        caption: this.$t('share'),
        // hidden: this.$route.query.share === 'hidden',
        isActive: this.isShareActive,
        method: () => {
          this.toggleShare()
          this.closeInformation()
          this.closeMarkerInfo()
        }
      }, {
        name: 'fullscreen',
        caption: this.$t('fullscreen'),
        hidden: isIframe() && isMobile() && isIOS(),
        isActive: this.isFullscreen,
        method: () => {
          this.closeMobileMenu()
          this.enterFullscreen()
        }
      }])
      return list
    }
  },

  methods: {
    ...mapActions([
      'closeFloorplan',
      'closeInformation',
      'closeMobileMenu',
      'closeMarkerInfo',
      'closePanoramasList',
      'closeShare',
      'enterFullscreen',
      'enterVrMode',
      'showInformation',
      'showLocation',
      'showMobileMenu',
      'startGyro',
      'stopGyro',
      'toggleFloorplan',
      'toggleGyro',
      'toggleInformation',
      'togglePanoramasList',
      'toggleShare',
      'updateLikeCount'
    ])
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

.i-nav {
  position: relative
  height: 100%

  .i-repeat-icon {
    width: 20px
    height: 20px
  }
}

.i-nav-mobile-outer {
  position: absolute
  top: 20px
  right: $i-nav-i-nav-mobile-outer-pos
  opacity: 0
  visibility: hidden
  transition: opacity .25s ease-out, visibility 0s linear .25s
}

.i-nav-mobile-outer-active {
  opacity: 1
  visibility: visible
  transition: opacity .25s ease-out .25s
}

.i-nav-mobile-inner {
  @extend .absolute-full
  @extend .overflow-auto
  background-color: alpha($dark-gray, 60%)
  background-image: linear-gradient(120deg, rgba(58, 58, 60, .4), rgba(118, 118, 120, .4))
  background-blend-mode: hard-light
  pointer-events: auto
  transform: translateX($i-nav-i-nav-mobile-inner-animate-x)
  transition: transform .25s cubic-bezier(0, 1, .63, 1)
  padding-bottom: 40px

  .i-repeat-a {
    margin: 0 12px
  }

  .i-repeat-icon {
    width: 24px
    height: 24px
  }

  .i-repeat-text {
    @extend .text-with-gray-bg
    font-size: 14px
    margin-left: $i-nav-i-nav-mobile-inner-i-repeat-text-margin
  }

  >>> .i-repeat-li {
    position: relative
    height: 55px
    overflow: hidden
    margin: 0 10px
    border-top-width: 2px
    border-top-color: alpha($white, 50%)
    border-top-style: solid

    &:last-child {
      border-bottom-width: 2px
      border-bottom-color: alpha($white, 50%)
      border-bottom-style: solid
    }
  }
}

.i-nav-mobile-inner-active {
  transform: none
}

.i-nav-mobile-inner-collapse-menu-wrapper {
  position: relative
  height: 70px
  display: flex
  align-items: center
  justify-content: flex-end
  margin: 0 10px
  padding: 0 12px

  button {
    @extend .btn-no-default
  }
}

.i-repeat-icon-wrapper {
  @extend .flex-center
  position: relative
}

.i-nav-mobile-outer-icon-wrapper {
  .i-repeat-icon-wrapper {
    background-color: alpha($dark-gray, 60%)
    background-image: linear-gradient(35deg, rgba(58, 58, 60, .4), rgba(118, 118, 120, .4))
    background-blend-mode: screen
    border-radius: 5px
  }

  .i-repeat-icon {
    width: 30px
    height: 30px
    pointer-events: auto
    padding: 5px
  }

  >>> .i-repeat-li {
    + .i-repeat-li {
      margin-top: 20px
    }
  }
}

.i-nav-pc {
  display: none
}

@media (min-width: $response) {
  .i-nav {
    width: 200px
    height: 100%
  }

  .i-nav-mobile-outer,
  .i-nav-mobile-inner,
  .i-nav-mobile-outer-bottom {
    display: none
  }

  .i-nav-pc-tooltip {
    @extend .text-with-gray-bg
    pointer-events: none
    position: absolute
    right: $i-main-i-nav-pc-tooltip-pos
    margin-right: $i-main-i-nav-pc-tooltip-margin
    text-align: $i-main-i-nav-pc-tooltip-text-align
    font-size: 12px
    line-height: 17px
    padding: 3px 5px
    background-color: alpha($dark-gray, 80%)
    opacity: 0
    transform: translateX(-3px)
    transition: opacity .1s ease-out, transform .1s ease-out

    &::after {
      content: ''
      display: block
      position: absolute
      left: $i-main-i-nav-pc-tooltip-after-pos
      width: 0
      height: 0
      border-style: solid
      top: 0
      right: $i-main-i-nav-pc-tooltip-pos
      bottom: 0
      border-color: $i-main-i-nav-pc-tooltip-after-border-color
      border-width: 11.5px
    }
  }

  .i-nav-pc-li-inner {
    display: flex
    align-items: center
  }

  .i-nav-pc-icon-wrapper {
    display: flex
    flex-direction: column
    align-items: flex-end
    justify-content: center
    position: relative
    height: 100%
    width: 100%
  }

  .i-nav-pc {
    position: relative
    display: block
    margin: 0
    height: 100%
    width: 100%

    .i-repeat-icon-wrapper {
      background-color: alpha($dark-gray, 80%)
      border-radius: 5px
    }

    .i-repeat-a {
      &:hover {
        + .i-nav-pc-tooltip {
          opacity: 1
          transform: none
        }
      }
    }

    .i-repeat-a {
      font-size: 12px
      line-height: 20px
    }

    .i-repeat-icon {
      $w = 22px
      $h = 22px
      $p = 6.5px
      width: $w + $p * 2
      height: $h + $p * 2
    }

    >>> .i-repeat-li {
      pointer-events: auto

      + .i-repeat-li {
        margin-top: 20px
      }
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .icon-close-menu {
    transform: rotateY(180deg)
  }

  .i-nav-mobile-outer {
    right: auto
    left: $i-nav-i-nav-mobile-outer-pos
  }

  .i-nav-mobile-inner {
    transform: translateX(-($i-nav-i-nav-mobile-inner-animate-x))
  }

  .i-nav-mobile-inner-active {
    transform: none
  }

  .i-nav-mobile-inner .i-repeat-text {
    margin-right: $i-nav-i-nav-mobile-inner-i-repeat-text-margin
    margin-left: auto
  }

  @media (min-width: $response) {
    .i-nav-pc-tooltip {
      right: auto
      left: $i-main-i-nav-pc-tooltip-pos
      margin-left: $i-main-i-nav-pc-tooltip-margin
      margin-right: auto
      text-align: $i-main-i-nav-pc-tooltip-text-align-rtl

      &::after {
        left: $i-main-i-nav-pc-tooltip-pos
        right: $i-main-i-nav-pc-tooltip-after-pos
        border-color: $i-main-i-nav-pc-tooltip-after-border-color-rtl
      }
    }
  }
}
</style>
