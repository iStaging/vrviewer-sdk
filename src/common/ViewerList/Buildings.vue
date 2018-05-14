<template>
  <div
    class="buildings"
    :class="{ 'buildings-has-no-scroll': !hasScroll }">
    <ul :style="{ width: buildingsWidth }">
      <li
        v-for="building in buildings"
        class="buildings-li"
        :class="{
          'buildings-li-active': building.objectId === currentBuilding.objectId,
          'buildings-has-scroll': hasScroll
        }">
        <a
          role="button"
          class="buildings-a"
          @click="selectBuilding(building)">
          {{ building.name }}
        </a>
      </li>
      <li class="buildings-underline"></li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Buildings',
  data () {
    return {
      hasScroll: false,
      isBuildingsReady: false
    }
  },

  mounted () {
    this.isBuildingsReady = true
    this.windowResizeHandler()
    window.addEventListener('resize', this.windowResizeHandler)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  computed: {
    ...mapGetters([
      'buildings',
      'currentBuilding',
      'isKrpanoActive'
    ]),

    buildingsWidth () {
      if (!this.buildings) {
        return
      }
      if (this.isBuildingsReady === true || this.isBuildingsReady === false) { // force re-render window.innerWidth
        const buildingsLength = this.buildings.length
        // 768 = CSS assets/css/variables.styl $response value
        let width = 120
        if (window.innerWidth >= 768) {
          width = 160
        }
        return `${buildingsLength * width}px` // panorama width, margin-left, last margin-left
      }
    }
  },

  methods: {
    ...mapActions([
      'selectBuilding'
    ]),

    windowResizeHandler () {
      const buildingsCount = this.buildings.length
      let buildingsWidth
      if (window.innerWidth >= 768) {
        // $buildings-buildings-li-width-large = 160px
        buildingsWidth = buildingsCount * 160
      } else {
        // $buildings-buildings-li-width = 120px
        buildingsWidth = buildingsCount * 120
      }
      this.hasScroll = buildingsWidth > window.innerWidth
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.buildings {
  position: relative
  width: 100%
  padding-top: 3px
  overflow-x: auto
  -webkit-overflow-scrolling: touch
  background-color: alpha($dark-gray, 90%)
  z-index: $buildings-z

  &.buildings-has-no-scroll {
    &::after {
      @extend .absolute-full-width
      content: ''
      bottom: 0
      height: 1px
      background-color: alpha($white, 70%)
      z-index: $buildings-has-no-scroll-z // can't be -1 or whole element will be disappeared in iOS's chrome/safari
    }
  }
}

.buildings-li {
  position: relative
  width: $buildings-buildings-li-width
  text-align: center
  padding: 0 10px
  display: inline-flex

  &.buildings-has-scroll {
    &::after {
      @extend .absolute-full-width
      content: ''
      bottom: 0
      height: 1px
      background-color: alpha($white, 70%)
    }
  }

  & + .buildings-li {
    border-left-width: $buildings-buildings-li-border-width
    border-left-style: solid
    border-left-color: alpha($white, 70%)
    border-right-width: 0
    border-right-style: solid
    border-right-color: alpha($white, 70%)
  }

  &:hover, &:active {
    ~ .buildings-underline {
      transition: transform .3s ease-out .2s
    }
  }

  for num in (1..$max-buildings-in-group) {
    &:nth-child({num}) {
      &.buildings-li-active {
        ~ .buildings-underline {
          transform: translateX($buildings-buildings-li-width * (num - 1))
        }
      }
    }
  }
}

.buildings-a {
  @extend .full
  @extend .text-ellipsis
  @extend .btn-no-default
  @extend .text-with-gray-bg
  position: relative
  display: block
  padding: 6px 0 9px
  font-size: 14px
  line-height: 20px
  text-align: center
}

.buildings-underline {
  position: absolute
  left: $buildings-buildings-underline-pos
  bottom: 0
  width: $buildings-buildings-li-width
  height: 4px
  z-index: $buildings-underline-z
  background-color: $pink-color
  transition: transform .3s ease-out
}

@media (min-width: $response) {
  .buildings-li {
    width: $buildings-buildings-li-width-large

    for num in (1..$max-buildings-in-group) {
      &:nth-child({num}) {
        &.buildings-li-active {
          ~ .buildings-underline {
            transform: translateX($buildings-buildings-li-width-large * (num - 1))
          }
        }
      }
    }
  }

  .buildings-underline {
    width: $buildings-buildings-li-width-large
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

$max-buildings-in-group = 20 // a group can include max 20 buildings
.theme-rtl.theme-rtl-overlap {
  .buildings-li {
    for num in (1..$max-buildings-in-group) {
      &:nth-child({num}) {
        &.buildings-li-active {
          ~ .buildings-underline {
            transform: translateX(-($buildings-buildings-li-width * (num - 1)))
          }
        }
      }
    }

    & + .buildings-li {
      border-left-width: 0
      border-right-width: $buildings-buildings-li-border-width
    }
  }

  .buildings-underline {
    left: auto
    right: $buildings-buildings-underline-pos
  }

  @media (min-width: $response) {
    .buildings-li {
      for num in (1..$max-buildings-in-group) {
        &:nth-child({num}) {
          &.buildings-li-active {
            ~ .buildings-underline {
              transform: translateX(-($buildings-buildings-li-width-large * (num - 1)))
            }
          }
        }
      }
    }
  }
}
</style>
