<template>
  <aside class="yc-aside">
    <template v-if="panoramas.length">
      <div
        v-show="!isPanoramasListActive"
        class="yc-aside-focus-item">
        <button
          @click="clickFocusedPanorama"
          class="yc-aside-a">
          {{ currentPanorama.customCategory || $t(currentPanorama.category) }}
          <icon
            class="icon icon-arrow-down-black">
          </icon>
        </button>
      </div>
      <div
        v-show="isPanoramasListActive"
        class="yc-aside-list-active">
        <div class="yc-aside-list-ul-container">
          <button
            class="yc-aside-list-ul-arrow"
            @click.prevent="setFocus(-1)">
            <icon
              class="icon icon-arrow-up-black">
            </icon>
          </button>
          <i-repeat
            ref="mainUl"
            class="yc-aside-list-ul"
            liClass="yc-aside-list-li"
            :model="filterItem(panoramas, 'objectId')">
            <button
              v-for="panorama in panoramas"
              :slot="panorama.objectId"
              @click.prevent="selectPanorama(panorama)"
              :class="{ 'yc-aside-a-active': currentPanorama.objectId === panorama.objectId }">
              <span class="yc-aside-a-text">
                {{ panorama.customCategory || $t(panorama.category) }}
              </span>
              <span
                class="yc-aside-a-point"
                :style="{ backgroundColor: headquarter.mainColor }">
              </span>
            </button>
          </i-repeat>
          <button
            class="yc-aside-list-ul-arrow"
            @click.prevent="setFocus(1)">
            <icon
              class="icon icon-arrow-down-black">
            </icon>
          </button>
        </div>
      </div>
    </template>
    <yc-nav></yc-nav>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '../../components/Icon/index.vue'
import IRepeat from '../../components/IRepeat.vue'
import YcNav from './YcNav.vue'
import HandleData from '../../mixins/HandleData.vue'

export default {
  name: 'YcAside',
  components: {
    Icon,
    IRepeat,
    YcNav
  },

  mixins: [
    HandleData
  ],

  mounted () {
    if (!this.isUiMode && this.$route.query.panobar !== 'false') {
      window.setTimeout(() => {
        this.showPanoramasList()
      }, 3000)
    }
  },

  computed: {
    ...mapGetters([
      'currentPanorama',
      'headquarter',
      'isPanoramasListActive',
      'isVrMode',
      'krpanoEl',
      'panoramas'
    ])
  },

  methods: {
    ...mapActions([
      'closeFloorplan',
      'closePanoramasList',
      'showPanoramasList'
    ]),

    selectPanorama (panorama) {
      if (this.currentPanorama.objectId !== panorama.objectId) {
        this.krpanoEl.call(`prepare_change_scene(panorama_${panorama.objectId}, ${panorama.objectId}, 'YcPanoramaList');`)
        this.closePanoramasList()
      }
    },

    setFocus (n = 0) {
      let mainUl = this.$refs.mainUl
      if (mainUl) {
        mainUl = mainUl.$el
        if (window.innerWidth >= 768) {
          mainUl.scrollTop += 30 * n
        } else {
          mainUl.scrollTop += 42 * n
        }
      }
    },

    clickFocusedPanorama () {
      this.showPanoramasList()
      this.closeFloorplan()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.yc-aside {
  @extend .absolute-full
  pointer-events: none
  display: flex
  align-items: flex-start
  justify-content: space-between

  .icon {
    $w = 8px
    $h = 8px
    bg-size($w, $h)
  }
}

.yc-aside-focus-item {
  pointer-events: auto
  display: flex

  .yc-aside-a {
    $p = 20px
    width: 100%
    padding-left: $p
    padding-right: $p
  }
}

.yc-aside-focus-item,
.yc-aside-list-ul-container {
  @extend .text-ellipsis
  display: inline-flex
  margin: 15px
  background-color: alpha($white, 40%)
  border-radius: 12px
  max-width: 150px
}

.yc-aside-list-ul-container {
  @extend .flex-center-column
  position: relative
}

$p = 8px
$lh = 26px
.yc-aside-a {
  @extend .text-ellipsis
  @extend .btn-no-default
  display: inline-block
  position: relative
  width: 100%
  padding: $p 0
  font-size: 14px
  line-height: $lh
  text-shadow: none
  color: $gray
}

.yc-aside-list-ul {
  @extend .overflow-auto
  position: relative
  width: 100%
  max-height: ($p * 2 + $lh) * 7
  -ms-overflow-style: none

  &::-webkit-scrollbar {
    width: 0
    height: 0
    display: none
  }
  &::-webkit-scrollbar-track {
    background-color: transparent
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent
  }
  &::-webkit-scrollbar-button {
    background-color: transparent
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent
  }

  a, button {
    @extend .yc-aside-a
    $ul-a-pl = 20px
    $ul-a-pr = 30px
    width: 100%
    padding-left: $ul-a-pl
    padding-right: $ul-a-pr

    .yc-aside-a-text {
      color: $gray
      text-shadow: none
    }

    .yc-aside-a-point {
      display: none
      position: absolute
      content: ''
      margin-left: 5px
      margin-top: 7px
      width: 8px
      height: 8px
      border-radius: 50%
      background-color: $yellow-color
    }

    &.yc-aside-a-active {
      background-color: alpha($white, 90%)

      .yc-aside-a-point {
        display: inline-block
      }
    }

  }
}

.yc-aside-list-ul-arrow {
  @extend .yc-aside-a
  @extend .flex-center
  @extend .btn-no-default
  position: relative
  text-align: center
  padding: 0
}

.yc-aside-list-active {
  pointer-events: auto
}

>>> .yc-aside-list-li {
  position: relative
  display: flex
}

@media (orientation: landscape) {
  .yc-aside-list-ul {
    max-height: ($p * 2 + $lh) * 4
  }
}

$p = 4px
$lh = 22px
$large-yc-aside-margin = 30px
@media (min-width: $response) {
  .yc-aside {
    display: inline-flex
    align-items: flex-start
    justify-content: space-between
  }

  .yc-aside-list-ul-container {
    float: right
    margin: $large-yc-aside-margin

    &::after {
      content: ''
      display: block
      clear: both
    }
  }

  .yc-aside-focus-item {
    margin: $large-yc-aside-margin

    .yc-aside-a {
      padding-left: 14px
      padding-right: 15px
    }
  }

  .yc-aside-a {
    padding-top: $p
    padding-bottom: $p
    line-height: $lh

    &:hover {
      background-color: alpha($white, 40%)
    }
  }

  .yc-aside-list-ul {
    max-height: ($p * 2 + $lh) * 4

    a, button {
      @extend .btn-no-default
      $ul-a-pl = 10px
      $ul-a-pr = 30px
      padding: $p $ul-a-pr $p $ul-a-pl
      line-height: $lh

      &:hover {
        &:not(.yc-aside-a-active) {
          background-color: alpha($white, 40%)
        }
      }

      &.yc-aside-a-active {
        &::after {
          margin-top: 7px
          right: 15px
        }
      }
    }
  }

  .yc-aside-list-ul-arrow {
    padding: $p 0
    line-height: $lh

    &:hover {
      background-color: alpha($white, 40%)
    }
  }
}
</style>
