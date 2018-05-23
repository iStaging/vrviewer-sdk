import { getters, actions, mutations } from '@/store/modules/floorplan'
import { testAction } from '../App.spec'
const {
  isFloorplanActive
} = getters
const {
  showFloorplan,
  toggleFloorplan,
  closeFloorplan
} = actions
const {
  SET_FLOORPLAN_ACTIVE
} = mutations

describe('store/modules/floorplan', () => {
  it('isFloorplanActive', () => {
    const state = {
      isFloorplanActive: false
    }
    const result = isFloorplanActive(state, { isFloorplanActive })
    expect(result).toEqual(false)
  })

  it('showFloorplan', done => {
    const state = {
      isFloorplanActive: false
    }
    testAction(showFloorplan, undefined, state, [
      { type: 'SET_FLOORPLAN_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleFloorplan', done => {
    const state = {
      isFloorplanActive: false
    }
    testAction(toggleFloorplan, undefined, state, undefined, [
      { type: 'showFloorplan' }
    ], done)

    state.isFloorplanActive = true
    testAction(toggleFloorplan, undefined, state, undefined, [
      { type: 'closeFloorplan' }
    ], done)
  })

  it('closeFloorplan', done => {
    const state = {
      isFloorplanActive: true
    }
    testAction(closeFloorplan, undefined, state, [
      { type: 'SET_FLOORPLAN_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_FLOORPLAN_ACTIVE', () => {
    const state = {
      isFloorplanActive: false
    }
    SET_FLOORPLAN_ACTIVE(state, true)
    expect(state.isFloorplanActive)
      .toEqual(true)
  })
})
