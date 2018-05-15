export default class PanoCollectionsHandler {
  static afterFetchProfileHandler ({ dispatch, panoCollection, panoCollectionId }) {
    dispatch('fetchPanoramas', panoCollectionId)
  }

  static noPanoCollectionCallback ({ dispatch, commit, state, rootState }) {
    document.title = 'LiveTour not found'
    dispatch('closeProgress')
    dispatch('setPanoCollectionNotFound', true)
    commit('SET_PANO_COLLECTION', {})
    commit('SET_PANORAMAS', [])
    return null
  }
}
