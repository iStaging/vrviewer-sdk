<template>
  <div
    class="vrsdk-default-container"
    :class="{
      'theme-rtl theme-rtl-overlap': isRtl
    }">
    <!--not found liveTour in url-->
    <div
      v-if="isPanoCollectionNotFound"
      class="vrsdk-full-center vrsdk-error-wrapper">
      <figure
        ref="panoCollectionNotFound"
        class="vrsdk-error-wrapper-container">
        <img
          :src="noPanoramasImage"
          alt="no panoramas">
        <figcaption
          v-html="$t('panoCollectionNotFound')">
        </figcaption>
      </figure>
    </div>
    <template v-else-if="isAppReady">
      <i-header v-if="!hideUISetting.hideCollectionInfo"></i-header>
      <i-main></i-main>
      <i-aside></i-aside>
      <i-footer></i-footer>
    </template>
    <loading v-if="!hideUISetting.hideLoading"></loading>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex'
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
      noPanoramasImage: require('img/trash-can.png')
    }
  },

  beforeMount () {
    this.fetchPanoCollection()
  },

  computed: {
    ...mapGetters([
      'isAppReady',
      'isPanoCollectionNotFound',
      'panoramas',
      'hideUISetting'
    ])
  },

  methods: {
    ...mapActions([
      'fetchPanoCollection'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.vrsdk-default-container {
  position: relative
  height: 100%
  background-color: $black
  overflow: hidden
}
</style>
