import {
  BUILDING
} from '@/api/constants'
import {
  getParameterString,
  isDevelopment
} from '@/api/helpers'
import {
  isEmpty,
  addParameter
} from '@/api/utils'
import router from '@/router/index'
import BuildingsManager from '@/store/manager/buildings-manager'

const state = {
  buildings: [], // only property has buildings; Single building won't use this
  currentBuilding: {
    objectId: '',
    showComment: BUILDING.SHOW_COMMENT,
    showContactInfo: BUILDING.SHOW_CONTACT_INFO,
    showPoweredBy: BUILDING.SHOW_POWERED_BY,
    logoSize: BUILDING.LOGO_SIZE,
    floorplan: '',
    music: ''
  }
}

export const getters = {
  buildings: state => state.buildings,
  currentBuilding: state => state.currentBuilding,
  showComment: state => state.currentBuilding.showComment,
  showContactInfo: state => state.currentBuilding.showContactInfo,
  showPoweredBy: state => state.currentBuilding.showPoweredBy,
  logoSize: state => state.currentBuilding.logoSize,
  floorplan: state => state.currentBuilding.floorplan
}

export const actions = {
  async fetchBuildings ({ dispatch, commit, rootState }, userId = '') {
    const { buildingId } = rootState.route.params
    const resp = [{}]
    if (!resp) {
      dispatch('fetchBuilding', buildingId)
      commit('SET_BUILDINGS', [])
      return
    }
    const buildingIds = Object.keys(resp)
    let buildings = buildingIds.map(objectId => {
      const building = resp[objectId].data
      building.objectId = objectId
      if (shouldSetBuildingNotShow(building)) {
        return undefined
      }
      return building
    }) || []
    buildings = buildings.filter(building => building !== undefined)
    const buildingIndex = JSON.parse(rootState.property.property.buildingIndex || '{}')
    let buildingIndexIds = Object.keys(buildingIndex) || []
    let sortedBuildings = buildingIndexIds.map(buildingId => buildings.find(building => {
      if (buildingId === building.objectId) {
        return building
      }
    })) || []
    sortedBuildings = sortedBuildings.filter(building => building !== undefined)
    sortedBuildings.sort((buildingA, buildingB) => {
      return buildingIndex[buildingA.objectId] - buildingIndex[buildingB.objectId]
    })
    console.log('buildings', sortedBuildings)
    commit('SET_BUILDINGS', sortedBuildings)
    if (sortedBuildings.find(building => building.objectId === buildingId)) {
      // building id is in property 該群組有這個 buildingId，抓
      dispatch('fetchBuilding', buildingId)
    } else if (buildingId) {
      // building id is not found in property, wait and redirect to first building 該群組沒有這個 buildingId(即使此 id 有效)，不要抓到
      dispatch('fetchBuilding', '')
    } else if (sortedBuildings.length) {
      // no building id, auto to first building 沒輸入，自動抓第一個
      dispatch('fetchBuilding', sortedBuildings[0].objectId)
    } else {
      // todo: group 沒任何 building
      dispatch('fetchBuilding', '')
    }
  },

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
      dispatch('initUiMode')
      BuildingsManager.initAudio({ dispatch, rootState, building })
      BuildingsManager.initThemeColor({ dispatch, rootState, building })
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
    const propertyId = rootState.route.query.group || ''
    delete rootState.route.query.index
    const parameter = getParameterString(rootState.route.query)
    router.push(`/${building.objectId || ''}${parameter}`)
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
