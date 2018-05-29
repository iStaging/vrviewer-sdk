<template>
  <ul class="vrsdk-i-repeat">
    <li
      class="vrsdk-i-repeat-li"
      v-for="name in model"
      :class="liClass">
      <slot :name="name"></slot>
    </li>
    <slot name="liExtend"></slot>
  </ul>
</template>

<script>
export default {
  name: 'IRepeat',
  props: {
    liClass: {
      type: String,
      default () {
        return ''
      }
    },
    model: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'

.vrsdk-i-repeat-li {
  display: flex
  align-items: center
}

.vrsdk-i-repeat-a {
  @extend .vrsdk-full
  @extend .vrsdk-btn-no-default
  padding: 0
  position: relative
  display: flex
  align-items: center
  pointer-events: auto
}

.vrsdk-i-repeat-a-horizontal {
  flex-direction: column
}
</style>
