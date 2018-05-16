import { getters, actions, mutations } from '@/store/modules/information'
import { testAction } from '../App.spec'
const {
  isInformationActive
} = getters
const {
  showInformation,
  toggleInformation,
  closeInformation
} = actions
const {
  SET_INFORMATION_ACTIVE
} = mutations

describe('store/modules/information', () => {
  it('isInformationActive', () => {
    const state = {
      isInformationActive: false
    }
    const result = isInformationActive(state, { isInformationActive })
    expect(result).toEqual(false)
  })

  it('showInformation', done => {
    const state = {
      isInformationActive: false
    }
    testAction(showInformation, undefined, state, [
      { type: 'SET_INFORMATION_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleInformation', done => {
    const state = {
      isInformationActive: false
    }
    testAction(toggleInformation, undefined, state, [
      { type: 'SET_INFORMATION_ACTIVE', payload: !state.isInformationActive }
    ], undefined, done)
  })

  it('closeInformation', done => {
    const state = {
      isInformationActive: true
    }
    testAction(closeInformation, undefined, state, [
      { type: 'SET_INFORMATION_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_INFORMATION_ACTIVE', () => {
    const state = {
      isInformationActive: false
    }
    SET_INFORMATION_ACTIVE(state, true)
    expect(state.isInformationActive)
      .toEqual(true)
  })
})
