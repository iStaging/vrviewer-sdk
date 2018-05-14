<template>
  <article
    role="article"
    class="information">
    <h2 class="information-title">
      {{ name }}
    </h2>
    <div class="information-text">
      <pre class="pre-custom">{{ description }}</pre>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Information',
  props: {
    name: {
      type: String,
      default () {
        return ''
      }
    },
    description: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'

$tabs-width = 130px
.information {
  position: relative
  max-height: 100%
  overflow: auto
}

.information-title {
  @extend .text-with-gray-bg
  font-size: 18px
  line-height: 25px
  margin-top: 20px
}

.information-text {
  @extend .text-with-gray-bg
  display: flex
  position: relative
  font-size: 14px
  line-height: 23px
  margin-top: 10px
}
</style>
