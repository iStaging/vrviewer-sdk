<docs>
  Top left's user profile, and group or live tour title name
</docs>

<template>
  <section
    role="banner"
    class="profile">
    <figure
      class="profile-figure"
      @click="toggleProfile">
      <img
        class="profile-avatar"
        :src="userAvatar">
    </figure>
    <div class="profile-detail">
      <h4 class="profile-detail-title">
        {{ profileData('name') }}
      </h4>
      <p class="profile-detail-text">
        {{ profileData('companyDisplayName') }}
      </p>
      <p class="profile-detail-text">
        {{ profileData('phone') }}
      </p>
    </div>
    <div class="profile-panoCollection-info">
      <h1
        v-if="currentPanoCollection.name"
        class="profile-panoCollection-info-title">
        {{ currentPanoCollection.name }}
      </h1>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { iStagingUrl } from '@/api/helpers'
import Icon from '../../components/Icon/index.vue'

export default {
  name: 'Profile',
  components: {
    Icon
  },

  data () {
    return {
      defaultAvatar: require('./img/profile-default-avatar.jpg'),
      defaultName: 'iStaging',
      defaultDescription: 'www.istaging.com',
      iStagingUrl: iStagingUrl
    }
  },

  computed: {
    ...mapGetters([
      'currentPanoCollection'
    ]),

    userAvatar () {
      // todo: collection logo
      // return this.user.profileUrl || this.defaultAvatar
    }
  },

  methods: {
    ...mapActions([
      'toggleProfile'
    ]),

    profileData (key) {
      // return this.user[key]
      // todo: collection info data
    },

    clickBasicDescriptionUrl () {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.profile {
  position: relative
  max-width: 170px
  pointer-events: none
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  // word-wrap: break-word
  // word-break: break-all
}

.profile-avatar {
  display: block
  $w = 44px
  $h = 44px
  width: $w
  height: $h
  pointer-events: auto
  cursor: pointer
  background-color: $white
}

.profile-detail {
  font-size: 14px
  pointer-events: auto
}

.profile-detail-title {
  font-weight: normal
}

.profile-detail-text {
  display: block
}

.profile-detail-title, .profile-detail-text {
  margin-top: 10px
}

.profile-panoCollection-info {
  display: none
}

.profile-figure {
  display: flex
  overflow: hidden
  border-radius: 50%
  box-shadow: 1px 1px 2px 1px alpha($black, 30%)
}

@media screen and (orientation: landscape) {
  .profile {
    max-width: 200px
  }
}

@media screen and (min-width: $response) {
  .profile {
    max-width: 200px
    flex-direction: column
    align-items: flex-start
  }

  .profile-avatar {
    $w = 80px
    $h = 80px
    width: $w
    height: $h
  }

  .profile-detail {
    + .profile-panoCollection-info {
      margin-top: 10px
    }
  }

  .profile-panoCollection-info {
    position: relative
    display: block
    pointer-events: auto
    margin-top: 10px
  }

  .profile-panoCollection-info-title {
    font-size: 18px
    line-height: 25px
    font-weight: normal
  }

  .profile-panoCollection-info-description {
    margin-top: 4px
    font-size: 14px
    line-height: 20px
    color: $white
    text-shadow: 1px 1px 2px #333
  }
}
</style>
