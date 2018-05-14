<template>
  <div
    class="full-center visitor-wrapper">
    <div class="visitor-wrapper-container">
      <form @submit.prevent="handleSendForm">
        <div class="visitor-header">
          <img
            v-if="!isMobile()"
            :src="visitorImage"
            alt="visitor">
          <p class="visitor-desc">
            {{ $t('leaveInfoContinue') }}
          </p>
        </div>
        <div class="visitor-body">
          <div :class="['visitor-input', { 'pink' : shouldChangeBorderColor('name') }]">
            <label for="visitorName">
              <img :src="userImage">
            </label>
            <input
              id="visitorName"
              type="text"
              v-model="name"
              :placeholder="$t('name')"
              @focus="isNameFocusing = true"
              @blur="isNameFocusing = false"
              @input="controller('name', 'validate')">
          </div>
          <div :class="['visitor-input', { 'pink' : shouldChangeBorderColor('email') }]">
            <label for="visitorEmail">
              <img :src="emailImage">
            </label>
            <input
              id="visitorEmail"
              type="email"
              v-model="email"
              :placeholder="$t('email')"
              @focus="isEmailFocusing = true"
              @blur="isEmailFocusing = false"
              @input="controller('email', 'validate')">
          </div>
          <p
            v-show="shouldShowError"
            class="visitor-error">
            {{ $t('emailFormatInvalid') }}
          </p>
        </div>
        <div class="visitor-footer">
          <button
            type="submit"
            :class="['visitor-btn', { success: shouldFormBeChecked && !hasError }]">
            {{ $t('send') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { isMobile } from '@/api/utils'

export default {
  name: 'VisitorWrapper',
  data () {
    return {
      visitorImage: require('./img/visitors.svg'),
      userImage: require('./img/user.svg'),
      emailImage: require('./img/email.svg'),
      normalUserImage: require('./img/user.svg'),
      errorUserImage: require('./img/user-red.svg'),
      normalEmailImage: require('./img/email.svg'),
      errorEmailImage: require('./img/email-red.svg'),
      name: '',
      email: '',
      isNameFocusing: false,
      isEmailFocusing: false,
      shouldFormBeChecked: false,
      shouldShowError: false
    }
  },

  computed: {
    ...mapGetters([
      'currentBuilding',
      'isUiMode'
    ]),

    isNameValidate () {
      return this.isRequired(this.name)
    },

    isEmailValidate () {
      const email = /^.+@.+$/
      return email.test(this.email)
    },

    hasError () {
      return !this.isNameValidate || !this.isEmailValidate
    }
  },

  methods: {
    ...mapActions([
      'addVisitor',
      'setScreenReady'
    ]),
    isMobile,

    isRequired (value) {
      return value.length > 0
    },

    shouldChangeBorderColor (field) {
      let shouldChange
      if (field === 'name') {
        shouldChange = this.isNameFocusing || (this.shouldFormBeChecked && !this.isNameValidate)
      } else if (field === 'email') {
        shouldChange = this.isEmailFocusing || (this.shouldFormBeChecked && !this.isEmailValidate)
      }
      return shouldChange
    },

    controller (field, action) {
      if ((field !== 'name' && field !== 'email') || (action !== 'validate' && action !== 'setImage')) {
        return
      }
      const control = {
        name: {
          validate: () => this.validateName(),
          setImage: () => this.setNameImage()
        },
        email: {
          validate: () => this.validateEmail(),
          setImage: () => this.setEmailImage()
        }
      }
      // console.log('controller: ', field, action)
      control[field][action]()
    },

    validateName () {
      this.shouldFormBeChecked = true
      this.controller('name', 'setImage')
    },

    validateEmail () {
      this.shouldFormBeChecked = true
      this.controller('email', 'setImage')
      this.shouldShowError = !this.isEmailValidate
    },

    setNameImage () {
      this.userImage = this.isNameValidate
        ? this.normalUserImage
        : this.errorUserImage
    },

    setEmailImage () {
      this.emailImage = this.isEmailValidate
        ? this.normalEmailImage
        : this.errorEmailImage
    },

    handleSendForm () {
      this.shouldFormBeChecked = true
      if (this.hasError) {
        this.controller('name', 'setImage')
        this.controller('email', 'setImage')
        this.shouldShowError = !this.isEmailValidate
        return
      }

      const user = {
        name: this.name,
        email: this.email
      }

      this.addVisitor(user).then(() => {
        let alreadyFilledVisitorBuildingsId = window.sessionStorage.getItem('alreadyFilledVisitorBuildingsId')
        // console.log('alreadyFilledVisitorBuildingsId: ', alreadyFilledVisitorBuildingsId)
        if (alreadyFilledVisitorBuildingsId) {
          alreadyFilledVisitorBuildingsId = JSON.parse(alreadyFilledVisitorBuildingsId)
        } else {
          alreadyFilledVisitorBuildingsId = []
        }
        alreadyFilledVisitorBuildingsId.push(this.currentBuilding.objectId)
        sessionStorage.setItem('alreadyFilledVisitorBuildingsId', JSON.stringify(alreadyFilledVisitorBuildingsId))
        this.$emit('hideVisitor')
        this.shouldFormBeChecked = false
        this.setScreenReady(true)
      }, err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'

.visitor-wrapper {
  pointer-events: auto
  z-index: $visitor-wrapper-z
  background-color: alpha($dark-gray, 80%)

  .visitor-desc {
    margin-top: 15px
    text-shadow: none
  }
}

.visitor-wrapper-container {
  width: 80%

  @media (min-width: $response) {
    width: 350px
  }
}

.visitor-header {
  text-align: center
  // img {
  //   display: none
  //   @media (min-width: $response) {
  //     display: initial
  //   }
  // }
}

.visitor-body {
  margin: 20px 0

  @media (min-width: $response) {
    margin: 45px 0 30px
  }
}

.visitor-footer {
  display: flex
  flex-direction: column
  align-items: flex-end
}

.visitor-input {
  display: flex
  align-items: center
  border-bottom: 1px solid $white

  &:not(:last-of-type) {
    margin-bottom: 20px
  }

  &.pink {
    border-color: $light-pink-color
  }

  img {
    width: 30px
    height: 30px
    opacity: .6
  }

  input {
    background-color: transparent
    border: none
    color: $white
    font-size: 18px
    padding-left: 15px

    &::placeholder {
      color: $white
    }

    &:-ms-input-placeholder {
      color: $white
    }

    &::-ms-input-placeholder {
      color: $white
    }

    &:focus {
      outline: none
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: $white !important
      transition: background-color 5000s ease-in-out 0s

      // &:focus, &:active, &:hover {
      //   -webkit-text-fill-color: $white !important
      //   transition: background-color 5000s ease-in-out 0s
      // }
    }
  }
}

.visitor-error {
  display: flex
  justify-content: flex-end
  margin-top: 5px
  color: $light-pink-color
  text-shadow: none
  font-size: 14px
}

.visitor-btn {
  color: $white
  background-color: transparent
  border-radius: 5px
  font-size: 18px
  padding: 8px 30px
  cursor: pointer

  &:focus {
    outline: none
  }

  &:active {
    opacity: .8
  }

  &.success {
    background-color: $pink-color
    border-color: $pink-color
  }
}
</style>
