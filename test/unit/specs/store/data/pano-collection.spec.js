import { actions, getters, mutations } from '@/store/modules/data/vrsdk-pano-collection'
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
  floorplan: ''
}

describe('store/modules/data/vrsdk-pano-collection', () => {
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

  it('SET_PANO_COLLECTION', () => {
    const state = {
      currentPanoCollection: {}
    }
    SET_PANO_COLLECTION(state, { objectId: 'qwe' })
    expect(isEqual(state.currentPanoCollection, { objectId: 'qwe' })).toBe(true)
  })
})
