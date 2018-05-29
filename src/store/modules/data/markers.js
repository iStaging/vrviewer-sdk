const state = {
  currentMarker: {}
}

export const getters = {
  currentMarker: state => state.currentMarker
}

export const actions = {
  async fetchMarkers ({ dispatch, commit, rootState }, panorama = {}) {
    return new Promise((resolve, reject) => {
      // const resp = [{}]
      // if (!resp) {
      //   dispatch('addProgressCount', 1)
      //   resolve([])
      //   return
      // }
      // const markerIds = Object.keys(resp)
      // let markers = markerIds.map(objectId => {
      //   const marker = resp[objectId].data
      //   marker.objectId = objectId
      //   return marker
      // }) || []
      //
      // if (rootState.route.query.tags === 'false') {
      //   markers = markers.filter(marker => marker.type !== 'tag')
      // }
      // console.log('markers', markers)
      commit('SET_MARKER', {})
      dispatch('addProgressCount', 1)
      // resolve(markers)
      resolve([])
    })
  },

  setMarker ({ commit }, marker = {}) {
    commit('SET_MARKER', marker)
  }
}

export const mutations = {
  SET_MARKER (state, marker = {}) {
    state.currentMarker = marker
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
