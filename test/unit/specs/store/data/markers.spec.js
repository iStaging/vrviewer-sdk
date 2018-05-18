import { actions, getters, mutations } from '../../../../../src/store/modules/data/markers'
import { testAction } from '../../App.spec'
import { isEqual } from '../../../../../src/api/utils'
const {
  currentMarker
} = getters
const {
  SET_MARKER
} = mutations
const markerId = 'mmm'
const userId = 'uuu'
const markerData = {
  objectId: markerId,
  fake: 'test',
  Owner: userId
}

describe('store/modules/data/markers', () => {
  it('currentMarker', () => {
    const state = {
      currentMarker: {}
    }
    const result = currentMarker(state, { currentMarker })
    expect(isEqual(result, {})).toBe(true)
  })

  it('fetchMarkers', done => {
    testAction(actions.fetchMarkers, { objectId: 'panoramaId' }, {}, [{
      type: 'SET_MARKER',
      payload: {}
    }], [{
      type: 'addProgressCount',
      payload: 1
    }], done)
  })

  it('setMarker', done => {
    testAction(actions.setMarker, markerData, {}, [{
      type: 'SET_MARKER',
      payload: markerData
    }], undefined, done)
  })

  it('SET_MARKER', () => {
    const state = {
      currentMarker: {}
    }
    SET_MARKER(state, { objectId: 'abc' })
    expect(isEqual(state.currentMarker, { objectId: 'abc' })).toBe(true)
  })
})
