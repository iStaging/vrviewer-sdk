export default class PanoCollectionsHandler {
  static afterFetchPanoCollectionHandler ({ dispatch, panoCollectionId }) {
    dispatch('fetchPanoramas', panoCollectionId)
  }

  static noPanoCollectionCallback ({ dispatch, commit }) {
    dispatch('closeProgress')
    dispatch('setPanoCollectionNotFound', true)
    commit('SET_PANO_COLLECTION', {})
    commit('SET_PANORAMAS', [])
    return null
  }
}
