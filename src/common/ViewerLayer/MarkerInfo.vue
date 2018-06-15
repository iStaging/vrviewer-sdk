<template>
  <div class="vrsdk-marker-info">
    <gift
      v-show="markerInfoData.type === 'custom' && markerInfoData.customTagInfo.type === 'testCustom1'">
    </gift>
    <coupon
      v-show="markerInfoData.type === 'custom' && markerInfoData.customTagInfo.type === 'testCustom2'">
    </coupon>
    <gift
      v-show="markerInfoData.type === 'custom' && markerInfoData.iconType === 'gift'">
    </gift>
    <coupon
      v-show="markerInfoData.type === 'custom' && markerInfoData.iconType === 'coupon'">
    </coupon>
    <memo
      v-show="markerInfoData.type === 'memo'">
    </memo>
    <shopping
      v-show="markerInfoData.type === 'custom' && markerInfoData.iconType === 'shopping'">
    </shopping>
    <stop-watch
      v-show="markerInfoData.type === 'custom' && markerInfoData.iconType === 'stopwatch'">
    </stop-watch>
    <tag
      v-show="markerInfoData.type === 'tag'">
    </tag>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Coupon from './Custom/Coupon'
import Gift from './Custom/Gift'
import Shopping from './Custom/Shopping'
import StopWatch from './Custom/StopWatch'
import Memo from './Memo'
import Tag from './Tag'

export default {
  name: 'MarkerInfo',
  components: {
    Coupon,
    Gift,
    Memo,
    Shopping,
    StopWatch,
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
