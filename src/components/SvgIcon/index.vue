<template>
  <span class="svg-icon">
    <svg-view
      v-if="name === 'view'"
      :shadow="shadow"
      :color="color">
    </svg-view>
    <svg-like
      v-if="name === 'like'"
      :shadow="shadow"
      :color="color">
    </svg-like>
    <svg-comment
      v-else-if="name === 'comment'"
      :shadow="shadow"
      :color="color">
    </svg-comment>
    <svg-information
      v-else-if="name === 'information'"
      :color="color">
    </svg-information>
    <svg-pano-select
      v-else-if="name === 'panoSelect'"
      :color="color">
    </svg-pano-select>
    <svg-floorplan
      v-else-if="name === 'floorplan'"
      :color="color">
    </svg-floorplan>
    <svg-location
      v-else-if="name === 'location'"
      :color="color">
    </svg-location>
    <svg-share
      v-else-if="name === 'share'"
      :color="color">
    </svg-share>
    <svg-music
      v-else-if="name === 'music'"
      :color="color">
    </svg-music>
    <svg-fullscreen
      v-else-if="name === 'fullscreen'"
      :color="color">
    </svg-fullscreen>
    <svg-gyro
      v-else-if="name === 'gyro'"
      :color="color">
    </svg-gyro>
    <svg-vrmode
      v-else-if="name === 'vrmode'"
      :color="color">
    </svg-vrmode>
    <svg-show-mobile-menu
      v-else-if="name === 'showMobileMenu'"
      :color="color">
    </svg-show-mobile-menu>
    <svg-close-mobile-menu
      v-else-if="name === 'closeMobileMenu'"
      :color="color">
    </svg-close-mobile-menu>
    <svg-close
      v-else-if="name === 'close'"
      :color="color">
    </svg-close>
  </span>
</template>

<script>
import SvgClose from './img/SvgClose.vue'
import SvgCloseMobileMenu from './img/SvgCloseMobileMenu.vue'
import SvgComment from './img/SvgComment.vue'
import SvgFloorplan from './img/SvgFloorplan.vue'
import SvgFullscreen from './img/SvgFullscreen.vue'
import SvgGyro from './img/SvgGyro.vue'
import SvgInformation from './img/SvgInformation.vue'
import SvgLike from './img/SvgLike.vue'
import SvgLocation from './img/SvgLocation.vue'
import SvgMusic from './img/SvgMusic.vue'
import SvgPanoSelect from './img/SvgPanoSelect.vue'
import SvgShare from './img/SvgShare.vue'
import SvgShowMobileMenu from './img/SvgShowMobileMenu.vue'
import SvgVrmode from './img/SvgVrmode.vue'
import SvgView from './img/SvgView.vue'

export default {
  name: 'SvgIcon',
  components: {
    SvgClose,
    SvgCloseMobileMenu,
    SvgComment,
    SvgFloorplan,
    SvgFullscreen,
    SvgGyro,
    SvgInformation,
    SvgLike,
    SvgLocation,
    SvgMusic,
    SvgPanoSelect,
    SvgShare,
    SvgShowMobileMenu,
    SvgVrmode,
    SvgView
  },

  props: {
    name: {
      type: String,
      default () {
        return ''
      }
    },
    color: {
      type: String,
      default () {
        return '#fff'
      }
    },
    shadow: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'

.svg-icon {
  @extend .flex-center
}
</style>
