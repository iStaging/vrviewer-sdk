<template>
  <footer
    v-if="floorplan && floorplan !== 'none'"
    class="yc-footer">
    <section
      v-show="!(isVrMode || isFullscreen)"
      class="floorplan-wrapper"
      :class="{ 'floorplan-wrapper-active': isFloorplanActive }">
      <div
        class="floorplan-caption"
        @click="clickFloorplanNavigation">
        <div
          v-show="!isFloorplanActive"
          class="flex-center">
          <icon
            class="icon icon-arrow-up-black">
          </icon>
          <span>展開格局圖</span>
        </div>
        <div
          v-show="isFloorplanActive"
          class="flex-center">
          <icon
            class="icon icon-arrow-down-black">
          </icon>
          <span>隱藏格局圖</span>
        </div>
      </div>
      <div class="floorplan-size">
        <floorplan
          class="yc-floorplan"
          :floorplanContainerWidth="300"
          :floorplanContainerHeight="225"
          :activatedColor="headquarter.mainColor || '#fc3'">
        </floorplan>
        <div class="floorplan-waterprint-container">
          <img
            :src="headquarter.floorplanLogoUrl"
            :alt="headquarter.title">
        </div>
      </div>
      <span
        class="floorplan-wrapper-collapse"
        @click="toggleFloorplan">
        <icon
          class="icon"
          :class="{
            'icon-collapse-right': !isFloorplanActive,
            'icon-collapse-left': isFloorplanActive
          }">
        </icon>
      </span>
    </section>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Floorplan from '../../common/Floorplan/index.vue'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'YcFooter',
  components: {
    Floorplan,
    Icon
  },

  computed: {
    ...mapGetters([
      'floorplan',
      'headquarter',
      'isFloorplanActive',
      'isFullscreen',
      'isVrMode'
    ])
  },

  methods: {
    ...mapActions([
      'closePanoramasList',
      'toggleFloorplan'
    ]),

    clickFloorplanNavigation () {
      this.toggleFloorplan()
      this.closePanoramasList()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.yc-footer {
  @extend .absolute-full-width
  bottom: 0
}

.floorplan-wrapper {
  @extend .absolute-full-width
  @extend .flex-center-column
  bottom: 0
  z-index: $yc-footer-floorplan-wrapper-z
  pointer-events: none
  transform: translateY(100%) translateY(-30px)
  transition: transform .25s ease-out

  > * {
    pointer-events: auto
  }
}

.floorplan-wrapper-active {
  transform: none
}

.floorplan-wrapper-collapse {
  display: none
}

.floorplan-caption {
  position: relative
  width: 300px
  height: 30px
  line-height: 30px
  font-size: 14px
  text-align: center
  border-top-left-radius: 20px
  border-top-right-radius: 20px
  background-color: alpha($white, 80%)
  letter-spacing: 2.5px
  cursor: pointer

  span {
    color: $gray
    text-shadow: none

    + span {
      margin-left: 5px
    }
  }

  .icon {
    $w = 14px
    $h = 14px
    bg-size($w, $h)
  }
}

.floorplan-size {
  position: relative
  width: 300px
  height: 225px
}

.floorplan-waterprint-container {
  @extend .absolute-full
  @extend .flex-center
  pointer-events: none
}

@media (min-width: $response) {
  .floorplan-wrapper {
    left: auto
    align-items: flex-end
    margin-right: 30px

    $hover-y = -6px
    &:hover {
      transform: translateY(100%) translateY(-30px + $hover-y)
    }
  }

  .floorplan-wrapper-active {
    &:hover {
      transform: none
    }
  }
}
</style>
