<template>
  <div
    ref="comments"
    class="comments-list"
    @scroll="scrollHandler">
    <figure
      v-for="comment in filterBy(comments, filter)"
      class="social-grid">
      <img
        class="social-grid-avatar"
        :src="comment.avatar || avatarImage">
      <small class="social-grid-name">
        {{ anonymous }}
      </small>
      <time class="social-grid-date">
        {{ relativizeDate(comment.createdAt) }}
      </time>
      <p class="social-grid-message">
        {{ comment.message }}
      </p>
      <div class="social-grid-replies">
        <div
          v-for="reply in comment.replies"
          class="social-grid reply-split-line">
          <img
            class="social-grid-avatar"
            :src="reply.avatar || avatarImage">
          <small class="social-grid-name">
            {{ reply.name || anonymous }}
          </small>
          <time class="social-grid-date">
            {{ relativizeDate(reply.createdAt) }}
          </time>
          <p class="social-grid-message">
            {{ reply.message }}
          </p>
        </div>
      </div>
    </figure>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import { SOCIAL } from '~js/constants'
import { getBrowserLang } from '~js/helpers'
import HandleData from '../../../mixins/HandleData.vue'

export default {
  name: 'CommentsList',
  mixins: [
    HandleData
  ],

  data () {
    return {
      anonymous: 'Anonymous',
      avatarImage: require('./img/avatar.svg')
    }
  },

  created () {
    moment.locale(getBrowserLang())
  },

  mounted () {
    this.$emit('setCommentsEl', this.$refs.comments)
  },

  computed: {
    ...mapGetters([
      'comments',
      'isCommentsActive'
    ]),

    filter () {
      return {
        key: 'createdAt',
        order: -1
      }
    }
  },

  methods: {
    ...mapActions([
      'addComment',
      'fetchComments'
    ]),

    scrollHandler (e) {
      if (e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight) {
        this.fetchMoreComments()
      }
    },

    fetchMoreComments () {
      const commentsCount = this.comments.length
      this.fetchComments(commentsCount + SOCIAL.FETCH_COMMENTS_COUNTS_EACH_TIME)
      const newCommentsCount = this.comments.length
      const newCommentsScrollHeight = this.$refs.comments.scrollHeight
      if (commentsCount !== newCommentsCount) {
        const totalScrollHeight = newCommentsScrollHeight
        this.$nextTick(() => {
          this.$refs.comments.scrollTop = totalScrollHeight
        })
      }
    },

    relativizeDate (date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../~css/variables.styl'
@import '../~css/extends.styl'

$input-height = 40px
.comments-list {
  @extend .overflow-auto
  position: relative
  height: "calc(100% - %s)" % $input-height
  margin: 0 20px
}

.comments-item {
  position: relative
  padding: 20px 0
  margin: 0 20px
  overflow-x: hidden

  + .comments-item {
    border-top-width: 2px
    border-top-color: alpha($light-gray-color, 70%)
    border-top-style: solid
  }
}

$bdh = 2px
$pdt = 10px + $bdh
$name-height = 20px
.social-grid {
  position: relative
  margin-bottom: 10px
  padding-top: $pdt

  + .social-grid {
    &::before {
      @extend .absolute-full-width
      content: ''
      top: 0
      height: $bdh
      background-color: alpha($light-gray-color, 70%)
    }
  }

  .social-grid {
    width: "calc(100% - %s - %s)" % ($comments-list-img-size $comments-list-img-text-margin)
    margin-left: $comments-list-social-grid-margin
  }
}

.social-grid-avatar {
  position: absolute
  top: $pdt
  left: $comments-list-social-grid-avatar-pos
  width: $comments-list-img-size
  height: $comments-list-img-size
  border-radius: 50%
  background-color: $white
}

.social-grid-name,
.social-grid-date,
.social-grid-message,
.social-grid-replies {
  @extend .text-with-gray-bg
  font-size: 14px
  line-height: 20px
}

.social-grid-name {
  @extend .text-ellipsis
  position: absolute
  top: $pdt
  left: $comments-list-img-size + $comments-list-img-text-margin
  color: $white
}

.social-grid-date {
  position: absolute
  top: $pdt
  right: $comments-list-social-grid-date-pos
  font-size: 14px
  line-height: 20px
  color: $light-gray-color
}

.social-grid-message {
  position: relative
  margin-top: $pdt + $name-height
  margin-left: $comments-list-img-size + $comments-list-img-text-margin
}

.reply-split-line {
  margin-top: 10px

  &::before {
    @extend .absolute-full-width
    content: ''
    top: 0
    height: $bdh
    background-color: alpha($light-gray-color, 70%)
  }
}

@media (min-width: $response) {
  .comments-list {
    margin: 0
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '../~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .social-grid {
    .social-grid {
      margin-left: 0
      margin-right: $comments-list-social-grid-margin
    }
  }

  .social-grid-avatar {
    left: auto
    right: $comments-list-social-grid-avatar-pos
  }

  .social-grid-name {
    left: auto
    right: $comments-list-img-size + $comments-list-img-text-margin
  }

  .social-grid-date {
    right: auto
    left: $comments-list-social-grid-date-pos
  }

  .social-grid-message {
    margin-left: 0
    margin-right: $comments-list-img-size + $comments-list-img-text-margin
  }
}
</style>
