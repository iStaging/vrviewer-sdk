import { getters, actions, mutations } from '@/store/modules/app'
import { testAction } from '../App.spec'
const {
  isAppReady,
  isNoPanoramasFound
} = getters
const {
  setAppReady,
  setPanoramasNotFound
} = actions
const {
  SET_APP_READY,
  SET_PANORAMAS_NOT_FOUND
} = mutations

describe('store/modules/app', () => {
  it('isAppReady', () => {
    const state = {
      isAppReady: false
    }
    const result = isAppReady(state, { isAppReady })
    expect(result).toEqual(false)
  })

  it('isNoPanoramasFound', () => {
    const state = {
      isNoPanoramasFound: false
    }
    const result = isNoPanoramasFound(state, { isNoPanoramasFound })
    expect(result).toEqual(false)
  })

  it('setAppReady', done => {
    const state = {
      isAppReady: false
    }
    testAction(setAppReady, true, state, [
      { type: 'SET_APP_READY', payload: true }
    ], undefined, done)
  })

  it('setPanoramasNotFound', done => {
    const state = {
      setPanoramasNotFound: false
    }
    testAction(setPanoramasNotFound, true, state, [
      { type: 'SET_PANORAMAS_NOT_FOUND', payload: true }
    ], undefined, done)
  })

  it('SET_APP_READY', () => {
    const state = {
      isAppReady: false
    }
    SET_APP_READY(state, true)
    expect(state.isAppReady)
      .toBe(true)
  })

  it('SET_PANORAMAS_NOT_FOUND', () => {
    const state = {
      isNoPanoramasFound: false
    }
    SET_PANORAMAS_NOT_FOUND(state, true)
    expect(state.isNoPanoramasFound)
      .toBe(true)
  })
})
