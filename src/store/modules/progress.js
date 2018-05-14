const state = {
  isProgressActive: false,
  progressValue: 0,
  progressMax: 30
}

export const getters = {
  isProgressActive: state => state.isProgressActive,
  progressValue: state => state.progressValue,
  progressMax: state => state.progressMax
}

export const actions = {
  showProgress ({ commit, state }) {
    if (state.isProgressActive === false) {
      commit('SET_PROGRESS_ACTIVE', true)
    }
  },

  closeProgress ({ commit, state }) {
    if (state.isProgressActive === true) {
      commit('SET_PROGRESS_ACTIVE', false)
    }
  },

  addProgressCount ({ commit }, number = 1) {
    commit('ADD_PROGRESS_COUNT', number > 0 ? number : 0)
  },

  setProgressCount ({ commit }, number = 0) {
    commit('SET_PROGRESS_COUNT', number > 0 ? number : 0)
  },

  setProgressMax ({ commit }, number = 0) {
    commit('SET_PROGRESS_MAX', number > 0 ? number : 0)
  }
}

export const mutations = {
  SET_PROGRESS_ACTIVE (state, bool = false) {
    state.isProgressActive = bool
  },

  ADD_PROGRESS_COUNT (state, number = 1) {
    state.progressValue += number
  },

  SET_PROGRESS_COUNT (state, number = 0) {
    state.progressValue = number
  },

  SET_PROGRESS_MAX (state, number = 0) {
    state.progressMax = number
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
