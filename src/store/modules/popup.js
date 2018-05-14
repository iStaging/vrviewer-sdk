import gaEvents from '~js/ga-events'
import {
  POPUP
} from '~js/constants'

const state = {
  isPopupActive: false,
  popupUrl: '',
  popupSizeConfig: {
    width: POPUP.WIDTH,
    height: POPUP.HEIGHT,
    widthPercent: POPUP.WIDTH_PERCENT,
    widthType: POPUP.WIDTH_TYPE
  }
}

export const getters = {
  isPopupActive: state => state.isPopupActive,
  popupUrl: state => state.popupUrl,
  popupSizeConfig: state => state.popupSizeConfig
}

export const actions = {
  showPopup ({ commit, state, rootState }) {
    if (state.isPopupActive === false) {
      commit('SET_POPUP_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ShowPopup', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  closePopup ({ commit, state, rootState }) {
    if (state.isPopupActive === true) {
      commit('SET_POPUP_ACTIVE', false)
      gaEvents.sendEvent('Building', 'ClosePopup', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  setPopupUrl ({ commit }, url = '') {
    commit('SET_POPUP_URL', url)
  },

  setPopupSizeConfig ({ commit }, {
    width = POPUP.WIDTH,
    height = POPUP.HEIGHT,
    widthPercent = POPUP.WIDTH_PERCENT,
    widthType = POPUP.WIDTH_TYPE
  }) {
    commit('SET_POPUP_SIZE_CONFIG', { width, height, widthPercent, widthType })
  }
}

export const mutations = {
  SET_POPUP_ACTIVE (state, bool = false) {
    state.isPopupActive = bool
  },

  SET_POPUP_URL (state, url = '') {
    state.popupUrl = url
  },

  SET_POPUP_SIZE_CONFIG (state, {
    width = POPUP.WIDTH,
    height = POPUP.HEIGHT,
    widthPercent = POPUP.WIDTH_PERCENT,
    widthType = POPUP.WIDTH_TYPE
  }) {
    state.popupSizeConfig.width = width
    state.popupSizeConfig.height = height
    state.popupSizeConfig.widthPercent = widthPercent
    state.popupSizeConfig.widthType = widthType
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
