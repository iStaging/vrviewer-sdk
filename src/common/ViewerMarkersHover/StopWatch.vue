<template>
  <div class="vrsdk-viewer-markers-hover-customized-tag-inner">
    <div>
      <span>
        7.5 折
      </span>
      <span>
        倒數 1 天 23:00:58
      </span>
    </div>
    <div>
      北歐風格邊桌-三色可選很多顏色與風格的啦之你看不見我
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5)
  align-self: center
  max-height: 80%
  z-index: 4
  border-radius: 5px
}
</style>
