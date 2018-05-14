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
    } else {
      commit('SET_UI_MODE', false)
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
