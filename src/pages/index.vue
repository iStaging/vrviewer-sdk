<template>
  <div
    class="default-container theme"
    :class="{
      'theme-rtl theme-rtl-overlap': isRtl,
      'transparent': isTransparent
    }">
    <!--not found liveTour in url-->
    <div
      v-if="isPanoCollectionNotFound"
      class="full-center error-wrapper">
      <figure
        ref="panoCollectionNotFound"
        class="error-wrapper-container">
        <img
          :src="noPanoramasImage"
          alt="no panoramas">
        <figcaption
          v-html="$t('panoCollectionNotFound')">
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

  beforeMount () {
    this.fetchPanoCollection()
  },

  computed: {
    ...mapGetters([
      'isAppReady',
      'isPanoCollectionNotFound',
      'panoramas'
    ]),

    isTransparent () {
      // return this.$route.query.background === 'transparent'
    }
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

.default-container {
  position: relative
  height: 100%
  background-color: $black
  overflow: hidden

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
