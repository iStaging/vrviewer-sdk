import { getters, actions, mutations } from '@/store/modules/progress'
import { testAction } from '../App.spec'
const {
  isProgressActive,
  progressValue,
  progressMax
} = getters
const {
  showProgress,
  closeProgress,
  addProgressCount,
  setProgressCount,
  setProgressMax
} = actions
const {
  SET_PROGRESS_ACTIVE,
  ADD_PROGRESS_COUNT,
  SET_PROGRESS_COUNT,
  SET_PROGRESS_MAX
} = mutations

describe('store/modules/progress', () => {
  it('isProgressActive', () => {
    const state = {
      isProgressActive: false
    }
    const result = isProgressActive(state, { isProgressActive })
    expect(result).toEqual(false)
  })

  it('progressValue', () => {
    const state = {
      progressValue: 10
    }
    const result = progressValue(state, { progressValue })
    expect(result).toEqual(10)
  })

  it('progressMax', () => {
    const state = {
      progressMax: 25
    }
    const result = progressMax(state, { progressMax })
    expect(result).toEqual(25)
  })

  it('showProgress', done => {
    const state = {
      isProgressActive: false
    }
    testAction(showProgress, undefined, state, [
      { type: 'SET_PROGRESS_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('closeProgress', done => {
    const state = {
      isProgressActive: true
    }
    testAction(closeProgress, undefined, state, [
      { type: 'SET_PROGRESS_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('addProgressCount', done => {
    const number = 5
    const state = {
      progressValue: number
    }
    testAction(addProgressCount, number + 1, state, [
      { type: 'ADD_PROGRESS_COUNT', payload: number + 1 }
    ], undefined, done)
  })

  it('setProgressCount', done => {
    const number = 5
    const state = {
      progressValue: 2
    }
    testAction(setProgressCount, number, state, [
      { type: 'SET_PROGRESS_COUNT', payload: number }
    ], undefined, done)
  })

  it('setProgressMax', done => {
    const number = 20
    const state = {
      progressMax: 10
    }
    testAction(setProgressMax, number, state, [
      { type: 'SET_PROGRESS_MAX', payload: number }
    ], undefined, done)
  })

  it('SET_PROGRESS_ACTIVE', () => {
    const state = {
      isProgressActive: false
    }
    SET_PROGRESS_ACTIVE(state, true)
    expect(state.isProgressActive)
      .toEqual(true)
  })

  it('ADD_PROGRESS_COUNT', () => {
    const state = {
      progressValue: 10
    }
    ADD_PROGRESS_COUNT(state, 3)
    expect(state.progressValue)
      .toEqual(10 + 3)
  })

  it('SET_PROGRESS_COUNT', () => {
    const state = {
      progressValue: 0
    }
    SET_PROGRESS_COUNT(state, 7)
    expect(state.progressValue)
      .toEqual(7)
  })

  it('SET_PROGRESS_MAX', () => {
    const state = {
      progressMax: 20
    }
    SET_PROGRESS_MAX(state, 60)
    expect(state.progressMax)
      .toEqual(60)
  })
})
