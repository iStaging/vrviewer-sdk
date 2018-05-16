import { getters, actions, mutations } from '@/store/modules/building-list'
import { testAction } from '../App.spec'
const {
  isPanoramasListActive
} = getters
const {
  showPanoramasList,
  togglePanoramasList,
  closePanoramasList
} = actions
const {
  SET_BUILDINGS_LIST_ACTIVE
} = mutations

describe('store/modules/building-list', () => {
  it('isPanoramasListActive', () => {
    const state = {
      isPanoramasListActive: false
    }
    const result = isPanoramasListActive(state, { isPanoramasListActive })
    expect(result).to.equal(false)
  })

  it('showPanoramasList', done => {
    const state = {
      isPanoramasListActive: false
    }
    testAction(showPanoramasList, undefined, state, [
      { type: 'SET_BUILDINGS_LIST_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('togglePanoramasList', done => {
    const state = {
      isPanoramasListActive: false
    }
    testAction(togglePanoramasList, undefined, state, [
      { type: 'SET_BUILDINGS_LIST_ACTIVE', payload: !state.isPanoramasListActive }
    ], undefined, done)
  })

  it('closePanoramasList', done => {
    const state = {
      isPanoramasListActive: true
    }
    testAction(closePanoramasList, undefined, state, [
      { type: 'SET_BUILDINGS_LIST_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_BUILDINGS_LIST_ACTIVE', () => {
    const state = {
      isPanoramasListActive: false
    }
    SET_BUILDINGS_LIST_ACTIVE(state, true)
    expect(state.isPanoramasListActive)
      .to.equal(true)
  })
})
