<docs>
  This list is in the bottom, contains panoramas
</docs>

<template>
  <div class="vrsdk-viewer-list">
    <panoramas></panoramas>
  </div>
</template>

<script>
import Panoramas from './Panoramas.vue'

export default {
  name: 'ViewerList',
  components: {
    Panoramas
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'
@import '~css/variables.styl'

.vrsdk-viewer-list {
  @extend .vrsdk-flex-center-column
  position: relative
  width: 100%
  z-index: $viewer-list-z
  pointer-events: none

  > * {
    pointer-events: auto
  }
}
</style>
