import gaEvents from '~js/ga-events'

const state = {
  isUiMode: false
}

export const getters = {
  isUiMode: state => state.isUiMode
}

export const actions = {
  initUiMode ({ commit, rootState }) {
    const { ui } = rootState.route.query
    if (ui === 'true') {
      commit('SET_UI_MODE', true)
      gaEvents.sendEvent('Building', 'UIMode', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    } else {
      commit('SET_UI_MODE', false)
      gaEvents.sendEvent('Building', 'NotUIMode', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  }
}

export const mutations = {
  SET_UI_MODE (state, bool = false) {
    state.isUiMode = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
