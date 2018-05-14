<docs>
  Non-paid user will show the bar at the top
</docs>

<template>
  <section
    v-show="isPromotionBarActive"
    class="promotion-bar"
    role="complementary">
    <a
      :href="iStagingUrl"
      target="_blank"
      @click="clickLogo">
      <img
        class="promotion-bar-logo"
        :src="iStagingBrand"
        alt="iStaging">
    </a>
    <div class="promotion-bar-caption">
      <p class="promotion-bar-text">
        {{ $t('promotionText') }}
      </p>&nbsp;
      <a
        class="promotion-bar-link"
        :href="promotionUrl"
        target="_blank"
        @click="clickPromotionLink">
        {{ iStagingName }}
      </a>
    </div>
    <button
      class="promotion-bar-button"
      type="button"
      @click="closePromotionBar">
      <icon
        class="icon-close-info-black">
      </icon>
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { iStagingUrl, locale } from '@/api/helpers'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'PromotionBar',
  components: {
    Icon
  },

  data () {
    return {
      iStagingBrand: require('./img/istaging-promotion-brand.svg'),
      iStagingName: 'istaging.com',
      iStagingUrl: iStagingUrl,
      promotionUrl: `https://www.istaging.com/${locale()}/livetour`
    }
  },

  computed: {
    ...mapGetters([
      'currentBuilding',
      'isPromotionBarActive'
    ])
  },

  methods: {
    ...mapActions([
      'closePromotionBar'
    ]),

    clickLogo () {
    },

    clickPromotionLink () {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.promotion-bar {
  @extend .flex-center
  position: fixed
  top: 0
  left: 0
  right: 0
  width: 100%
  height: $promotion-bar-height
  background-color: $white
}

.promotion-bar-logo {
  display: none
}

.promotion-bar-text, .promotion-bar-link {
  text-shadow: none
  font-size: 12px
}

.promotion-bar-caption {
  @extend .flex-center
}

.promotion-bar-text {
  color: $black
}

.promotion-bar-link {
  color: $pink-color
}

.promotion-bar-button {
  @extend .btn-no-default
  position: absolute
  right: 0
  padding: 10px
  display: flex
}

.icon-close-info-black {
  @extend .clear
  $w = 20px
  $h = 20px
  bg-size($w, $h)
  float: left
}

@media (min-width: $response) {
  .promotion-bar {
    padding-left: $promotion-bar-promotion-bar-padding-left
    padding-right: $promotion-bar-promotion-bar-padding-right
    width: "calc(100% - %s - %s)" % ($promotion-bar-promotion-bar-padding-left $promotion-bar-promotion-bar-padding-right)
    box-sizing: content-box
    justify-content: space-between
  }

  .promotion-bar-logo {
    display: block
  }

  .promotion-bar-text, .promotion-bar-link {
    font-size: 18px
  }

  .promotion-bar-button {
    position: relative
    right: auto
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  @media (min-width: $response) {
    .promotion-bar {
      padding-left: $promotion-bar-promotion-bar-padding-right
      padding-right: $promotion-bar-promotion-bar-padding-left
    }
  }
}
</style>
