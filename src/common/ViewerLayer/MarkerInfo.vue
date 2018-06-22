<template>
  <div class="vrsdk-marker-info">
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
import Memo from './Memo'
import Tag from './Tag'

export default {
  name: 'MarkerInfo',
  components: {
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
    ]),

    checkCustomTag (type) {
      return this.markerInfoData.type === 'custom' &&
        this.markerInfoData.customTagInfo &&
        this.markerInfoData.customTagInfo.type === type
    }
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
