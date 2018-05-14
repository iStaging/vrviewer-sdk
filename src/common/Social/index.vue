<docs>
  This area is top center 3 icons, views, likes and comments icons
</docs>

<template>
  <div
    class="social"
    v-if="!isEmpty(social) && !isUiMode">
    <a
      role="button"
      class="social-item inline-flex-center">
      <svg-icon
        name="view"
        class="social-icon"
        :shadow="true"
        :color="icon.view.color">
      </svg-icon>
      <span>{{ social[icon.view.count] }}</span>
    </a>
    <a
      role="button"
      class="social-item inline-flex-center"
      :class="{ 'active': isSocialLiked }"
      @click="updateLikeCount"
      @mouseenter="changeColor(icon.like, mainColor)"
      @mouseleave="changeColor(icon.like, defaultColor)">
      <svg-icon
        name="like"
        class="social-icon"
        :shadow="true"
        :color="isSocialLiked ? mainColor : icon.like.color">
      </svg-icon>
      <span>{{ social[icon.like.count] }}</span>
    </a>
    <a
      v-if="showComment"
      role="button"
      class="social-item inline-flex-center"
      :class="{ 'active': isCommentsActive }"
      @click="clickComments"
      @mouseenter="changeColor(icon.comment, mainColor)"
      @mouseleave="changeColor(icon.comment, defaultColor)">
      <svg-icon
        name="comment"
        class="social-icon"
        :shadow="true"
        :color="isCommentsActive ? mainColor : icon.comment.color">
      </svg-icon>
      <span>{{ social[icon.comment.count] }}</span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SOCIAL } from '~js/constants'
import { isEmpty } from '~js/utils'
import Icon from '../../components/Icon/index.vue'
import SvgIcon from '../../components/SvgIcon/index.vue'

export default {
  name: 'Social',
  components: {
    Icon,
    SvgIcon
  },

  data () {
    return {
      defaultColor: '#fff',
      icon: {
        view: {
          name: 'view',
          color: this.defaultColor,
          count: SOCIAL.VIEW_COUNT
        },
        like: {
          name: 'like',
          color: this.defaultColor,
          count: SOCIAL.LIKE_COUNT
        },
        comment: {
          name: 'comment',
          color: this.defaultColor,
          count: SOCIAL.COMMENT_COUNT
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'isCommentsActive',
      'isSocialLiked',
      'isUiMode',
      'mainColor',
      'showComment',
      'social'
    ])
  },

  methods: {
    ...mapActions([
      'closeInformation',
      'closeLocation',
      'closeMarkerInfo',
      'closeShare',
      'toggleComments',
      'updateLikeCount'
    ]),

    clickComments () {
      this.toggleComments()
      this.closeInformation()
      this.closeShare()
      this.closeMarkerInfo()
      this.closeLocation()
    },

    isEmpty (data) {
      return isEmpty(data)
    },

    changeColor (key = {}, value = '') {
      if (!key && !key.color) {
        return
      }
      key.color = value
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.social {
  pointer-events: auto
  font-size: 14px
}

.social-item {
  cursor: pointer

  & + & {
    margin-left: $social-index-social-item-margin
  }
}

.social-icon {
  $w = 20px
  $h = 20px
  bg-size($w, $h)
  margin-right: $social-index-social-icon-margin
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .social-icon {
    margin-right: auto
    margin-left: $social-index-social-icon-margin
  }

  .social-item + .social-item {
    margin-left: auto
    margin-right: $social-index-social-item-margin
  }
}
</style>
