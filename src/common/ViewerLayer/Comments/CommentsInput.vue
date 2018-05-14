<template>
  <form class="comments-input-wrapper">
    <label>
      <input
        type="text"
        class="comments-input"
        :placeholder="$t('addComment')"
        :aria-label="$t('addComment')"
        v-model="message">
    </label>
    <button
      type="submit"
      class="comments-send-comment-button"
      :aria-label="$t('send')"
      @click="addMessage">
      {{ $t('send') }}
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gaEvents from '~js/ga-events'

export default {
  name: 'CommentsInput',
  props: {
    commentsEl: {
      type: HTMLElement,
      default () {
        return null
      }
    }
  },

  data () {
    return {
      message: ''
    }
  },

  computed: {
    ...mapGetters([
      'comments',
      'currentBuilding'
    ])
  },

  methods: {
    ...mapActions([
      'addComment',
      'fetchComments'
    ]),

    addMessage (e) {
      e.preventDefault()
      if (this.message.trim().length <= 0) {
        return
      }
      this.addComment(this.message).then(() => {
        gaEvents.sendEvent('Building', 'AddComment', this.currentBuilding.objectId)
        this.message = ''
        if (this.commentsEl) {
          this.commentsEl.scrollTop = 0
        }
      }, err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../~css/variables.styl'
@import '../~css/extends.styl'

$button-width = 72px
$input-height = 40px
.comments-input-wrapper {
  @extend .flex-center
  @extend .absolute-full-width
  bottom: 0
  height: $input-height
  line-height: $input-height

  label {
    width: "calc(100% - %s)" % $button-width
    height: $input-height
    margin: 0
    border: 0
  }
}

.comments-input {
  @extend .full
  font-size: 14px
  padding: 0 10px
  border-top-style: solid
  border-top-width: 1px
  border-top-color: #b7bcc0
  border-left-style: none
  border-left-width: 0
  border-left-color: transparent
  border-bottom-style: none
  border-bottom-width: 0
  border-bottom-color: transparent
  border-right-style: none
  border-right-width: 0
  border-right-color: transparent
}

.comments-send-comment-button {
  width: $button-width
  height: $input-height
  background-color: $pink-color
  border: 0
  color: $white
  font-size: 14px
  cursor: pointer
  border-radius: 0

  &:hover {
    background-color: darken($pink-color, 5%)
  }

  &:active {
    transform: translateY(1px)
  }
}

.comments-input,
.comments-send-comment-button {
  &:focus {
    outline: none
  }
}

@media (min-width: $response) {
  .comments-input-wrapper {
    position: relative
    box-shadow: none
    width: 100%
  }

  .comments-input {
    border-top-left-radius: $comments-input-comments-send-comment-button
    border-bottom-left-radius: $comments-input-comments-send-comment-button
    border-right-style: solid
    border-right-color: #b7bcc0
    border-left-style: solid
    border-left-width: $comments-input-comments-input-border
    border-left-color: #b7bcc0
    border-bottom-style: solid
    border-bottom-width: 1px
    border-bottom-color: #b7bcc0
  }

  .comments-send-comment-button {
    border-top-right-radius: $comments-input-comments-send-comment-button
    border-bottom-right-radius: $comments-input-comments-send-comment-button
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '../~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  @media (min-width: $response) {
    .comments-send-comment-button {
      border-top-right-radius: 0
      border-bottom-right-radius: 0
      border-top-left-radius: $comments-input-comments-send-comment-button
      border-bottom-left-radius: $comments-input-comments-send-comment-button
    }

    .comments-input {
      border-top-left-radius: 0
      border-bottom-left-radius: 0
      border-top-right-radius: $comments-input-comments-send-comment-button
      border-bottom-right-radius: $comments-input-comments-send-comment-button
      border-right-width: $comments-input-comments-input-border
      border-left-width: 0
    }
  }
}
</style>
