<docs>
  Use social media to share viewer on it.
</docs>

<template>
  <i-repeat
    class="share-list"
    :model="filterItem(shareList, 'name')">
    <a
      role="button"
      class="share-list-a"
      v-for="item in shareList"
      v-show="!item.hidden"
      :key="item.name"
      :slot="item.name"
      :href="item.url"
      :target="item.target"
      :style="item.style"
      @click="item.method">
      <icon
        class="share-list-icon"
        :image="item.image"
        :style="item.iconStyle"
        :hasLazyload="true">
      </icon>
      <span class="share-list-text">
        {{ item.text }}
      </span>
    </a>
  </i-repeat>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile } from '@/api/utils'
import server from '@/api/server'
import Icon from '../../components/Icon/index.vue'
import IRepeat from '../../components/IRepeat.vue'
import HandleData from '../../mixins/HandleData.vue'

export default {
  name: 'ShareList',
  components: {
    Icon,
    IRepeat
  },

  mixins: [
    HandleData
  ],

  computed: {
    ...mapGetters([
      'currentBuilding',
      'shareUrl'
    ]),

    shareList () {
      return [{
        name: 'facebook',
        image: require('./img/share/facebook.png'),
        target: '_blank',
        url: `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl.facebook}`,
        text: 'Facebook',
        style: {
          backgroundColor: '#475993'
        },
        iconStyle: {
          width: '17px',
          height: '30px',
          bottom: '0'
        },
        method: () => {
        }
      }, {
        name: 'google-plus',
        image: require('./img/share/google-plus.png'),
        target: '_blank',
        url: `https://plus.google.com/share?url=${this.shareUrl.googlePlus}`,
        text: 'Google Plus',
        style: {
          backgroundColor: '#dc4e41'
        },
        iconStyle: {
          width: '30px',
          height: '19px',
          top: 'calc(50% - 9.5px)'
        },
        method: () => {
        }
      }, {
        name: 'twitter',
        image: require('./img/share/twitter.png'),
        target: '_blank',
        url: `https://twitter.com/intent/tweet?url=${this.shareUrl.twitter}`,
        text: 'Twitter',
        style: {
          backgroundColor: '#50abf1'
        },
        iconStyle: {
          width: '25px',
          height: '22px',
          top: 'calc(50% - 11px)'
        },
        method: () => {
        }
      }, {
        name: 'messenger',
        hidden: !isMobile(),
        image: require('./img/share/messenger.png'),
        target: '_self',
        url: `fb-messenger://share?link=${encodeURIComponent(this.shareUrl.messenger)}&app_id=${encodeURIComponent(server.facebookAppId)}`,
        text: 'Messenger',
        style: {
          backgroundColor: '#0084ff'
        },
        iconStyle: {
          width: '27px',
          height: '27px',
          top: 'calc(50% - 13.5px)'
        },
        method: () => {
        }
      }, {
        name: 'line',
        hidden: !isMobile(),
        image: require('./img/share/line.png'),
        target: '_blank',
        url: `http://line.me/R/msg/text/?${document.title} ${this.shareUrl.line}`,
        text: 'Line',
        style: {
          backgroundColor: '#3ace01'
        },
        iconStyle: {
          width: '32px',
          height: '30px',
          top: 'calc(50% - 15px)'
        },
        method: () => {
        }
      }]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.share-list {
  width: 240px

  >>> .i-repeat-li {
    margin-top: 20px

    &:last-child {
      margin-bottom: 20px
    }
  }
}

.share-list-a {
  position: relative
  display: flex
  align-items: center
  justify-content: flex-start
  cursor: pointer
  width: 100%
  height: 40px
  border-radius: 5px
}

.share-list-icon {
  position: absolute
  background-size: 100% 100%
  margin-left: $share-list-share-list-icon-margin
}

.share-list-text {
  @extend .text-with-gray-bg
  margin-left: $share-list-share-list-text-margin
  font-size: 20px
  font-weight: 400
  font-family: 'Helvetica'
  line-height: 24px
}

@media (min-width: $response) {
  .share-list {
    width: 260px
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
@import '~css/variables.styl'

.theme-rtl.theme-rtl-overlap {
  .share-list-icon {
    margin-left: 0
    margin-right: $share-list-share-list-icon-margin
  }

  .share-list-text {
    margin-left: 0
    margin-right: $share-list-share-list-text-margin
  }
}
</style>
