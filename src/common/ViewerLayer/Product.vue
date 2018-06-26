<template>
  <div class="vrsdk-customized-tag-product">
    <div class="vrsdk-product-layout">
      <div
        v-if="productTagInfo.imageUrl"
        class="vrsdk-product-area-1">
        <div class="vrsdk-product-image-container">
          <img
            class="vrsdk-product-image"
            :src="productTagInfo.imageUrl"
            :alt="productTagInfo.name">
        </div>
      </div>
      <div class="vrsdk-product-area-2">
        <div class="vrsdk-product-bar">
          <span v-show="productTagInfo.productId">ID: {{ productTagInfo.productId }}</span>
          <span v-show="productTagInfo.stock">剩餘 {{ productTagInfo.stock }} 件</span>
        </div>
        <h4 class="vrsdk-product-title">
          {{ productTagInfo.name }}
        </h4>
        <div
          v-show="productTagInfo.price || productTagInfo.discountPrice"
          class="vrsdk-product-text vrsdk-product-price">
          <del v-show="productTagInfo.price && productTagInfo.discountPrice">
            {{ productTagInfo.price }}
          </del>
          <strong
            v-show="productTagInfo.discountPrice"
            class="vrsdk-text-ml">
            {{ productTagInfo.discountPrice }}
          </strong>
          <p
            v-show="productTagInfo.price && !productTagInfo.discountPrice"
            class="vrsdk-text-ml">
            {{ productTagInfo.price }}
          </p>
        </div>
        <div class="vrsdk-product-button-container vrsdk-product-action">
          <a
            class="vrsdk-product-button vrsdk-text-ml"
            :href="productTagInfo.purchaseUrl"
            target="_blank"
            rel="noopener">
            立即搶購
          </a>
        </div>
      </div>
      <div class="vrsdk-product-area-3">
        <div class="vrsdk-product-description">
          <pre class="vrsdk-pre-custom">{{ productTagInfo.description }}</pre>
          <div>
            <br>
            <a
              class="vrsdk-color-yellow"
              :href="productTagInfo.descriptionUrl"
              target="_blank">
              了解更多
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--<div class="vrsdk-marker-info-product">-->
    <!--<div class="vrsdk-marker-info-large-top">-->
      <!--<div class="vrsdk-marker-info-large-right">-->
        <!--<h4 class="vrsdk-marker-info-text vrsdk-marker-info-name">-->
          <!--<span class="vrsdk-text-inner">-->
            <!--{{ productTagInfo.name }}-->
          <!--</span>-->
        <!--</h4>-->
        <!--<h4-->
          <!--v-show="productTagInfo.price"-->
          <!--class="vrsdk-marker-info-text vrsdk-marker-info-price">-->
          <!--<span class="vrsdk-text-inner">-->
            <!--{{ productTagInfo.price }}-->
          <!--</span>-->
        <!--</h4>-->
        <!--<div-->
          <!--v-show="productTagInfo.action"-->
          <!--class="vrsdk-marker-info-text vrsdk-marker-info-action">-->
          <!--<a-->
            <!--:href="productTagInfo.purchaseUrl"-->
            <!--class="vrsdk-marker-info-button"-->
            <!--target="_blank"-->
            <!--rel="noopener">-->
            <!--{{ $t(productTagInfo.action) }}-->
          <!--</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div-->
        <!--v-show="productTagInfo.imageUrl"-->
        <!--class="vrsdk-marker-info-large-left">-->
        <!--&lt;!&ndash;when large layout, max image width is 180&ndash;&gt;-->
        <!--<img-->
          <!--class="vrsdk-marker-info-image"-->
          <!--:src="productTagInfo.imageUrl"-->
          <!--:alt="productTagInfo.name">-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="vrsdk-marker-info-large-bottom">-->
      <!--<div class="vrsdk-marker-info-description">-->
        <!--<pre class="vrsdk-pre-custom">{{ productTagInfo.description }}</pre>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmpty } from '@/api/utils'

export default {
  name: 'MarkerProduct',
  computed: {
    ...mapGetters([
      'markerInfoData'
    ]),

    productTagInfo () {
      return !isEmpty(this.markerInfoData) ? this.markerInfoData.productTagInfo : {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

a,
span,
h4 {
  text-shadow: none
}

strong {
  color: $red3
}

.vrsdk-product-image-container {
  position: relative
  text-align: center
}

.vrsdk-product-image {
  width: 300px
  max-width: 100%
}

.vrsdk-product-layout {
  display: flex
  flex-direction: column

  .vrsdk-product-area-1 {
    order: 2
  }

  .vrsdk-product-area-2 {
    order: 1
  }

  .vrsdk-product-area-3 {
    order: 3
  }
}

.vrsdk-product-bar {
  padding: 0 10px
  background-color: $yellow
  display: flex
  justify-content: space-between
  line-height: 22px

  span {
    color: $black
    line-height: 22px
  }
}

.vrsdk-product-title {
  margin-top: 10px
  margin-bottom: 10px
}

.vrsdk-product-price {
  text-align: center
}

.vrsdk-product-action {
  text-align: center
}

.vrsdk-product-button-container {
  margin-top: 15px
  margin-bottom: 15px
}

a.vrsdk-product-button {
  display: inline-flex
  padding: 8px 17px
  background-color: $red2
  color: $white
  border-radius: 5px
}

@media screen and (min-width: $response) {
  .vrsdk-product-layout {
    @extend .vrsdk-clear
    display: block

    .vrsdk-product-area-1 {
      width: 322px
      float: left
    }
    .vrsdk-product-area-1 + .vrsdk-product-area-2 {
      width: 298px
      float: right
    }
    .vrsdk-product-area-1 + .vrsdk-product-area-2 + .vrsdk-product-area-3 {
      width: 298px
      float: right
    }
  }

  .vrsdk-product-price {
    text-align: initial
  }

  .vrsdk-product-action {
    text-align: initial
  }
}
</style>
