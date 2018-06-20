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
      // let markers = markerIds.map(id => {
      //   const marker = resp[id].data
      //   marker.id = id
      //   return marker
      // }) || []
      //
      // if (rootState.route.query.tags === 'false') {
      //   markers = markers.filter(marker => marker.type !== 'tag')
      // }
      // console.log('markers', markers)
      const markers = [{
        id: '123',
        position: {
          'x': 0,
          'y': 0,
          'z': -90
        },
        iconType: 'coupon',
        type: 'custom',
        useCustomIcon: false
      }, {
        id: '124',
        position: {
          'x': 20,
          'y': 0,
          'z': -90
        },
        iconType: 'gift',
        type: 'custom',
        useCustomIcon: false
      }, {
        id: '125',
        position: {
          'x': 40,
          'y': 0,
          'z': -90
        },
        iconType: 'shopping',
        type: 'custom',
        useCustomIcon: false
      }, {
        id: '126',
        position: {
          'x': 60,
          'y': 0,
          'z': -90
        },
        iconType: 'stopwatch',
        type: 'custom',
        useCustomIcon: false
      }]
      commit('SET_MARKER', {})
      dispatch('addProgressCount', 1)
      resolve(markers)
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
