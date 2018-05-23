import { getters, actions, mutations } from '@/store/modules/fullscreen'
import { testAction } from '../App.spec'
const {
  isFullscreen
} = getters
const {
  enterFullscreen,
  exitFullscreen
} = actions
const {
  SET_FULL_SCREEN
} = mutations

describe('store/modules/fullscreen', () => {
  it('isFullscreen', () => {
    const state = {
      isFullscreen: false
    }
    const result = isFullscreen(state, { isFullscreen })
    expect(result).toEqual(false)
  })

  it('enterFullscreen', done => {
    const state = {
      isFullscreen: false
    }
    testAction(enterFullscreen, undefined, state, [
      { type: 'SET_FULL_SCREEN', payload: true }
    ], undefined, done)
  })

  it('exitFullscreen', done => {
    const state = {
      isFullscreen: true
    }
    testAction(exitFullscreen, undefined, state, [
      { type: 'SET_FULL_SCREEN', payload: false }
    ], undefined, done)
  })

  it('SET_FULL_SCREEN', () => {
    const state = {
      isFullscreen: false
    }
    SET_FULL_SCREEN(state, true)
    expect(state.isFullscreen)
      .toEqual(true)
  })
})
