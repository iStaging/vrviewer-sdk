import { getters, actions, mutations } from '@/store/modules/app'
import { testAction } from '../App.spec'
const {
  isAppReady,
  isScreenReady,
  isPanoCollectionNotFound,
  isNoPanoramasFound
} = getters
const {
  setAppReady,
  setScreenReady,
  setPanoCollectionNotFound,
  setPanoramasNotFound
} = actions
const {
  SET_APP_READY,
  SET_SCREEN_READY,
  SET_PANO_COLLECTION_NOT_FOUND,
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

  it('isScreenReady', () => {
    const state = {
      isScreenReady: false
    }
    const result = isScreenReady(state, { isScreenReady })
    expect(result).toEqual(false)
  })

  it('isPanoCollectionNotFound', () => {
    const state = {
      isPanoCollectionNotFound: false
    }
    const result = isPanoCollectionNotFound(state, { isPanoCollectionNotFound })
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
    testAction(setAppReady, true, state, [{
      type: 'SET_APP_READY', payload: true
    }], undefined, done)
  })

  it('setScreenReady', done => {
    const state = {
      isScreenReady: false
    }
    testAction(setScreenReady, true, state, [{
      type: 'SET_SCREEN_READY',
      payload: true
    }], [{
      type: 'showPanoramasList'
    }], done)

    state.isScreenReady = true
    testAction(setScreenReady, false, state, [{
      type: 'SET_SCREEN_READY',
      payload: false
    }], [{
      type: 'closePanoramasList'
    }], done)
  })

  it('setPanoCollectionNotFound', done => {
    const state = {
      setPanoCollectionNotFound: false
    }
    testAction(setPanoCollectionNotFound, true, state, [{
      type: 'SET_PANO_COLLECTION_NOT_FOUND',
      payload: true
    }], undefined, done)
  })

  it('setPanoramasNotFound', done => {
    const state = {
      setPanoramasNotFound: false
    }
    testAction(setPanoramasNotFound, true, state, [{
      type: 'SET_PANORAMAS_NOT_FOUND',
      payload: true
    }], undefined, done)
  })

  it('SET_APP_READY', () => {
    const state = {
      isAppReady: false
    }
    SET_APP_READY(state, true)
    expect(state.isAppReady)
      .toEqual(true)
  })

  it('SET_SCREEN_READY', () => {
    const state = {
      isScreenReady: false
    }
    SET_SCREEN_READY(state, true)
    expect(state.isScreenReady)
      .toEqual(true)
  })

  it('SET_PANO_COLLECTION_NOT_FOUND', () => {
    const state = {
      isPanoCollectionNotFound: false
    }
    SET_PANO_COLLECTION_NOT_FOUND(state, true)
    expect(state.isPanoCollectionNotFound)
      .toEqual(true)
  })

  it('SET_PANORAMAS_NOT_FOUND', () => {
    const state = {
      isNoPanoramasFound: false
    }
    SET_PANORAMAS_NOT_FOUND(state, true)
    expect(state.isNoPanoramasFound)
      .toEqual(true)
  })
})
