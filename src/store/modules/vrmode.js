const state = {
  isVrMode: false
}

export const getters = {
  isVrMode: state => state.isVrMode
}

export const actions = {
  enterVrMode ({ commit, state, rootState }) {
    if (rootState.krpano.krpanoEl && state.isVrMode === false) {
      rootState.krpano.krpanoEl.call('WebVR.enterVR();')
      commit('SET_VR_MODE', true)
      commit('SET_CAMERA_ROTATING', false)
    }
  },

  exitVrMode ({ commit, state, rootState }) {
    if (rootState.krpano.krpanoEl && state.isVrMode === true) {
      rootState.krpano.krpanoEl.call('WebVR.exitVR();')
      commit('SET_VR_MODE', false)
      commit('SET_CAMERA_ROTATING', true)
    }
  }
}

export const mutations = {
  SET_VR_MODE (state, bool = false) {
    state.isVrMode = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
