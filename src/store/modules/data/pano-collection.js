import {
  addParameter,
  isEmpty
} from '@/api/utils'
import PanoCollectionManager from '@/store/manager/pano-collection-manager'

const state = {
  currentPanoCollection: {
    objectId: '',
    floorplan: ''
  }
}

export const getters = {
  currentPanoCollection: state => state.currentPanoCollection,
  floorplan: state => state.currentPanoCollection.floorplan
}

let storedPanoCollection = {}
export const actions = {
  importPanoCollection ({ commit }, panoCollection) {
    storedPanoCollection = panoCollection
  },

  async fetchPanoCollection ({ dispatch, commit, state, rootState }, panoCollectionId = '') {
    if (panoCollectionId) {
      if (panoCollectionId === state.currentPanoCollection.objectId) {
        // It's the same panoCollection, no need to fetch it again
        return
      }
      const resp = storedPanoCollection
      dispatch('setProgressCount', 0)
      dispatch('showProgress')
      if (isEmpty(resp)) {
        PanoCollectionManager.noPanoCollectionCallback({ dispatch, commit, state, rootState })
        return
      }
      const panoCollection = resp
      panoCollection.objectId = panoCollectionId
      // to prevent cache, trigger force fetch latest photo
      if (panoCollection.thumbnail) {
        panoCollection.thumbnail = addParameter(panoCollection.thumbnail, `n=${Math.random()}`)
      }
      if (panoCollection.logo) {
        panoCollection.logo = addParameter(panoCollection.logo, `n=${Math.random()}`)
      }
      if (panoCollection.floorplan) {
        panoCollection.floorplan = addParameter(panoCollection.floorplan, `n=${Math.random()}`)
      }
      if (shouldSetPanoCollectionNotShow(panoCollection)) {
        PanoCollectionManager.noPanoCollectionCallback({ dispatch, commit, state, rootState })
        return
      }
      // init progress count with unreal number
      dispatch('addProgressCount', 2)
      dispatch('setProgressMax', 100)
      // const panoramaIds = Object.keys(resp.Panoramas)
      // console.log('panoramaIds:', panoramaIds)
      console.log('panoCollection:', panoCollection)
      commit('SET_PANO_COLLECTION', panoCollection)
      PanoCollectionManager.afterFetchPanoCollectionHandler({ dispatch, panoCollection, panoCollectionId })
      dispatch('setPanoCollectionNotFound', false)
    } else {
      PanoCollectionManager.noPanoCollectionCallback({ dispatch, commit, state, rootState })
    }
  }
}

export const mutations = {
  SET_PANO_COLLECTION (state, panoCollection = {}) {
    state.currentPanoCollection = panoCollection
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

function shouldSetPanoCollectionNotShow (panoCollection) {
  const noShow = panoCollection.isOffline || panoCollection.unavailable
  if (noShow) {
    console.log('should the panoCollection not show', panoCollection.objectId)
  }
  return noShow
}
