<docs>
  Top left's pano collection info
</docs>

<template>
  <section
    role="banner"
    class="vrsdk-pano-collection">
    <figure
      class="vrsdk-pano-collection-figure"
      @click="togglePanoCollection">
      <img
        class="vrsdk-pano-collection-avatar"
        :src="panoCollectionLogo">
    </figure>
    <div class="vrsdk-pano-collection-detail">
      <h1 class="vrsdk-pano-collection-detail-title">
        {{ currentPanoCollection.name }}
      </h1>
      <p
        v-show="showInfo"
        class="vrsdk-pano-collection-detail-text">
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
      defaultName: 'iStaging',
      defaultDescription: 'www.istaging.com',
      iStagingUrl
    }
  },

  computed: {
    ...mapGetters([
      'currentPanoCollection'
    ]),

    panoCollectionLogo () {
      return this.currentPanoCollection.logo
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

.vrsdk-pano-collection {
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

.vrsdk-pano-collection-avatar {
  display: block
  $w = 44px
  $h = 44px
  width: $w
  height: $h
  pointer-events: auto
  cursor: pointer
  background-color: $white
}

.vrsdk-pano-collection-detail {
  font-size: 14px
  pointer-events: auto
}

.vrsdk-pano-collection-detail-title {
  font-weight: normal
}

.vrsdk-pano-collection-detail-text {
  display: block
}

.vrsdk-pano-collection-detail-title,
.vrsdk-pano-collection-detail-text {
  margin-top: 10px
}

.vrsdk-pano-collection-info {
  display: none
}

.vrsdk-pano-collection-figure {
  display: flex
  overflow: hidden
  border-radius: 50%
  box-shadow: 1px 1px 2px 1px alpha($black, 30%)
}

@media screen and (orientation: landscape) {
  .vrsdk-pano-collection {
    max-width: 200px
  }
}

@media screen and (min-width: $response) {
  .vrsdk-pano-collection {
    max-width: 200px
    flex-direction: column
    align-items: flex-start
  }

  .vrsdk-pano-collection-avatar {
    $w = 80px
    $h = 80px
    width: $w
    height: $h
  }

  .vrsdk-pano-collection-detail {
    + .vrsdk-pano-collection-info {
      margin-top: 10px
    }
  }

  .vrsdk-pano-collection-info {
    position: relative
    display: block
    pointer-events: auto
    margin-top: 10px
  }

  .vrsdk-pano-collection-info-title {
    font-size: 18px
    line-height: 25px
    font-weight: normal
  }

  .vrsdk-pano-collection-info-description {
    margin-top: 4px
    font-size: 14px
    line-height: 20px
    color: $white
    text-shadow: 1px 1px 2px #333
  }
}
</style>
