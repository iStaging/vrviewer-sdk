import {
  isDevelopment
} from '@/api/helpers'
import {
  addParameter
} from '@/api/utils'
import BuildingsManager from '@/store/manager/buildings-manager'

const state = {
  buildings: [], // only property has buildings; Single building won't use this
  currentBuilding: {
    objectId: '',
    floorplan: ''
  }
}

export const getters = {
  buildings: state => state.buildings,
  currentBuilding: state => state.currentBuilding,
  logoSize: state => state.currentBuilding.logoSize,
  floorplan: state => state.currentBuilding.floorplan
}

export const actions = {
  async fetchBuilding ({ dispatch, commit, state, rootState }, buildingId = '') { // should have some value to return data null
    if (buildingId) {
      if (buildingId === state.currentBuilding.objectId) {
        // It's the same building, no need to fetch it again
        return
      }
      const resp = {}
      dispatch('setProgressCount', 0)
      dispatch('showProgress')
      // console.log('resp', resp)
      if (!resp) {
        BuildingsManager.noBuildingCallback({ dispatch, commit, state, rootState })
        return
      }
      const building = resp.data || {}
      building.objectId = buildingId
      // to prevent cache, trigger force fetch latest photo
      if (building.thumbnail) {
        building.thumbnail = addParameter(building.thumbnail, `n=${Math.random()}`)
      }
      if (building.logo) {
        building.logo = addParameter(building.logo, `n=${Math.random()}`)
      }
      if (building.floorplan) {
        building.floorplan = addParameter(building.floorplan, `n=${Math.random()}`)
      }
      if (isDevelopment) {
        document.title = building.name || 'VR Viewer'
      }
      if (shouldSetBuildingNotShow(building)) {
        BuildingsManager.noBuildingCallback({ dispatch, commit, state, rootState })
        return
      }
      // init progress count with unreal number
      dispatch('addProgressCount', 2)
      dispatch('setProgressMax', 100)
      // const panoramaIds = Object.keys(resp.Panoramas)
      // console.log('panoramaIds:', panoramaIds)
      const userId = resp.Owner
      console.log('building:', building)
      commit('SET_BUILDING', building)
      commit('SET_USER_ID', userId)
      if (rootState.user.user.objectId !== userId) {
        await dispatch('fetchPublicProfile', userId)
        BuildingsManager.afterFetchProfileHandler({ dispatch, building, buildingId })
      } else {
        BuildingsManager.afterFetchProfileHandler({ dispatch, building, buildingId })
      }
      dispatch('setBuildingNotFound', false)
    } else {
      BuildingsManager.noBuildingCallback({ dispatch, commit, state, rootState })
    }
  },

  selectBuilding ({ state, rootState }, building = {}) {
    if ((building.objectId === state.currentBuilding.objectId) ||
      rootState.progress.isProgressActive ||
      ((rootState.app.isBuildingNotFound || rootState.app.isNoPanoramasFound) && !rootState.krpano.isKrpanoActive)) {
      return
    }
    delete rootState.route.query.index
    // Next step will go to pages/Default/index.vue beforeRouteUpdate() method
    // Why don't I write here? Because user might go back to previous page, I must handle the situation
  }
}

export const mutations = {
  SET_BUILDINGS (state, buildings = []) {
    state.buildings = buildings
  },

  SET_BUILDING (state, building = {}) {
    state.currentBuilding = building
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

function shouldSetBuildingNotShow (building) {
  const noShow = building.isOffline || building.unavailable
  if (noShow) {
    console.log('should the building not show', building.objectId)
  }
  return noShow
}
