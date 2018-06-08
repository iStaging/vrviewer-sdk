<template>
  <div class="vrsdk-marker-info">
    <customized-tag-gift
      v-show="markerInfoData.type === 'customizedTag' && markerInfoData.iconType === 'gift'">
    </customized-tag-gift>
    <customized-tag-coupon
      v-show="markerInfoData.type === 'customizedTag' && markerInfoData.iconType === 'coupon'">
    </customized-tag-coupon>
    <customized-tag-shopping
      v-show="markerInfoData.type === 'customizedTag' && markerInfoData.iconType === 'shopping'">
    </customized-tag-shopping>
    <customized-tag-stop-watch
      v-show="markerInfoData.type === 'customizedTag' && markerInfoData.iconType === 'stopwatch'">
    </customized-tag-stop-watch>
    <memo
      v-show="markerInfoData.type === 'memo'">
    </memo>
    <tag
      v-show="markerInfoData.type === 'tag'">
    </tag>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomizedTagCoupon from './CustomizedTagCoupon'
import CustomizedTagGift from './CustomizedTagGift'
import CustomizedTagShopping from './CustomizedTagShopping'
import CustomizedTagStopWatch from './CustomizedTagStopWatch'
import Memo from './Memo'
import Tag from './Tag'

export default {
  name: 'MarkerInfo',
  components: {
    CustomizedTagCoupon,
    CustomizedTagGift,
    CustomizedTagShopping,
    CustomizedTagStopWatch,
    Memo,
    Tag
  },
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
    ])
  },

  watch: {
    currentPanorama: {
      handler () {
        this.closeMarkerInfo()
        this.setMarkerInfoData({})
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
@media screen and (min-width: $response) {
  .vrsdk-marker-info {
    margin-top: 0
  }
}
</style>
