<template>
  <div class="vrsdk-customized-tag-stop-watch">
    <div class="vrsdk-stop-watch-layout">
      <div class="vrsdk-stop-watch-area-1">
        <div class="vrsdk-stop-watch-image-container">
          <span class="vrsdk-bookmark-yellow vrsdk-text-ml">
            7.5 折
          </span>
          <img
            class="vrsdk-stop-watch-image"
            src="http://fs1.shop123.com.tw/300123/upload/product/3001233246pic_big_137732.jpg"
            alt="假圖">
        </div>
      </div>
      <div class="vrsdk-stop-watch-area-2">
        <div class="vrsdk-stop-watch-bar">
          <span>倒數 1 天 23:00:58</span>
          <span>剩餘 5 件</span>
        </div>
        <h4 class="vrsdk-stop-watch-title">
          一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十
        </h4>
        <div class="vrsdk-stop-watch-text vrsdk-stop-watch-price">
          <del>$ 4000</del>
          <strong class="vrsdk-text-ml">$ 3200</strong>
        </div>
        <div class="vrsdk-stop-watch-button-container vrsdk-stop-watch-action">
          <a
            class="vrsdk-stop-watch-button vrsdk-text-ml"
            href="http://www.google.com.tw"
            target="_blank"
            rel="noopener">
            立即搶購
          </a>
        </div>
      </div>
      <div class="vrsdk-stop-watch-area-3">
        <div class="vrsdk-stop-watch-description">
          <pre class="vrsdk-pre-custom">一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StopWatch',
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

.vrsdk-stop-watch-image-container {
  position: relative
  text-align: center
}

.vrsdk-stop-watch-image {
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

.vrsdk-stop-watch-layout {
  display: flex
  flex-direction: column

  .vrsdk-stop-watch-area-1 {
    order: 2
  }

  .vrsdk-stop-watch-area-2 {
    order: 1
  }

  .vrsdk-stop-watch-area-3 {
    order: 3
  }
}

.vrsdk-stop-watch-bar {
  padding: 0 10px
  background-color: $yellow
  display: flex
  justify-content: space-between

  span {
    color: $black
  }
}

.vrsdk-stop-watch-title {
  margin-top: 10px
  margin-bottom: 10px
}

.vrsdk-stop-watch-price {
  text-align: center
}

.vrsdk-stop-watch-action {
  text-align: center
}

.vrsdk-stop-watch-button-container {
  margin-top: 15px
  margin-bottom: 15px
}

a.vrsdk-stop-watch-button {
  display: inline-flex
  padding: 8px 17px
  background-color: $red2
  color: $white
  border-radius: 5px
}

@media screen and (min-width: $response) {
  .vrsdk-stop-watch-layout {
    @extend .vrsdk-clear
    display: block

    .vrsdk-stop-watch-area-1 {
      width: 322px
      float: left
    }
    .vrsdk-stop-watch-area-2 {
      width: 298px
      float: right
    }
    .vrsdk-stop-watch-area-3 {
      width: 298px
      float: right
    }
  }

  .vrsdk-stop-watch-price {
    text-align: initial
  }

  .vrsdk-stop-watch-action {
    text-align: initial
  }
}
</style>
