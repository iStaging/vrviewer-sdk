<template>
  <div class="marker-info">
    <div v-show="markerInfoData.type === 'memo'">
      <div class="marker-info-large-bottom">
        <div class="marker-info-description">
          <pre class="pre-custom">{{ markerInfoData.description }}</pre>
        </div>
      </div>
    </div>
    <div
      v-show="markerInfoData.type === 'tag'"
      class="marker-info-tag">
      <div class="marker-info-large-top">
        <div class="marker-info-large-right">
          <h4 class="marker-info-text marker-info-name">
            <span class="text-inner">
              {{ markerInfoData.name }}
            </span>
          </h4>
          <h4
            v-show="markerInfoData.price"
            class="marker-info-text marker-info-price">
            <span class="text-inner">
              {{ markerInfoData.price }}
            </span>
          </h4>
          <div
            v-show="markerInfoData.action"
            class="marker-info-text marker-info-action">
            <a
              :href="markerInfoData.actionLink"
              class="marker-info-button"
              target="_blank"
              @click="clickTagAction"
              rel="noopener">
              {{ $t(markerInfoData.action) }}
            </a>
          </div>
        </div>
        <div
          v-show="markerInfoData.photo"
          class="marker-info-large-left">
          <!--when large layout, max image width is 180-->
          <img
            class="marker-info-image"
            :src="markerInfoData.photo"
            :alt="markerInfoData.name">
        </div>
      </div>
      <div class="marker-info-large-bottom">
        <div class="marker-info-description">
          <pre class="pre-custom">{{ markerInfoData.description }}</pre>
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

.marker-info {
  position: relative
  margin-top: 20px

  h4 {
    @extend .text-with-gray-bg
    font-size: 18px
    margin-bottom: 20px
    font-weight: normal
  }

  .text-inner {
    display: inline-block
  }
}

.marker-info-image {
  width: 100%
  max-width: 100%
}

.marker-info-large-left {
  margin: 10px 0
}

.marker-info-button {
  @extend .text-with-gray-bg
  display: inline-block
  background-color: $pink-color
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
    background-color: darken($pink-color, 10%)
  }
}

.marker-info-text {
  text-align: center
}

$image-w = 160px
@media screen and (min-width: $response) {
  .marker-info {
    margin-top: 0
  }

  .marker-info-tag {
    display: flex
    flex-direction: column
  }

  .marker-info-large-left {
    order: 1
    margin: 0
    margin-right: $marker-info-marker-info-large-left-margin
  }

  .marker-info-large-right {
    order: 2
    display: flex
    flex-direction: column
    width: calc(100% - 200px)
  }

  .marker-info-large-top {
    order: 1
    display: flex
  }

  .marker-info-large-bottom {
    order: 2
    margin-top: 20px
  }

  .marker-info-image {
    order: 1
    width: $image-w
  }

  .marker-info-name {
    text-align: $marker-info-marker-info-text-align
    order: 2
  }

  .marker-info-price {
    text-align: $marker-info-marker-info-text-align
    order: 3
  }

  .marker-info-action {
    text-align: $marker-info-marker-info-text-align
    order: 4
  }

  .marker-info-description {
    clear: both
    order: 5
  }

  .marker-info-button {
    margin-bottom: 0
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  @media screen and (min-width: $response) {
    .marker-info-large-left {
      margin-right: auto
      margin-left: $marker-info-marker-info-large-left-margin
    }

    .marker-info-name,
    .marker-info-price,
    .marker-info-action {
      text-align: $marker-info-marker-info-text-align-rtl
    }
  }
}
</style>
