<template>
  <div class="vrsdk-viewer-markers-hover-customized-tag-inner">
    <div class="vrsdk-first-column vrsdk-text-ellipsis">
      <span class="vrsdk-color-yellow vrsdk-text-md">
        累績 1650元／ 目標 2000 元
      </span>
    </div>
    <div class="vrsdk-second-column vrsdk-text-ellipsis vrsdk-text-ml">
      漂亮的枋山愛文芒果，好吃到嚇到吃手手
    </div>
  </div>
</template>

<script>
export default {
  name: 'StopWatch'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.vrsdk-viewer-markers-hover-customized-tag-inner {
  @extend .vrsdk-clear
  position: relative
  display: flex
  flex-direction: column
  background-color: $black
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5)
  align-self: center
  width: 243px
  max-height: 80%
  z-index: 4
  border-radius: 5px
  padding: 10px
}

.vrsdk-second-column {
  margin: 3px 0
}

.vrsdk-bookmark-yellow {
  position: relative
  text-shadow: none
  color: $red
  background-color: $yellow
  padding: 2.75px 15px
  margin-right: 15px
  display: inline-flex

  &::after {
    position: absolute
    content: ''
    left: calc(100% - 1px)
    right: 0
    top: 0
    bottom: 0
    height: 0
    border-top: 13.5px solid transparent
    border-bottom: 13.5px solid transparent
    border-right: 10px solid transparent
    border-left: 10px solid $yellow
  }
}
</style>
