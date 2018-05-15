import api from '@/api/index'
import {
  CATEGORIES
} from '@/api/constants'
import {
  imageIEHack
} from '@/api/helpers'
import {
  completeAssign,
  getIEVersion,
  isEmpty,
  sort
} from '@/api/utils'
import PanoramasManager from '../../manager/panoramas-manager'
import Cubemap from '../../manager/cubemap'

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
      const foundPanoramaName = CATEGORIES.find(panoramaName => panoramaName.value === panorama.panoramaName)
      if (!foundPanoramaName) {
        panorama.customPanoramaName = panorama.panoramaName
        panorama.panoramaName = 'custom'
      }
      if (!panorama.position) { // should have default position
        panorama.position = {
          x: 0,
          y: 0
        }
      }
      return panorama
    }) || []

    panoramas = panoramas.filter(panorama => panorama.rawUrl) // app maybe create a panorama but not upload photo yet
    if (panoramas.length <= 0) {
      panoramasManager.noPanoramasHandler()
      return
    }
    console.log('panoramas', panoramas)
    sort(panoramas, 'index')
    dispatch('setProgressMax', panoramas.length + 12)

    panoramas.forEach(async panorama => {
      // const cubemap = new Cubemap(panorama, rootState.user.userId)
      const cubemap = new Cubemap(panorama)
      cubemap.init()
      panorama.markers = await dispatch('fetchMarkers', panorama)
      if (getIEVersion() === 11) {
        const keys = ['thumbnail', 'desktopUrl', 'mobileUrl']
        await imageIEHack(panorama, keys)
      }
      if (!panorama.cubemapReady || panorama.cubemapReady === false) {
        // const userId = panoCollection.owner ? panoCollection.owner.objectId : ''
        // console.log('panorama.rawUrl', panorama.rawUrl)
        if (panorama.rawUrl) {
          api.isPanoramaCubemapReady(panorama.panoramaId, cubemap.filename).then(bool => {
            panorama.cubemapReady = bool
            if (bool === true) {
              panorama.cubemapPreivewUrl = cubemap.preivewUrl
              panorama.cubemapUrl = cubemap.cubeUrl
            }
            panoramasManager.panoramaMarkersReadyHandler(panoramas)
          })
        } else {
          panorama.cubemapReady = false
          panoramasManager.panoramaMarkersReadyHandler(panoramas)
        }
      } else {
        if (panorama.cubemapReady === true) {
          panorama.cubemapPreivewUrl = cubemap.preivewUrl
          panorama.cubemapUrl = cubemap.cubeUrl
        }
        panoramasManager.panoramaMarkersReadyHandler(panoramas)
      }
    })
  },

  selectPanorama ({ commit, state, rootState }, panorama = {}) {
    if (state.currentPanorama.panoramaId === panorama.panoramaId ||
      rootState.progress.isProgressActive) {
      return
    }
    rootState.krpano.krpanoEl.call(`prepare_change_scene(panorama_${panorama.panoramaId || ''}, ${panorama.panoramaId || ''}, 'PanoramaList');`)
  },

  setPanorama ({ commit }, panorama = {}) {
    commit('SET_PANORAMA', panorama)
  },

  updatePanoramaItem ({ commit, state }, panorama = {}) {
    let targetId = ''
    if (panorama.panoramaId) {
      targetId = panorama.panoramaId
    } else {
      targetId = state.currentPanorama.panoramaId
      commit('UPDATE_PANORAMA_ITEM', panorama)
    }

    const foundIndex = state.panoramas.map(panorama => panorama.panoramaId).indexOf(targetId)
    if (foundIndex <= -1) {
      return
    }
    const newPanorama = completeAssign({}, state.panoramas[foundIndex], panorama)
    const newPanoramas = state.panoramas.slice()
    newPanoramas.splice(foundIndex, 1, newPanorama)
    commit('SET_PANORAMAS', newPanoramas)
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
