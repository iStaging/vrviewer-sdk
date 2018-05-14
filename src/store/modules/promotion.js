import gaEvents from '~js/ga-events'

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
      gaEvents.sendEvent('Building', 'ShowPromotionBar', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  closePromotionBar ({ commit, state, rootState }) {
    if (state.isPromotionBarActive === true) {
      commit('SET_PROMOTION_BAR_ACTIVE', false)
      gaEvents.sendEvent('Building', 'ClosePromotionBar', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
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
