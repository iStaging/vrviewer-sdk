import { isEmpty } from '@/api/utils'

const state = {
  isMarkerInfoActive: false,
  markerInfoData: {}
}

export const getters = {
  isMarkerInfoActive: state => state.isMarkerInfoActive,
  markerInfoData: state => state.markerInfoData
}

export const actions = {
  showMarkerInfo ({ commit, state }) {
    if (state.isMarkerInfoActive === false) {
      commit('SET_MARKER_INFO_ACTIVE', true)
    }
  },

  toggleMarkerInfo ({ dispatch, state }) {
    if (state.isMarkerInfoActive === true) {
      dispatch('closeMarkerInfo')
    } else {
      dispatch('showMarkerInfo')
    }
  },

  closeMarkerInfo ({ commit, state }) {
    if (state.isMarkerInfoActive === true) {
      commit('SET_MARKER_INFO_ACTIVE', false)
    }
  },

  setMarkerInfoData ({ commit }, marker = {}) {
    commit('SET_MARKER_INFO_DATA', marker)
    if (!isEmpty(marker)) {
      if (marker.type === 'tag') {
      } else if (marker.type === 'memo') {
      }
    }
  }
}

export const mutations = {
  SET_MARKER_INFO_ACTIVE (state, bool = false) {
    state.isMarkerInfoActive = bool
  },

  SET_MARKER_INFO_DATA (state, marker = {}) {
    state.markerInfoData = marker
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
