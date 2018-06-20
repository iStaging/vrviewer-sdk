<template>
  <div class="vrsdk-customized-tag-shopping">
    <div class="vrsdk-shopping-layout">
      <div class="vrsdk-shopping-area-1">
        <div class="vrsdk-shopping-image-container">
          <img
            class="vrsdk-shopping-image"
            src="http://fs1.shop123.com.tw/300123/upload/product/3001233246pic_big_137732.jpg"
            alt="假圖">
        </div>
      </div>
      <div class="vrsdk-shopping-area-2">
        <div class="vrsdk-shopping-bar">
          <span>累績 1650元／ 目標 2000 元</span>
        </div>
        <h4 class="vrsdk-shopping-title">
          漂亮的枋山愛文芒果，好吃再回購
        </h4>
        <div class="vrsdk-shopping-text vrsdk-shopping-price">
          <del>$ 4000</del>
          <strong class="vrsdk-text-ml">$ 2200</strong>
        </div>
        <div class="vrsdk-shopping-button-container vrsdk-shopping-action">
          <a
            class="vrsdk-shopping-button vrsdk-text-ml"
            href="http://www.google.com.tw"
            target="_blank"
            rel="noopener">
            參與合購
          </a>
        </div>
      </div>
      <div class="vrsdk-shopping-area-3">
        <div class="vrsdk-shopping-description">
          <pre class="vrsdk-pre-custom">面交地點：
[新北市][板橋區] 中山路二段318巷20弄41號

注意事項：
請準時取貨，若無法當日取貨請先告知沒有告知的一律不負保管責任若當日沒準時取貨的一天收10元寄放費，超過三天就直接幫你做公關</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Shopping',
  computed: {
    ...mapGetters([
      'markerInfoData'
    ])
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

.vrsdk-shopping-image-container {
  position: relative
  text-align: center
}

.vrsdk-shopping-image {
  width: 300px
  max-width: 100%
}

.vrsdk-bookmark-yellow {
  position: absolute
  text-shadow: none
  color: $red
  background-color: $yellow
  padding: 7.5px 11px
  top: 7px
  display: inline-flex
}

.vrsdk-shopping-layout {
  display: flex
  flex-direction: column

  .vrsdk-shopping-area-1 {
    order: 2
  }

  .vrsdk-shopping-area-2 {
    order: 1
  }

  .vrsdk-shopping-area-3 {
    order: 3
  }
}

.vrsdk-shopping-bar {
  padding: 0 10px
  background-color: $yellow
  display: flex
  justify-content: space-between

  span {
    color: $black
  }
}

.vrsdk-shopping-title {
  margin-top: 10px
  margin-bottom: 10px
}

.vrsdk-shopping-button-container {
  margin-top: 15px
  margin-bottom: 15px
}

.vrsdk-shopping-price {
  text-align: center
}

.vrsdk-shopping-action {
  text-align: center
}

a.vrsdk-shopping-button {
  display: inline-flex
  padding: 8px 17px
  background-color: $red2
  color: $white
  border-radius: 5px
}

@media screen and (min-width: $response) {
  .vrsdk-shopping-layout {
    @extend .vrsdk-clear
    display: block

    .vrsdk-shopping-area-1 {
      width: 322px
      float: left
    }
    .vrsdk-shopping-area-2 {
      width: 298px
      float: right
    }
    .vrsdk-shopping-area-3 {
      width: 298px
      float: right
    }
  }

  .vrsdk-shopping-price {
    text-align: initial
  }

  .vrsdk-shopping-action {
    text-align: initial
  }
}
</style>
