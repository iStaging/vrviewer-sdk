export default class BuildingsHandler {
  static afterFetchProfileHandler ({ dispatch, building, buildingId }) {
    dispatch('fetchPanoramas', buildingId)
  }

  static noBuildingCallback ({ dispatch, commit, state, rootState }) {
    document.title = 'LiveTour not found'
    dispatch('closeProgress')
    dispatch('setBuildingNotFound', true)
    commit('SET_BUILDING', {})
    commit('SET_PANORAMAS', [])
    return null
  }
}
