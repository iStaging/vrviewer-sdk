<template>
  <div
    v-if="$route.name === 'yung-ching'"
    class="yung-ching-container"
    :class="{ 'transparent': isTransparent }">
    <!--not found liveTour in url or group-->
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
      <yc-header></yc-header>
      <yc-main></yc-main>
      <yc-footer></yc-footer>
    </template>
    <loading
      :color="headquarter.subColor || '#03a3a3'"
      :color2="headquarter.mainColor || '#fc3'">
    </loading>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
import { handleUrlRef } from '@/api/helpers'
import Loading from '../../common/Loading.vue'
import YcFooter from './YcFooter.vue'
import YcHeader from './YcHeader.vue'
import YcMain from './YcMain.vue'

export default {
  name: 'YungChing',
  components: {
    Loading,
    YcFooter,
    YcHeader,
    YcMain
  },

  data () {
    return {
      noPanoramasImage: require('~img/trash-can.svg')
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      const { buildingId } = to.params
      handleUrlRef(to, buildingId, fullPath => {
        vm.$router.replace(fullPath)
      })
      vm.fetchBuilding(buildingId)
    })
  },

  computed: {
    ...mapGetters([
      'headquarter',
      'isAppReady',
      'isBuildingNotFound'
    ]),

    isTransparent () {
      return this.$route.query.background === 'transparent'
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

.yung-ching-container {
  position: relative
  height: 100%
  background-color: $loading-bgc

  &.transparent {
    background-color: transparent
  }
}

.i-progress-wrapper {
  z-index: $i-progress-wrapper-z
}
</style>
