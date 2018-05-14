const state = {
  isFloorplanActive: false
}

export const getters = {
  isFloorplanActive: state => state.isFloorplanActive
}

export const actions = {
  showFloorplan ({ commit, state, rootState }) {
    if (state.isFloorplanActive === false) {
      commit('SET_FLOORPLAN_ACTIVE', true)
    }
  },

  toggleFloorplan ({ dispatch, state }) {
    if (state.isFloorplanActive === true) {
      dispatch('closeFloorplan')
    } else {
      dispatch('showFloorplan')
    }
  },

  closeFloorplan ({ commit, state, rootState }) {
    if (state.isFloorplanActive === true) {
      commit('SET_FLOORPLAN_ACTIVE', false)
    }
  }
}

export const mutations = {
  SET_FLOORPLAN_ACTIVE (state, bool = false) {
    state.isFloorplanActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
