import gaEvents from '~js/ga-events'

const state = {
  isPanoramasListActive: false
}

export const getters = {
  isPanoramasListActive: state => state.isPanoramasListActive
}

export const actions = {
  showPanoramasList ({ commit, state, rootState }) {
    if (state.isPanoramasListActive === false) {
      commit('SET_PANORAMAS_LIST_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ShowPanoramasList', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  togglePanoramasList ({ dispatch, state }) {
    if (state.isPanoramasListActive === true) {
      dispatch('closePanoramasList')
    } else {
      dispatch('showPanoramasList')
    }
  },

  closePanoramasList ({ commit, state, rootState }) {
    if (state.isPanoramasListActive === true) {
      commit('SET_PANORAMAS_LIST_ACTIVE', false)
      gaEvents.sendEvent('Building', 'ClosePanoramasList', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  }
}

export const mutations = {
  SET_PANORAMAS_LIST_ACTIVE (state, bool = false) {
    state.isPanoramasListActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
