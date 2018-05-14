import gaEvents from '~js/ga-events'

const state = {
  isLocationActive: false
}

export const getters = {
  isLocationActive: state => state.isLocationActive
}

export const actions = {
  showLocation ({ commit, state, rootState }) {
    if (state.isLocationActive === false) {
      commit('SET_LOCATION_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ShowLocation', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  toggleLocation ({ dispatch }) {
    if (state.isLocationActive === true) {
      dispatch('closeLocation')
    } else {
      dispatch('showLocation')
    }
  },

  closeLocation ({ commit, state, rootState }) {
    if (state.isLocationActive === true) {
      commit('SET_LOCATION_ACTIVE', false)
      gaEvents.sendEvent('Building', 'CloseLocation', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  }
}

export const mutations = {
  SET_LOCATION_ACTIVE (state, bool = false) {
    state.isLocationActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
