import {
  imageIEHack
} from '@/api/helpers'
import {
  getIEVersion,
  isEmpty,
  sort
} from '@/api/utils'
import PanoramasManager from '../../manager/panoramas-manager'

const state = {
  panoramas: [],
  currentPanorama: {},
  hoveredPanorama: {}
}

export const getters = {
  panoramas: state => state.panoramas,
  currentPanorama: state => state.currentPanorama,
  hoveredPanorama: state => state.hoveredPanorama
}

let storedPanoramas = []
export const actions = {
  importPanoramas ({ commit }, panoramas) {
    storedPanoramas = panoramas
  },

  async fetchPanoramas ({ dispatch, commit, state, rootState }, panoCollectionId = '') {
    const panoramasManager = new PanoramasManager({ dispatch, commit, state, rootState })
    const resp = storedPanoramas
    dispatch('setKrpanoActive', false)
    dispatch('setPanoramasNotFound', false)
    if (isEmpty(resp)) {
      panoramasManager.noPanoramasHandler()
      return
    }
    let panoramas = resp.map(panorama => {
      panorama.name = 'custom'
      if (!panorama.position) { // should have default position
        panorama.position = {
          x: 0,
          y: 0
        }
      }
      return panorama
    }) || []
    if (panoramas.length <= 0) {
      panoramasManager.noPanoramasHandler()
      return
    }
    console.log('panoramas', panoramas)
    sort(panoramas, 'index')
    dispatch('setProgressMax', panoramas.length + 12)
    panoramas.forEach(async panorama => {
      // const cubemap = new Cubemap(panorama, rootState.user.userId)
      panorama.markers = await dispatch('fetchMarkers', panorama)
      if (getIEVersion() === 11) {
        const keys = ['thumbnail', 'resizeUrl', 'mobileUrl']
        await imageIEHack(panorama, keys)
      }
      panoramasManager.panoramaMarkersReadyHandler(panoramas)
    })
  },

  selectPanorama ({ commit, state, rootState }, panorama = {}) {
    if (state.currentPanorama.id === panorama.id ||
      rootState.progress.isProgressActive) {
      return
    }
    rootState.krpano.krpanoEl.call(`prepare_change_scene(panorama_${panorama.id || ''}, ${panorama.id || ''}, 'PanoramaList');`)
  },

  setPanorama ({ commit }, panorama = {}) {
    commit('SET_PANORAMA', panorama)
  },

  setHoveredPanorama ({ commit }, panorama = {}) {
    commit('SET_HOVERED_PANORAMA', panorama)
  }
}

export const mutations = {
  SET_PANORAMAS (state, panoramas = []) {
    state.panoramas = panoramas
  },

  SET_PANORAMA (state, panorama = {}) {
    state.currentPanorama = panorama
  },

  SET_HOVERED_PANORAMA (state, panorama = {}) {
    state.hoveredPanorama = panorama
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
