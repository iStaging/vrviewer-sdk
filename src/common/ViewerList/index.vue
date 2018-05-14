<docs>
  This list is in the bottom, contains buildings and panoramas
</docs>

<template>
  <div class="viewer-list">
    <buildings v-if="property.objectId"></buildings>
    <panoramas></panoramas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Buildings from './Buildings.vue'
import Panoramas from './Panoramas.vue'

export default {
  name: 'ViewerList',
  components: {
    Buildings,
    Panoramas
  },

  computed: {
    ...mapGetters([
      'property'
    ])
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
