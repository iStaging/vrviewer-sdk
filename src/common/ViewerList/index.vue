<docs>
  This list is in the bottom, contains panoramas
</docs>

<template>
  <div class="viewer-list">
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

.viewer-list {
  @extend .flex-center-column
  position: relative
  width: 100%
  z-index: $viewer-list-z
  pointer-events: none

  > * {
    pointer-events: auto
  }
}
</style>
