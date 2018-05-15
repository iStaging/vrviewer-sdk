<template>
  <ul class="i-repeat">
    <li
      class="i-repeat-li"
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

.i-repeat-li {
  display: flex
  align-items: center
}

.i-repeat-a {
  @extend .full
  @extend .btn-no-default
  padding: 0
  position: relative
  display: flex
  align-items: center
  pointer-events: auto
}

.i-repeat-a-horizontal {
  flex-direction: column
}
</style>
