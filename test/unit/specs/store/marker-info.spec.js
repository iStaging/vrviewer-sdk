import { getters, actions, mutations } from '@/store/modules/marker-info'
import { testAction } from '../App.spec'
const {
  isMarkerInfoActive,
  markerInfoData
} = getters
const {
  showMarkerInfo,
  toggleMarkerInfo,
  closeMarkerInfo,
  setMarkerInfoData
} = actions
const {
  SET_MARKER_INFO_ACTIVE,
  SET_MARKER_INFO_DATA
} = mutations

describe('store/modules/marker-info', () => {
  it('isMarkerInfoActive', () => {
    const state = {
      isMarkerInfoActive: false
    }
    const result = isMarkerInfoActive(state, { isMarkerInfoActive })
    expect(result).to.equal(false)
  })

  it('markerInfoData', () => {
    const marker = {
      foo: 'baz'
    }
    const state = {
      markerInfoData: marker
    }
    const result = markerInfoData(state, { markerInfoData })
    expect(result).to.equal(marker)
  })

  it('showMarkerInfo', done => {
    const state = {
      isMarkerInfoActive: false
    }
    testAction(showMarkerInfo, undefined, state, [
      { type: 'SET_MARKER_INFO_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleMarkerInfo', done => {
    const state = {
      isMarkerInfoActive: false
    }
    testAction(toggleMarkerInfo, undefined, state, [
      { type: 'SET_MARKER_INFO_ACTIVE', payload: !state.isMarkerInfoActive }
    ], undefined, done)
  })

  it('closeMarkerInfo', done => {
    const state = {
      isMarkerInfoActive: true
    }
    testAction(closeMarkerInfo, undefined, state, [
      { type: 'SET_MARKER_INFO_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('setMarkerInfoData', done => {
    const marker = {
      foo: 'bar'
    }
    const state = {
      markerInfoData: marker
    }
    testAction(setMarkerInfoData, marker, state, [
      { type: 'SET_MARKER_INFO_DATA', payload: marker }
    ], undefined, done)
  })

  it('SET_MARKER_INFO_ACTIVE', () => {
    const state = {
      isMarkerInfoActive: false
    }
    SET_MARKER_INFO_ACTIVE(state, true)
    expect(state.isMarkerInfoActive)
      .to.equal(true)
  })

  it('SET_MARKER_INFO_DATA', () => {
    const marker = {
      bar: 'baz'
    }
    const state = {
      markerInfoData: marker
    }
    SET_MARKER_INFO_DATA(state, marker)
    expect(state.markerInfoData)
      .to.deep.equal(marker)
  })
})
