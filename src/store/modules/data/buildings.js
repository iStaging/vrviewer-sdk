import {
  isDevelopment
} from '@/api/helpers'
import {
  fakeBuilding
} from '@/api/resources'
import {
  addParameter
} from '@/api/utils'
import BuildingsManager from '@/store/manager/buildings-manager'

const state = {
  currentBuilding: {
    objectId: '',
    floorplan: ''
  }
}

export const getters = {
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
      const resp = fakeBuilding
      dispatch('setProgressCount', 0)
      dispatch('showProgress')
      console.log('resp', resp)
      if (!resp) {
        BuildingsManager.noBuildingCallback({ dispatch, commit, state, rootState })
        return
      }
      const building = resp
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
      console.log('building:', building)
      commit('SET_BUILDING', building)
      BuildingsManager.afterFetchProfileHandler({ dispatch, building, buildingId })
      dispatch('setBuildingNotFound', false)
    } else {
      BuildingsManager.noBuildingCallback({ dispatch, commit, state, rootState })
    }
  }
}

export const mutations = {
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
