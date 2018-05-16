import { getters, actions, mutations } from '@/store/modules/location'
import { testAction } from '../App.spec'
const {
  isLocationActive
} = getters
const {
  showLocation,
  toggleLocation,
  closeLocation
} = actions
const {
  SET_LOCATION_ACTIVE
} = mutations

describe('store/modules/location', () => {
  it('isLocationActive', () => {
    const state = {
      isLocationActive: false
    }
    const result = isLocationActive(state, { isLocationActive })
    expect(result).to.equal(false)
  })

  it('showLocation', done => {
    const state = {
      isLocationActive: false
    }
    testAction(showLocation, undefined, state, [
      { type: 'SET_LOCATION_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleLocation', done => {
    const state = {
      isLocationActive: false
    }
    testAction(toggleLocation, undefined, state, [
      { type: 'SET_LOCATION_ACTIVE', payload: !state.isLocationActive }
    ], undefined, done)
  })

  it('closeLocation', done => {
    const state = {
      isLocationActive: true
    }
    testAction(closeLocation, undefined, state, [
      { type: 'SET_LOCATION_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_LOCATION_ACTIVE', () => {
    const state = {
      isLocationActive: false
    }
    SET_LOCATION_ACTIVE(state, true)
    expect(state.isLocationActive)
      .to.equal(true)
  })
})
