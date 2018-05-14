const state = {
  isPromotionBarActive: false
}

export const getters = {
  isPromotionBarActive: state => state.isPromotionBarActive
}

export const actions = {
  showPromotionBar ({ commit, state, rootState }) {
    if (state.isPromotionBarActive === false) {
      commit('SET_PROMOTION_BAR_ACTIVE', true)
    }
  },

  closePromotionBar ({ commit, state, rootState }) {
    if (state.isPromotionBarActive === true) {
      commit('SET_PROMOTION_BAR_ACTIVE', false)
    }
  }
}

export const mutations = {
  SET_PROMOTION_BAR_ACTIVE (state, bool = false) {
    state.isPromotionBarActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
