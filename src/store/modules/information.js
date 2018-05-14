import gaEvents from '~js/ga-events'

const state = {
  isInformationActive: false
}

export const getters = {
  isInformationActive: state => state.isInformationActive
}

export const actions = {
  showInformation ({ commit, state, rootState }) {
    if (state.isInformationActive === false) {
      commit('SET_INFORMATION_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ShowInformation', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  toggleInformation ({ dispatch }) {
    if (state.isInformationActive === true) {
      dispatch('closeInformation')
    } else {
      dispatch('showInformation')
    }
  },

  closeInformation ({ commit, state, rootState }) {
    if (state.isInformationActive === true) {
      commit('SET_INFORMATION_ACTIVE', false)
      gaEvents.sendEvent('Building', 'CloseInformation', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  }
}

export const mutations = {
  SET_INFORMATION_ACTIVE (state, bool = false) {
    state.isInformationActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
