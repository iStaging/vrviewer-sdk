<template>
  <div class="vrsdk-customized-tag-coupon">
    <h2 class="coupon-title">
      折價卷
    </h2>
    <hr>
    <div class="coupon-content">
      <div class="coupon-item">
        <p>滿$1,000 折 100</p>
        <p>折扣代碼: <span class="vrsdk-color-yellow">HAPPY99</span></p>
      </div>
      <div class="coupon-item">
        <p>滿$10,000 折 1,300</p>
        <p>折扣代碼: <span class="vrsdk-color-yellow">HAPPY996</span></p>
      </div>
      <div class="coupon-item">
        <p>滿$15,000 折 2,000</p>
        <p>折扣代碼: <span class="vrsdk-color-yellow">HAPPY998</span></p>
      </div>
      <div class="coupon-item">
        <p>滿$20,000 折 3,000</p>
        <p>折扣代碼: <span class="vrsdk-color-yellow">HAPPY999</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Coupon',
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

.vrsdk-customized-tag-coupon {
  position: relative
  max-height: 100%
  overflow: auto
}

.coupon-title {
  @extends .vrsdk-text-ml
  text-align: center
}

hr {
  height: 1px
  width: 100%
  margin: 5px 0
}

.coupon-content {
  display: flex
  flex-direction: column
  align-items: center
}

.coupon-item {
  position: relative
  text-align: center
  padding-top: 15px
  margin-bottom: 15px
  min-width: 248px

  &, p {
    @extends .vrsdk-text-ml
  }

  & + .coupon-item {
    &::before {
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      width: 100%
      height: 1px
      border-top-style: dashed
      border-top-color: $white
      border-top-width: 1px
    }
  }
}
</style>
