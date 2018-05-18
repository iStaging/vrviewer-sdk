const state = {
  isMobileMenuActive: false
}

export const getters = {
  isMobileMenuActive: state => state.isMobileMenuActive
}

export const actions = {
  showMobileMenu ({ commit, state }) {
    if (state.isMobileMenuActive === false) {
      commit('SET_MOBILE_MENU_ACTIVE', true)
    }
  },

  closeMobileMenu ({ commit, state }) {
    if (state.isMobileMenuActive === true) {
      commit('SET_MOBILE_MENU_ACTIVE', false)
    }
  }
}

export const mutations = {
  SET_MOBILE_MENU_ACTIVE (state, bool = false) {
    state.isMobileMenuActive = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
