import { enterFullscreen, exitFullscreen } from '@/api/utils'

const state = {
  isFullscreen: false
}

export const getters = {
  isFullscreen: state => state.isFullscreen
}

export const actions = {
  enterFullscreen ({ commit, state, rootState }) {
    if (state.isFullscreen === false) {
      enterFullscreen()
      commit('SET_FULL_SCREEN', true)
    }
  },

  exitFullscreen ({ commit, state, rootState }) {
    if (state.isFullscreen === true) {
      exitFullscreen()
      commit('SET_FULL_SCREEN', false)
    }
  }
}

export const mutations = {
  SET_FULL_SCREEN (state, bool = false) {
    state.isFullscreen = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
