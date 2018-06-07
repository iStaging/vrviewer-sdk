<template>
  <div class="vrsdk-marker-info">
    <marker-memo
      v-show="markerInfoData.type === 'memo'">
    </marker-memo>
    <marker-tag
      v-show="markerInfoData.type === 'tag'">
    </marker-tag>
    <marker-customized-tag-stop-watch
      v-show="markerInfoData.type === 'customizedTag' && markerInfoData.iconType === 'stopwatch'">
    </marker-customized-tag-stop-watch>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MarkerMemo from './MarkerMemo'
import MarkerTag from './MarkerTag'
import MarkerCustomizedTagStopWatch from './MarkerCustomizedTagStopWatch'

export default {
  name: 'MarkerInfo',
  components: {
    MarkerCustomizedTagStopWatch,
    MarkerMemo,
    MarkerTag
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
