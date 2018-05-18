const state = {
  isPanoramasListActive: false
}

export const getters = {
  isPanoramasListActive: state => state.isPanoramasListActive
}

export const actions = {
  showPanoramasList ({ commit, state }) {
    if (state.isPanoramasListActive === false) {
      commit('SET_PANORAMAS_LIST_ACTIVE', true)
    }
  },

  togglePanoramasList ({ dispatch, state }) {
    if (state.isPanoramasListActive === true) {
      dispatch('closePanoramasList')
    } else {
      dispatch('showPanoramasList')
    }
  },

  closePanoramasList ({ commit, state }) {
    if (state.isPanoramasListActive === true) {
      commit('SET_PANORAMAS_LIST_ACTIVE', false)
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
