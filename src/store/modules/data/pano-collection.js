import {
  addParameter,
  isEmpty
} from '@/api/utils'
import PanoCollectionManager from '@/store/manager/pano-collection-manager'

const state = {
  currentPanoCollection: {
    id: '',
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

  async fetchPanoCollection ({ dispatch, commit, state, rootState }) {
    const panoCollectionId = storedPanoCollection.id
    if (panoCollectionId) {
      if (panoCollectionId === state.currentPanoCollection.id) {
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
      panoCollection.id = panoCollectionId
      // to prevent cache, trigger force fetch latest photo
      if (panoCollection.resizeUrl) {
        panoCollection.resizeUrl = addParameter(panoCollection.resizeUrl, `n=${Math.random()}`)
      }
      if (panoCollection.logoUrl) {
        panoCollection.logoUrl = addParameter(panoCollection.logoUrl, `n=${Math.random()}`)
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
      // const ids = Object.keys(resp.Panoramas)
      // console.log('ids:', ids)
      // console.log('panoCollection:', panoCollection)
      commit('SET_PANO_COLLECTION', panoCollection)
      PanoCollectionManager.afterFetchPanoCollectionHandler({ dispatch, panoCollectionId })
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
    console.log('should the panoCollection not show', panoCollection.id)
  }
  return noShow
}
