import { isEmpty } from '~js/utils'
import gaEvents from '~js/ga-events'

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
      gaEvents.sendEvent('Marker', 'ShowMarkerInfo', state.markerInfoData.objectId)
    }
  },

  toggleMarkerInfo ({ dispatch }) {
    if (state.isMarkerInfoActive === true) {
      dispatch('closeMarkerInfo')
    } else {
      dispatch('showMarkerInfo')
    }
  },

  closeMarkerInfo ({ commit, state }) {
    if (state.isMarkerInfoActive === true) {
      commit('SET_MARKER_INFO_ACTIVE', false)
      gaEvents.sendEvent('Marker', 'CloseMarkerInfo', state.markerInfoData.objectId)
    }
  },

  setMarkerInfoData ({ commit }, marker = {}) {
    commit('SET_MARKER_INFO_DATA', marker)
    if (!isEmpty(marker)) {
      if (marker.type === 'tag') {
        gaEvents.sendEvent('Marker', 'TagClicks', marker.objectId)
      } else if (marker.type === 'memo') {
        gaEvents.sendEvent('Marker', 'MemoClicks', marker.objectId)
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
