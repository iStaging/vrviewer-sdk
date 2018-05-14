import { enterFullscreen, exitFullscreen } from '~js/utils'
import gaEvents from '~js/ga-events'

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
      gaEvents.sendEvent('Building', 'EnterFullScreen', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  exitFullscreen ({ commit, state, rootState }) {
    if (state.isFullscreen === true) {
      exitFullscreen()
      commit('SET_FULL_SCREEN', false)
      gaEvents.sendEvent('Building', 'ExitFullScreen', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
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
