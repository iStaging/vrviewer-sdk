import api from '@/api/index'
import { CATEGORIES } from '@/api/constants'
import {
  imageIEHack
} from '@/api/helpers'
import {
  completeAssign,
  getIEVersion,
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

export const actions = {
  async fetchPanoramas ({ dispatch, commit, state, rootState }, buildingId = '') {
    const panoramasManager = new PanoramasManager({ dispatch, commit, state, rootState })
    const resp = [{}] // panoramas
    dispatch('setKrpanoActive', false)
    dispatch('setPanoramasNotFound', false)
    if (!resp) {
      panoramasManager.noPanoramasHandler()
      return
    }
    const panoramaIds = Object.keys(resp)
    let panoramas = panoramaIds.map(objectId => {
      const panorama = resp[objectId].data
      panorama.objectId = objectId
      const foundCategory = CATEGORIES.find(category => category.value === panorama.category)
      if (!foundCategory) {
        panorama.customCategory = panorama.category
        panorama.category = 'custom'
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
      const cubemap = new Cubemap(panorama, rootState.user.userId)
      cubemap.init()
      panorama.markers = await dispatch('fetchMarkers', panorama)
      if (getIEVersion() === 11) {
        const keys = ['thumbnail', 'desktopUrl', 'mobileUrl']
        await imageIEHack(panorama, keys)
      }
      if (!panorama.cubemapReady || panorama.cubemapReady === false) {
        // const userId = building.owner ? building.owner.objectId : ''
        // console.log('panorama.rawUrl', panorama.rawUrl)
        if (panorama.rawUrl) {
          api.isPanoramaCubemapReady(panorama.objectId, cubemap.filename).then(bool => {
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
    if (state.currentPanorama.objectId === panorama.objectId ||
      rootState.progress.isProgressActive) {
      return
    }
    rootState.krpano.krpanoEl.call(`prepare_change_scene(panorama_${panorama.objectId || ''}, ${panorama.objectId || ''}, 'PanoramaList');`)
  },

  setPanorama ({ commit }, panorama = {}) {
    commit('SET_PANORAMA', panorama)
  },

  updatePanoramaItem ({ commit, state }, panorama = {}) {
    let targetId = ''
    if (panorama.objectId) {
      targetId = panorama.objectId
    } else {
      targetId = state.currentPanorama.objectId
      commit('UPDATE_PANORAMA_ITEM', panorama)
    }

    const foundIndex = state.panoramas.map(panorama => panorama.objectId).indexOf(targetId)
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