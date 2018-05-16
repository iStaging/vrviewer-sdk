import { getters, actions, mutations } from '@/store/modules/app'
import { testAction } from '../App.spec'
const {
  isAppReady,
  isBuildingNotFound,
  isNoPanoramasFound,
  themeColor
} = getters
const {
  setAppReady,
  setBuildingNotFound,
  setPanoramasNotFound,
  setThemeColor
} = actions
const {
  SET_APP_READY,
  SET_BUILDING_NOT_FOUND,
  SET_PANORAMAS_NOT_FOUND,
  SET_THEME_COLOR
} = mutations

describe('store/modules/app', () => {
  it('isAppReady', () => {
    const state = {
      isAppReady: false
    }
    const result = isAppReady(state, { isAppReady })
    expect(result).to.equal(false)
  })

  it('isBuildingNotFound', () => {
    const state = {
      isBuildingNotFound: false
    }
    const result = isBuildingNotFound(state, { isBuildingNotFound })
    expect(result).to.equal(false)
  })

  it('isNoPanoramasFound', () => {
    const state = {
      isNoPanoramasFound: false
    }
    const result = isNoPanoramasFound(state, { isNoPanoramasFound })
    expect(result).to.equal(false)
  })

  it('themeColor', () => {
    const color = 'pink'
    const state = {
      themeColor: color
    }
    const result = themeColor(state, { themeColor })
    expect(result).to.equal(color)
  })

  it('setAppReady', done => {
    const state = {
      isAppReady: false
    }
    testAction(setAppReady, true, state, [
      { type: 'SET_APP_READY', payload: true }
    ], undefined, done)
  })

  it('setBuildingNotFound', done => {
    const state = {
      setBuildingNotFound: false
    }
    testAction(setBuildingNotFound, true, state, [
      { type: 'SET_BUILDING_NOT_FOUND', payload: true }
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

  it('setThemeColor', done => {
    const color = 'green'
    const state = {
      setThemeColor: color
    }
    testAction(setThemeColor, color, state, [
      { type: 'SET_THEME_COLOR', payload: color }
    ], undefined, done)
  })

  it('SET_APP_READY', () => {
    const state = {
      isAppReady: false
    }
    SET_APP_READY(state, true)
    expect(state.isAppReady)
      .to.deep.equal(true)
  })

  it('SET_BUILDING_NOT_FOUND', () => {
    const state = {
      isBuildingNotFound: false
    }
    SET_BUILDING_NOT_FOUND(state, true)
    expect(state.isBuildingNotFound)
      .to.deep.equal(true)
  })

  it('SET_PANORAMAS_NOT_FOUND', () => {
    const state = {
      isNoPanoramasFound: false
    }
    SET_PANORAMAS_NOT_FOUND(state, true)
    expect(state.isNoPanoramasFound)
      .to.deep.equal(true)
  })

  it('SET_THEME_COLOR', () => {
    const color = 'blue'
    const state = {
      themeColor: color
    }
    SET_THEME_COLOR(state, color)
    expect(state.themeColor)
      .to.deep.equal(color)
  })
})
