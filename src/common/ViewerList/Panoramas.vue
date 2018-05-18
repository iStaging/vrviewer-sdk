<template>
  <div class="vrsdk-panoramas">
    <div :style="{ width: panoramasWidth }">
      <i-repeat
        :model="filterItem(panoramasList, 'key')">
        <button
          v-for="panorama in panoramasList"
          :key="panorama.key"
          :slot="panorama.key"
          class="vrsdk-panoramas-list-a"
          :class="{
            'vrsdk-active': hoveredPanorama.panoramaId === panorama.panoramaId,
            'vrsdk-icon-disabled': panorama.disabled,
            'vrsdk-panoramas-list-a-active': panorama.isActive
          }"
          :disabled="panorama.disabled"
          @mouseenter="setHoveredPanorama(panorama)"
          @mouseleave="setHoveredPanorama({})"
          @click.prevent="panorama.method">
          <span class="vrsdk-panoramas-list-icon-wrapper">
            <icon
              class="vrsdk-panoramas-list-icon"
              :class="[{ 'vrsdk-icon-active': panorama.isActive }, panorama.className]"
              :image="panorama.image"
              :style="{ backgroundPosition: getPanoramaPosition(panorama) }"
              :hasLazyload="true">
            </icon>
          </span>
          <span class="vrsdk-panoramas-list-text">
            {{ panorama.caption }}
          </span>
        </button>
      </i-repeat>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '../../components/Icon/index.vue'
import IRepeat from '../../components/IRepeat.vue'
import HandleData from '../../mixins/HandleData.vue'

export default {
  name: 'Panoramas',
  components: {
    Icon,
    IRepeat
  },

  mixins: [
    HandleData
  ],

  data () {
    return {
      isPanoramasReady: false
    }
  },

  mounted () {
    this.isPanoramasReady = true
    window.addEventListener('resize', this.resizeHandler)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'hoveredPanorama',
      'isGyroEnabled',
      'krpanoEl',
      'panoramas'
    ]),

    panoramasWidth () {
      if (!this.panoramas) {
        return
      }
      if (this.isPanoramasReady === true || this.isPanoramasReady === false) { // force re-render window.innerWidth
        const panoramasLength = this.panoramas.length
        const lastMarginLeft = 20
        let marginLeft = 120
        // 768 = CSS assets/css/variables.styl $response value
        if (window.innerWidth >= 768) {
          marginLeft = 160
        }
        return `${panoramasLength * (lastMarginLeft + marginLeft)}px` // panorama width, margin-left, last margin-left
      }
    },

    panoramasList () {
      const panoramasList = new Array(this.panoramas.length)
      this.panoramas.forEach((panorama, index) => {
        const schema = {
          key: `panorama_${index}`,
          caption: panorama.customPanoramaName || this.$t(panorama.panoramaName),
          image: panorama.thumbnail,
          disabled: this.currentPanorama.panoramaId === panorama.panoramaId,
          isActive: this.currentPanorama.panoramaId === panorama.panoramaId,
          method: () => {
            if (this.currentPanorama.panoramaId === panorama.panoramaId ||
              this.isProgressActive) {
              return
            }
            this.selectPanorama(panorama)
            this.closeShare()
            this.closeMarkerInfo()
          },
          ...panorama
        }
        panoramasList[index] = schema
      })
      return panoramasList
    }
  },

  methods: {
    ...mapActions([
      'closeShare',
      'closeMarkerInfo',
      'selectPanorama',
      'setHoveredPanorama'
    ]),

    resizeHandler () {
      this.isPanoramasReady = false
      this.$nextTick(() => {
        this.isPanoramasReady = true
      })
    },

    getPanoramaPosition (panorama) {
      // 768 = CSS assets/css/variables.styl $response value
      let baseRotation
      let positionOffset
      if (window.innerWidth >= 768) {
        baseRotation = 0.444 // 160 / 360 // same to stylus variable: $w
        positionOffset = -110
      } else {
        baseRotation = 0.333 // 120 / 360 // same to stylus variable: $w
        positionOffset = -85
      }
      const panoramaRotation = panorama.panoramaRotation ? panorama.panoramaRotation.y : 0
      const calcPosition = (panoramaRotation * baseRotation) - positionOffset
      return `${calcPosition}px 0px`
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-panoramas {
  position: relative
  padding: 10px 20px
  // min-height: 113px
  // don't add height: 100% or it cause Safari height to 0 bug
  width: 100%
  overflow-x: auto
  -webkit-overflow-scrolling: touch
  background-color: alpha($dark-gray, 70%)
  z-index: $panoramas-z

  .vrsdk-panoramas-list-a {
    @extend .vrsdk-flex-center-column
    @extend .vrsdk-btn-no-default
    text-align: center
    padding: 0
    margin: 0
  }

  .vrsdk-panoramas-list-a-active {
    .panoramas-list-icon-wrapper {
      border-color: $main-color
    }
  }

  $w = 120px
  $h = 60px
  .vrsdk-panoramas-list-icon-wrapper {
    width: $w
    height: $h
    display: flex
    border-width: 5px
    border-style: solid
    border-color: $white
    overflow: hidden
  }

  .vrsdk-panoramas-list-icon {
    @extend .vrsdk-full
    background-size: $w $h
    background-repeat: repeat
  }

  >>> .vrsdk-i-repeat-li {
    display: inline-flex

    & + .vrsdk-i-repeat-li {
      margin-left: $panoramas-i-repeat-li-margin
    }
  }
}

$w = 120px
.vrsdk-panoramas-list-text {
  @extend .vrsdk-text-ellipsis
  @extend .vrsdk-text-with-gray-bg
  position: relative
  display: block
  font-size: 12px
  max-width: $w
}

@media screen and (min-width: $response) {
  .vrsdk-panoramas {
    padding: 14px 20px
    min-height: 146px

    .vrsdk-panoramas-list-a {
      &.vrsdk-active, &:hover {
        &:not(.panoramas-list-a-active) {
          .vrsdk-panoramas-list-icon-wrapper {
            border-color: $light-gray-color
          }

          .vrsdk-panoramas-list-icon {
            transform: scale(1.1)
          }
        }
      }
    }

    $w = 160px
    $h = 98px
    .vrsdk-panoramas-list-icon-wrapper {
      width: $w
      height: $h
    }

    .vrsdk-panoramas-list-icon {
      background-size: $w $h
      z-index: $panoramas-list-icon-z
      transition: transform .25s ease-out
    }

    .vrsdk-panoramas-list-text {
      max-width: $w
      line-height: 20px
      font-size: 13px
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    .vrsdk-panoramas .vrsdk-i-repeat-li + .vrsdk-i-repeat-li {
      margin-left: auto
      margin-right: $panoramas-i-repeat-li-margin
    }
  }
}
</style>
