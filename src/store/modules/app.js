const state = {
  isAppReady: false,
  isScreenReady: false,
  isPropertyNotFound: false,
  isBuildingNotFound: false,
  isNoPanoramasFound: false
}

export const getters = {
  isAppReady: state => state.isAppReady,
  isScreenReady: state => state.isScreenReady,
  isPropertyNotFound: state => state.isPropertyNotFound,
  isBuildingNotFound: state => state.isBuildingNotFound,
  isNoPanoramasFound: state => state.isNoPanoramasFound
}

export const actions = {
  setAppReady ({ commit }, bool = false) {
    commit('SET_APP_READY', bool)
  },

  setPropertyNotFound ({ commit, state, rootState }, bool = false) {
    if (state.isPropertyNotFound === false && bool === true) {
    }
    commit('SET_PROPERTY_NOT_FOUND', bool)
  },

  setBuildingNotFound ({ commit, state, rootState }, bool = false) {
    if (state.isBuildingNotFound === false && bool === true) {
    }
    commit('SET_BUILDING_NOT_FOUND', bool)
  },

  setPanoramasNotFound ({ commit, state, rootState }, bool = false) {
    if (state.isNoPanoramasFound === false && bool === true) {
    }
    commit('SET_PANORAMAS_NOT_FOUND', bool)
  },

  setScreenReady ({ dispatch, commit, rootState }, bool = false) {
    commit('SET_SCREEN_READY', bool)
    if (rootState.route.query.panobar !== 'false') {
      bool
        ? dispatch('showPanoramasList')
        : dispatch('closePanoramasList')
    }
  }
}

export const mutations = {
  SET_APP_READY (state, bool = false) {
    state.isAppReady = bool
  },

  SET_SCREEN_READY (state, bool = false) {
    state.isScreenReady = bool
  },

  SET_PROPERTY_NOT_FOUND (state, bool = false) {
    state.isPropertyNotFound = bool
  },

  SET_BUILDING_NOT_FOUND (state, bool = false) {
    state.isBuildingNotFound = bool
  },

  SET_PANORAMAS_NOT_FOUND (state, bool = false) {
    state.isNoPanoramasFound = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
