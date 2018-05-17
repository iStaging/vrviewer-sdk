import { actions, getters, mutations } from '@/store/modules/data/pano-collection'
import { testAction } from '../../App.spec'
import { isEqual } from '../../../../../src/api/utils'
const {
  currentPanoCollection,
  floorplan
} = getters
const {
  SET_PANO_COLLECTION
} = mutations
const buildingId = 'nnn'
const userId = 'lll'
const buildingData = {
  objectId: buildingId,
  floorplan: ''
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
    testAction(actions.importPanoCollection, buildingData)
  })

  it('fetchPanoCollection', function (done) {
    testAction(actions.fetchPanoCollection, buildingId, {
      currentPanoCollection: buildingData
    }, [{
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
      payload: buildingId
    }], [{
      type: 'SET_PANO_COLLECTION',
      payload: buildingData
    }, {
      type: 'SET_PANORAMAS',
      payload: userId
    }], [{
      type: 'setProgressCount',
      payload: 0
    }, {
      type: 'showProgress'
    }, {
      type: 'setBuildingNotFound',
      payload: false
    }, {
      type: 'addProgressCount',
      payload: 2
    }, {
      type: 'setProgressMax',
      payload: 100
    }, {
      type: 'fetchPanoramas',
      payload: buildingId
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
