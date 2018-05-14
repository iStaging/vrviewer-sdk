<template>
  <header
    role="banner"
    class="yc-header">
    <yc-aside
      v-show="!(isVrMode || isFullscreen)">
    </yc-aside>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import YcAside from './YcAside.vue'

export default {
  name: 'YcHeader',
  components: {
    YcAside
  },

  computed: {
    ...mapGetters([
      'isFullscreen',
      'isVrMode'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'
@import '~css/variables.styl'

.yc-header {
  @extend .absolute-full
  z-index: $yc-header-z
  pointer-events: none
}
</style>
