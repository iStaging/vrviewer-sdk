<template>
  <div class="vrsdk-marker-info">
    <div v-show="markerInfoData.type === 'memo'">
      <div class="vrsdk-marker-info-large-bottom">
        <div class="vrsdk-marker-info-description">
          <pre class="vrsdk-pre-custom">{{ markerInfoData.description }}</pre>
        </div>
      </div>
    </div>
    <div
      v-show="markerInfoData.type === 'tag'"
      class="vrsdk-marker-info-tag">
      <div class="vrsdk-marker-info-large-top">
        <div class="vrsdk-marker-info-large-right">
          <h4 class="vrsdk-marker-info-text vrsdk-marker-info-name">
            <span class="vrsdk-text-inner">
              {{ markerInfoData.name }}
            </span>
          </h4>
          <h4
            v-show="markerInfoData.price"
            class="vrsdk-marker-info-text vrsdk-marker-info-price">
            <span class="vrsdk-text-inner">
              {{ markerInfoData.price }}
            </span>
          </h4>
          <div
            v-show="markerInfoData.action"
            class="vrsdk-marker-info-text vrsdk-marker-info-action">
            <a
              :href="markerInfoData.actionLink"
              class="vrsdk-marker-info-button"
              target="_blank"
              @click="clickTagAction"
              rel="noopener">
              {{ $t(markerInfoData.action) }}
            </a>
          </div>
        </div>
        <div
          v-show="markerInfoData.photo"
          class="vrsdk-marker-info-large-left">
          <!--when large layout, max image width is 180-->
          <img
            class="vrsdk-marker-info-image"
            :src="markerInfoData.photo"
            :alt="markerInfoData.name">
        </div>
      </div>
      <div class="vrsdk-marker-info-large-bottom">
        <div class="vrsdk-marker-info-description">
          <pre class="vrsdk-pre-custom">{{ markerInfoData.description }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MarkerInfo',
  computed: {
    ...mapGetters([
      'currentPanorama',
      'markerInfoData'
    ])
  },

  methods: {
    ...mapActions([
      'closeMarkerInfo',
      'setMarkerInfoData'
    ]),

    clickTagAction () {
    }
  },

  watch: {
    currentPanorama: {
      handler () {
        this.setMarkerInfoData({})
        this.closeMarkerInfo()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-marker-info {
  position: relative
  margin-top: 20px

  h4 {
    @extend .vrsdk-text-with-gray-bg
    font-size: 18px
    margin-bottom: 20px
    font-weight: normal
  }

  .vrsdk-text-inner {
    display: inline-block
  }
}

.vrsdk-marker-info-image {
  width: 100%
  max-width: 100%
}

.vrsdk-marker-info-large-left {
  margin: 10px 0
}

.vrsdk-marker-info-button {
  @extend .vrsdk-text-with-gray-bg
  display: inline-block
  background-color: $main-color
  line-height: 25px
  text-align: center
  border-radius: 5px
  padding: 8px 16px 7px
  margin-bottom: 10px
  cursor: pointer

  &:hover, &:focus, &:active {
    color: $white
  }

  &:hover, &:focus, &:active {
    background-color: darken($main-color, 10%)
  }
}

.vrsdk-marker-info-text {
  text-align: center
}

$image-w = 160px
@media screen and (min-width: $response) {
  .vrsdk-marker-info {
    margin-top: 0
  }

  .vrsdk-marker-info-tag {
    display: flex
    flex-direction: column
  }

  .vrsdk-marker-info-large-left {
    order: 1
    margin: 0
    margin-right: $marker-info-large-left-margin
  }

  .vrsdk-marker-info-large-right {
    order: 2
    display: flex
    flex-direction: column
    width: calc(100% - 200px)
  }

  .vrsdk-marker-info-large-top {
    order: 1
    display: flex
  }

  .vrsdk-marker-info-large-bottom {
    order: 2
    margin-top: 20px
  }

  .vrsdk-marker-info-image {
    order: 1
    width: $image-w
  }

  .vrsdk-marker-info-name {
    text-align: $marker-info-text-align
    order: 2
  }

  .vrsdk-marker-info-price {
    text-align: $marker-info-text-align
    order: 3
  }

  .vrsdk-marker-info-action {
    text-align: $marker-info-text-align
    order: 4
  }

  .vrsdk-marker-info-description {
    clear: both
    order: 5
  }

  .vrsdk-marker-info-button {
    margin-bottom: 0
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.vrviewer-sdk {
  .vrsdk-theme-rtl.vrsdk-theme-rtl-overlap {
    @media screen and (min-width: $response) {
      .vrsdk-marker-info-large-left {
        margin-right: auto
        margin-left: $marker-info-large-left-margin
      }

      .vrsdk-marker-info-name,
      .vrsdk-marker-info-price,
      .vrsdk-marker-info-action {
        text-align: $marker-info-text-align-rtl
      }
    }
  }
}
</style>
