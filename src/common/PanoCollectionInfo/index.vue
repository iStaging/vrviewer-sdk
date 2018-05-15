<docs>
  Top left's user profile, and group or live tour title name
</docs>

<template>
  <section
    role="banner"
    class="pano-collection">
    <figure
      class="pano-collection-figure"
      @click="togglePanoCollection">
      <img
        class="pano-collection-avatar"
        :src="panoCollectionLogo">
    </figure>
    <div class="pano-collection-detail">
      <h1 class="pano-collection-detail-title">
        {{ currentPanoCollection.name }}
      </h1>
      <p
        v-show="showInfo"
        class="pano-collection-detail-text">
        {{ currentPanoCollection.description }}
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { iStagingUrl } from '@/api/helpers'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'PanoCollectionInfo',
  components: {
    Icon
  },

  data () {
    return {
      showInfo: true,
      defaultAvatar: require('./img/pano-collection-default-logo.jpg'),
      defaultName: 'iStaging',
      defaultDescription: 'www.istaging.com',
      iStagingUrl: iStagingUrl
    }
  },

  computed: {
    ...mapGetters([
      'currentPanoCollection'
    ]),

    panoCollectionLogo () {
      return this.currentPanoCollection.logo || this.defaultAvatar
    }
  },

  methods: {
    togglePanoCollection () {
      this.showInfo = !this.showInfo
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.pano-collection {
  position: relative
  max-width: 170px
  pointer-events: none
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  // word-wrap: break-word
  // word-break: break-all
}

.pano-collection-avatar {
  display: block
  $w = 44px
  $h = 44px
  width: $w
  height: $h
  pointer-events: auto
  cursor: pointer
  background-color: $white
}

.pano-collection-detail {
  font-size: 14px
  pointer-events: auto
}

.pano-collection-detail-title {
  font-weight: normal
}

.pano-collection-detail-text {
  display: block
}

.pano-collection-detail-title, .pano-collection-detail-text {
  margin-top: 10px
}

.pano-collection-pano-collection-info {
  display: none
}

.pano-collection-figure {
  display: flex
  overflow: hidden
  border-radius: 50%
  box-shadow: 1px 1px 2px 1px alpha($black, 30%)
}

@media screen and (orientation: landscape) {
  .pano-collection {
    max-width: 200px
  }
}

@media screen and (min-width: $response) {
  .pano-collection {
    max-width: 200px
    flex-direction: column
    align-items: flex-start
  }

  .pano-collection-avatar {
    $w = 80px
    $h = 80px
    width: $w
    height: $h
  }

  .pano-collection-detail {
    + .pano-collection-pano-collection-info {
      margin-top: 10px
    }
  }

  .pano-collection-pano-collection-info {
    position: relative
    display: block
    pointer-events: auto
    margin-top: 10px
  }

  .pano-collection-pano-collection-info-title {
    font-size: 18px
    line-height: 25px
    font-weight: normal
  }

  .pano-collection-pano-collection-info-description {
    margin-top: 4px
    font-size: 14px
    line-height: 20px
    color: $white
    text-shadow: 1px 1px 2px #333
  }
}
</style>
