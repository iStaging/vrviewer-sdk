<template>
  <div class="vrsdk-marker-info-customized-tag-stop-watch">
    @@
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MarkerCustomizedTagStopWatch',
  computed: {
    ...mapGetters([
      'markerInfoData'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
// @import '~css/variables.styl'
// @import '~css/extends.styl'

</style>
