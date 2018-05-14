<template>
  <div
    class="default-container theme"
    :class="[themeColorClass, {
      'theme-rtl theme-rtl-overlap': isRtl,
      'transparent': isTransparent
    }]">
    <!--not found liveTour in url-->
    <div
      v-if="isBuildingNotFound"
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
  isRtl
} from '@/api/helpers'
import IHeader from './IHeader.vue'
import IMain from './IMain.vue'
import IAside from './IAside.vue'
import IFooter from './IFooter.vue'
import Loading from '../common/Loading.vue'

export default {
  name: 'Default',
  components: {
    IHeader,
    IMain,
    IAside,
    IFooter,
    Loading
  },

  data () {
    return {
      isRtl: isRtl(),
      noPanoramasImage: require('img/trash-can.svg')
    }
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const { buildingId } = to.params
      await vm.fetchBuilding(buildingId)
    })
  },

  // select group's building will go here
  async beforeRouteUpdate (to, from, next) {
    if (to.params.buildingId === from.params.buildingId &&
      to.query.group === from.query.group) {
    } else {
      const { buildingId } = to.params
      await this.fetchBuilding(buildingId)
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
      'krpanoEl',
      'panoramas',
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
      // return this.$route.query.background === 'transparent'
    }
  },

  methods: {
    ...mapActions([
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
}

.livetour-intro {
  img {
    border-radius: 50%
    width: 100px
    height: 100px
  }
}
</style>
