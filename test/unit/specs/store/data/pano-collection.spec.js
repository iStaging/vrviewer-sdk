import { actions, getters, mutations } from '../../../../../src/store/modules/data/pano-collection'
import { testAction } from '../../App.spec'
import { isEqual } from '../../../../../src/api/utils'
const {
  importPanoCollection,
  fetchPanoCollection
} = actions
const {
  currentPanoCollection,
  floorplan
} = getters
const {
  SET_PANO_COLLECTION
} = mutations
const buildingId = 'nnn'
const buildingData = {
  objectId: buildingId,
  thumbnail: 'https://www.istaging.com/sdk/logo-tripod.png',
  logo: 'https://www.istaging.com/sdk/logo-tripod.png',
  floorplan: 'https://www.istaging.com/sdk/logo-tripod.png'
}

describe('store/modules/data/pano-collection', () => {
  it('currentPanoCollection', () => {
    const state = {
      currentPanoCollection: {}
    }
    const result = currentPanoCollection(state, { currentPanoCollection })
    expect(isEqual(result, {})).toBe(true)
  })

  it('floorplan', () => {
    const state = {
      currentPanoCollection: {
        floorplan: ''
      }
    }
    const result = floorplan(state, { floorplan })
    expect(result).toEqual('')
  })

  it('importPanoCollection', function () {
    testAction(importPanoCollection, buildingData)
  })

  it('fetchPanoCollection', function (done) {
    testAction(fetchPanoCollection, 'fake-collection-id', {
      currentPanoCollection: buildingData
    }, [{
      type: 'SET_PANO_COLLECTION',
      payload: buildingData
    }], [{
      type: 'setProgressCount',
      payload: 0
    }, {
      type: 'showProgress'
    }, {
      type: 'addProgressCount',
      payload: 2
    }, {
      type: 'setProgressMax',
      payload: 100
    }, {
      type: 'fetchPanoramas',
      payload: 'fake-collection-id'
    }, {
      type: 'setPanoCollectionNotFound',
      payload: false
    }], done)
  })

  it('fetchPanoCollection with not found handle', function (done) {
    testAction(fetchPanoCollection, '', undefined, [{
      type: 'SET_PANO_COLLECTION',
      payload: {}
    }, {
      type: 'SET_PANORAMAS',
      payload: []
    }], [{
      type: 'closeProgress'
    }, {
      type: 'setPanoCollectionNotFound',
      payload: true
    }], done)
  })

  it('SET_PANO_COLLECTION', () => {
    const state = {
      currentPanoCollection: {}
    }
    SET_PANO_COLLECTION(state, { objectId: 'qwe' })
    expect(isEqual(state.currentPanoCollection, { objectId: 'qwe' })).toBe(true)
  })
})
