<template>
  <span
    ref="icon"
    class="icon"
    :class="{ 'photo-lazyload': hasLazyload }"
    :style="{ backgroundImage }"
    :data-src="dataSrc">
    <slot></slot>
  </span>
</template>

<script>
import { loadImage } from '@/api/utils'

export default {
  name: 'Icon',
  props: {
    hasLazyload: {
      type: Boolean,
      default () {
        return false
      }
    },
    image: {
      type: String,
      default () {
        return ''
      }
    }
  },

  data () {
    return {
      backgroundImage: undefined,
      dataSrc: undefined
    }
  },

  mounted () {
    this.loadImage()
  },

  methods: {
    loadImage () {
      if (!this.image) {
        this.backgroundImage = undefined
        this.dataSrc = undefined
        return
      }
      this.dataSrc = this.image
      loadImage(this.image, () => {
        // don't use base64 file here or IE will not work
        this.backgroundImage = `url('${this.image}')`
        this.dataSrc = undefined
      }, () => {}, () => {
        this.backgroundImage = undefined
        this.dataSrc = undefined
      })
    }
  },

  watch: {
    image: {
      handler () {
        this.loadImage()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'
@import '~css/variables.styl'

.photo-lazyload {
  position: relative

  &::before {
    @extend .absolute-full
    content: ''
    background-color: #efefef
    z-index: $photo-lazyload-before-z
    opacity: 0
    pointer-events: none
    transition: opacity .25s ease-out
  }

  &[data-src] {
    &::before {
      opacity: 1
    }
  }
}

.icon {
  @extend .bg-center
  display: inline-flex
}

.icon-close-info-white {
  background-image: url('img/close-info-white.svg')
}
.icon-close-info-black {
  background-image: url('img/close-info-black.svg')
}
.icon-arrow-down-black {
  background-image: url('img/arrow-down-black.svg')
}
.icon-arrow-up-black {
  background-image: url('img/arrow-up-black.svg')
}
.icon-yc-fullscreen {
  background-image: url('../../pages/YungChing/img/yc-fullscreen.svg')
}
.icon-yc-qrcode {
  background-image: url('../../pages/YungChing/img/yc-qrcode.svg')
}
.icon-yc-louder {
  background-image: url('../../pages/YungChing/img/yc-louder.svg')
}
.icon-yc-quieter {
  background-image: url('../../pages/YungChing/img/yc-quieter.svg')
}
.icon-yc-vrmode {
  background-image: url('../../pages/YungChing/img/yc-vrmode.svg')
}
.icon-yc-zoom-in {
  background-image: url('../../pages/YungChing/img/yc-zoom-in.svg')
}
.icon-yc-zoom-out {
  background-image: url('../../pages/YungChing/img/yc-zoom-out.svg')
}
.icon-floorplan-add {
  background-image: url('../../common/Floorplan/img/add.svg')
}
.icon-floorplan-minus {
  background-image: url('../../common/Floorplan/img/minus.svg')
}
</style>
