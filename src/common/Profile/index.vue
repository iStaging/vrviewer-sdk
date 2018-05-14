<docs>
  Top left's user profile, and group or live tour title name
</docs>

<template>
  <section
    role="banner"
    class="profile">
    <template v-if="!isUiMode">
      <template v-if="!customSetting.customBranding">
        <figure
          class="profile-figure"
          @click="toggleProfile">
          <img
            class="profile-avatar"
            :src="defaultAvatar">
        </figure>
        <div
          v-show="isProfileActive"
          class="profile-detail">
          <h4 class="profile-detail-title">
            {{ defaultName }}
          </h4>
          <a
            class="profile-detail-text"
            :href="iStagingUrl"
            target="_blank"
            @click="clickBasicDescriptionUrl">
            {{ defaultDescription }}
          </a>
        </div>
      </template>
      <template v-else-if="showContactInfo">
        <figure
          class="profile-figure"
          @click="toggleProfile">
          <img
            class="profile-avatar"
            :src="userAvatar">
        </figure>
        <div
          v-if="user"
          v-show="isProfileActive"
          class="profile-detail">
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
      </template>
    </template>
    <div class="profile-building-info">
      <template v-if="property.objectId">
        <h1
          v-if="property.name"
          class="profile-building-info-title">
          {{ property.name }}
        </h1>
      </template>
      <template v-else>
        <h1
          v-if="currentBuilding.name"
          class="profile-building-info-title">
          {{ currentBuilding.name }}
        </h1>
      </template>
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
      'currentBuilding',
      'customSetting',
      'isProfileActive',
      'isUiMode',
      'property',
      'showContactInfo',
      'user'
    ]),

    userAvatar () {
      if (this.user.showAdminProfile && this.user.adminProfile) {
        return this.user.adminProfile.profileUrl || this.defaultAvatar
      } else {
        return this.user.profileUrl || this.defaultAvatar
      }
    }
  },

  methods: {
    ...mapActions([
      'toggleProfile'
    ]),

    profileData (key) {
      if (this.user.showAdminProfile && this.user.adminProfile) {
        return this.user.adminProfile[key]
      } else {
        return this.user[key]
      }
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

.profile-building-info {
  display: none
}

.profile-figure {
  display: flex
  overflow: hidden
  border-radius: 50%
  box-shadow: 1px 1px 2px 1px alpha($black, 30%)
}

@media (orientation: landscape) {
  .profile {
    max-width: 200px
  }
}

@media (min-width: $response) {
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
    + .profile-building-info {
      margin-top: 10px
    }
  }

  .profile-building-info {
    position: relative
    display: block
    pointer-events: auto
    margin-top: 10px
  }

  .profile-building-info-title {
    font-size: 18px
    line-height: 25px
    font-weight: normal
  }

  .profile-building-info-description {
    margin-top: 4px
    font-size: 14px
    line-height: 20px
    color: $white
    text-shadow: 1px 1px 2px #333
  }
}
</style>
