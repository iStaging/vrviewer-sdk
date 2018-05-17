const state = {
  isAppReady: false,
  isScreenReady: false,
  isPanoCollectionNotFound: false,
  isNoPanoramasFound: false
}

export const getters = {
  isAppReady: state => state.isAppReady,
  isScreenReady: state => state.isScreenReady,
  isPanoCollectionNotFound: state => state.isPanoCollectionNotFound,
  isNoPanoramasFound: state => state.isNoPanoramasFound
}

export const actions = {
  setAppReady ({ commit }, bool = false) {
    commit('SET_APP_READY', bool)
  },

  setScreenReady ({ dispatch, commit, rootState }, bool = false) {
    commit('SET_SCREEN_READY', bool)
    // if (rootState.route.query.panobar !== 'false') {
    bool
      ? dispatch('showPanoramasList')
      : dispatch('closePanoramasList')
    // }
  },

  setPanoCollectionNotFound ({ commit, state, rootState }, bool = false) {
    if (state.isPanoCollectionNotFound === false && bool === true) {
    }
    commit('SET_PANO_COLLECTION_NOT_FOUND', bool)
  },

  setPanoramasNotFound ({ commit, state, rootState }, bool = false) {
    if (state.isNoPanoramasFound === false && bool === true) {
    }
    commit('SET_PANORAMAS_NOT_FOUND', bool)
  }
}

export const mutations = {
  SET_APP_READY (state, bool = false) {
    state.isAppReady = bool
  },

  SET_SCREEN_READY (state, bool = false) {
    state.isScreenReady = bool
  },

  SET_PANO_COLLECTION_NOT_FOUND (state, bool = false) {
    state.isPanoCollectionNotFound = bool
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
