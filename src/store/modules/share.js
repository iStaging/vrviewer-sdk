const state = {
  isShareActive: false,
  shareUrl: {
    origin: '',
    qrcode: ''
  }
}

export const getters = {
  isShareActive: state => state.isShareActive,
  shareUrl: state => state.shareUrl
}

export const actions = {
  showShare ({ commit, state, rootState }) {
    if (state.isShareActive === false) {
      commit('SET_SHARE_ACTIVE', true)
    }
  },

  toggleShare ({ dispatch }) {
    if (state.isShareActive === true) {
      dispatch('closeShare')
    } else {
      dispatch('showShare')
    }
  },

  closeShare ({ commit, state, rootState }) {
    if (state.isShareActive === true) {
      commit('SET_SHARE_ACTIVE', false)
    }
  },

  setShareUrl ({ commit }, url = '') {
    commit('SET_SHARE_URL', url)
  }
}

export const mutations = {
  SET_SHARE_ACTIVE (state, bool = false) {
    state.isShareActive = bool
  },

  SET_SHARE_URL (state, url = '') {
    let divider = '?ref='
    if (url && url.indexOf('?') > -1) {
      divider = '&ref='
    }
    state.shareUrl.origin = url
    state.shareUrl.qrcode = `${url}${divider}qrcode`
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
