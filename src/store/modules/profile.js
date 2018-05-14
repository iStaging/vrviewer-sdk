import gaEvents from '~js/ga-events'

const state = {
  isProfileActive: true
}

export const getters = {
  isProfileActive: state => state.isProfileActive
}

export const actions = {
  showProfile ({ commit, state, rootState }) {
    if (state.isProfileActive === false) {
      commit('SET_PROFILE_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ClickAvatarShowProfile', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  toggleProfile ({ dispatch }) {
    if (state.isProfileActive === true) {
      dispatch('closeProfile')
    } else {
      dispatch('showProfile')
    }
  },

  closeProfile ({ commit, state, rootState }) {
    if (state.isProfileActive === true) {
      commit('SET_PROFILE_ACTIVE', false)
      gaEvents.sendEvent('Building', 'ClickAvatarHideProfile', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  }
}

export const mutations = {
  SET_PROFILE_ACTIVE (state, bool = false) {
    state.isProfileActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
