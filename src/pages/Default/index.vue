<template>
  <div
    v-if="$route.name === 'default'"
    class="default-container theme"
    :class="[themeColorClass, {
      'theme-rtl theme-rtl-overlap': isRtl,
      'has-promotion-bar': usePromotionBar && customSetting.showPromotionHeader && isPromotionBarActive,
      'transparent': isTransparent
    }]">
    <promotion-bar v-if="usePromotionBar && customSetting.showPromotionHeader"></promotion-bar>
    <!--no liveTour, but has group-->
    <div
      v-if="isBuildingNotFound && property.objectId && buildings.length"
      class="full-center error-wrapper">
      <figure
        ref="buildingNotInProperty"
        class="error-wrapper-container">
        <img
          :src="noPanoramasImage"
          alt="no panoramas">
        <figcaption
          v-html="$t('buildingNotInPropertyRedirect')">
        </figcaption>
      </figure>
    </div>
    <!--not found property in url-->
    <div
      v-else-if="isPropertyNotFound"
      class="full-center error-wrapper">
      <figure
        ref="buildingNotFound"
        class="error-wrapper-container">
        <img
          :src="noPanoramasImage"
          alt="no panoramas">
        <figcaption
          v-html="$t('buildingNotFound')">
        </figcaption>
      </figure>
    </div>
    <!--not found liveTour in url-->
    <div
      v-else-if="isBuildingNotFound"
      class="full-center error-wrapper">
      <figure
        ref="buildingNotFound"
        class="error-wrapper-container">
        <img
          :src="noPanoramasImage"
          alt="no panoramas">
        <figcaption
          v-html="$t('buildingNotFound')">
        </figcaption>
      </figure>
    </div>
    <template v-else-if="isAppReady">
      <i-header></i-header>
      <i-main></i-main>
      <i-aside></i-aside>
      <i-footer></i-footer>
    </template>
    <loading></loading>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import {
  COLOR
} from '@/api/constants'
import {
  isRtl,
  handleUrlRef
} from '@/api/helpers'
import IHeader from './IHeader.vue'
import IMain from './IMain.vue'
import IAside from './IAside.vue'
import IFooter from './IFooter.vue'
import Loading from '../../common/Loading.vue'
import PromotionBar from '../../common/PromotionBar/index.vue'

export default {
  name: 'Default',
  components: {
    IHeader,
    IMain,
    IAside,
    IFooter,
    Loading,
    PromotionBar
  },

  data () {
    return {
      isRtl: isRtl(),
      noPanoramasImage: require('~img/trash-can.svg'),
      usePromotionBar: process.env.USE_PROMOTION_BAR
    }
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const { buildingId } = to.params
      const propertyId = to.query.group
      handleUrlRef(to, buildingId, fullPath => {
        vm.$router.replace(fullPath)
      })
      if (propertyId) {
        await vm.fetchProperty(propertyId)
      } else {
        await vm.fetchBuilding(buildingId)
      }
    })
  },

  // select group's building will go here
  async beforeRouteUpdate (to, from, next) {
    if (to.params.buildingId === from.params.buildingId &&
      to.query.group === from.query.group) {
    } else {
      const { buildingId } = to.params
      const propertyId = to.query.group
      if (propertyId) {
        await this.fetchProperty(propertyId)
      } else {
        await this.fetchBuilding(buildingId)
      }
    }
    next()
  },

  computed: {
    ...mapGetters([
      'buildings',
      'currentPanorama',
      'customSetting',
      'isAppReady',
      'isBuildingNotFound',
      'isPromotionBarActive',
      'isPropertyNotFound',
      'krpanoEl',
      'panoramas',
      'property',
      'themeColor'
    ]),

    themeColorClass () {
      if (process.env.USE_THEME_COLOR) {
        if (this.themeColor === COLOR.ETWARM_THEME) {
          return 'theme-etwarm-red'
        } else {
          switch (this.themeColor) {
            case 'black':
              return 'theme-black'
            case 'blue':
              return 'theme-blue'
            case 'green':
              return 'theme-green'
            case 'orange':
              return 'theme-orange'
            case 'yellow':
              return 'theme-yellow'
            case 'pink':
            default:
              return 'theme-pink'
          }
        }
      } else {
        return 'theme-pink'
      }
    },

    isTransparent () {
      return this.$route.query.background === 'transparent'
    }
  },

  methods: {
    ...mapActions([
      'fetchProperty',
      'fetchBuilding'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.default-container {
  position: relative
  height: 100%
  background-color: $black

  &.transparent {
    background-color: transparent
  }

  &.has-promotion-bar {
    height: "calc(100% - %s)" % $promotion-bar-height
    margin-top: $promotion-bar-height
  }
}

.livetour-intro {
  img {
    border-radius: 50%
    width: 100px
    height: 100px
  }
}
</style>
