<template>
  <div class="vrsdk-customized-tag-gift">
    <h2 class="vrsdk-gift-title">
      現金禮券
    </h2>
    <hr>
    <h3 class="vrsdk-text-lg">
      輸入信箱即可得到 ＄100 現金禮卷
    </h3>
    <div class="vrsdk-input-control">
      <div class="vrsdk-input-inner">
        <label
          class="vrsdk-flex-center"
          for="name">
          <img :src="userImage">
        </label>
        <input
          id="name"
          class="vrsdk-input vrsdk-full"
          type="text"
          placeholder="名字">
      </div>
    </div>
    <div class="vrsdk-input-control">
      <div class="vrsdk-input-inner">
        <label
          class="vrsdk-flex-center"
          for="email">
          <img :src="emailImage">
        </label>
        <input
          id="email"
          class="vrsdk-input vrsdk-full"
          type="email"
          placeholder="Email">
      </div>
    </div>
    <div class="vrsdk-gift-footer">
      <button
        type="button"
        class="vrsdk-btn">
        發送
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userImage from './img/user.svg'
import emailImage from './img/email.svg'

export default {
  name: 'CustomizedTagGift',
  data () {
    return {
      userImage,
      emailImage
    }
  },

  computed: {
    ...mapGetters([
      'markerInfoData'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/extends.styl'
@import '~css/variables.styl'

a,
span,
h2,
h3,
h4,
p {
  text-shadow: none
}

h3 {
  margin-top: 15px
  margin-bottom: 15px
}

.vrsdk-customized-tag-gift {
  position: relative
  max-height: 100%
  overflow: auto
}

.vrsdk-gift-title {
  @extends .vrsdk-text-ml
  text-align: center
}

hr {
  height: 1px
  width: 100%
  margin: 5px 0
}


.vrsdk-input-control {
  position: relative
  display: flex
  border-bottom-width: 1px
  border-bottom-color: $white
  border-bottom-style: solid

  &:not(:last-of-type) {
    margin-bottom: 20px
  }

  &.vrsdk-disabled {
    opacity: .6
    border-bottom-color: alpha($white, 60%)
  }

  &.vrsdk-pink {
    border-color: $light-pink-color
  }

  img {
    width: 30px
    height: 30px
    opacity: .6
  }
}

.vrsdk-input-inner {
  width: 100%
  display: flex
  align-items: center
}

.vrsdk-input {
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
  }
}

.vrsdk-btn {
  color: $white
  background-color: transparent
  border-radius: 5px
  font-size: 18px
  padding: 8px 30px
  cursor: pointer

  &:focus {
    outline: none
  }
}

.vrsdk-gift-footer {
  display: flex
  justify-content: flex-end
  margin-top: 25px
}
</style>
