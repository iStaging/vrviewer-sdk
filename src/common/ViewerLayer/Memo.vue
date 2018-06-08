<template>
  <div class="vrsdk-marker-info-memo">
    <div class="vrsdk-marker-info-large-bottom">
      <div class="vrsdk-marker-info-description">
        <pre class="vrsdk-pre-custom">{{ markerInfoData.description }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MarkerMemo',
  computed: {
    ...mapGetters([
      'markerInfoData'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
