import { actions, getters, mutations } from '../../../../../src/store/modules/data/panoramas'
import { testAction } from '../../main.spec'
import store from '../../../../../src/store'
import { isEqual } from '../../../../../src/api/utils'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
const {
  importPanoramas,
  fetchPanoramas,
  selectPanorama,
  setPanorama,
  setHoveredPanorama
} = actions
const {
  panoramas,
  currentPanorama,
  hoveredPanorama
} = getters
const {
  SET_PANORAMAS,
  SET_PANORAMA,
  SET_HOVERED_PANORAMA
} = mutations
const panoramaId = 'eee'
const userId = 'kkk'
const panoramaData = {
  panoramaId,
  fake: 'test',
  Owner: userId,
  rawUrl: 'yyy',
  cubemapReady: true
}
const panoramasResp = {
  [panoramaId]: {
    data: panoramaData
  }
}
const panoramasData = (function () {
  const panoramaIds = Object.keys(panoramasResp)
  return panoramaIds.map(panoramaId => panoramasResp[panoramaId].data)
}())
const Krpano = function () {
  return {
    set: function (name, value) {
    },
    call: function (name) {
      emitter.emit(name)
    }
  }
}
const krpano = new Krpano()

describe('store/modules/data/panoramas', () => {
  it('panoramas', () => {
    const state = {
      panoramas: []
    }
    const result = panoramas(state, { panoramas })
    expect(isEqual(result, [])).toBe(true)
  })

  it('currentPanorama', () => {
    const state = {
      currentPanorama: { z: 5 }
    }
    const result = currentPanorama(state, { currentPanorama })
    expect(isEqual(result, { z: 5 })).toBe(true)
  })

  it('hoveredPanorama', () => {
    const state = {
      hoveredPanorama: { a: 2 }
    }
    const result = hoveredPanorama(state, { hoveredPanorama })
    expect(isEqual(result, { a: 2 })).toBe(true)
  })

  it('importPanoramas', function () {
    testAction(importPanoramas, panoramasData)
  })

  it('fetchPanoramas', function (done) {
    store.commit('SET_PROGRESS_MAX', panoramasData.length + 12)
    store.commit('SET_PROGRESS_COUNT', 100)
    testAction(fetchPanoramas, 'buildingId', { panoramas: panoramasData }, [{
      type: 'SET_PANORAMAS',
      payload: panoramasData
    }, {
      type: 'SET_PANORAMA',
      payload: panoramaData
    }], [{
      type: 'setKrpanoActive',
      payload: false
    }, {
      type: 'setPanoramasNotFound',
      payload: false
    }, {
      type: 'setProgressMax',
      payload: panoramasData.length + 12
    }, {
      type: 'fetchMarkers',
      payload: panoramaData
    }, {
      type: 'addProgressCount',
      payload: 10
    }, {
      type: 'addProgressCount',
      payload: 1
    }, {
      type: 'setAppReady',
      payload: true
    }, {
      type: 'setKrpanoActive',
      payload: true
    }, {
      type: 'closeProgress'
    }], done)
  })

  it('selectPanorama', done => {
    store.dispatch('setKrpanoEl', krpano)
    const state = {
      currentPanorama: { panoramaId: '552' },
      panoramas: [{ panoramaId: '552' }, panoramaData]
    }
    let spy = sinon.spy()
    emitter.on(`prepare_change_scene(panorama_${panoramaData.panoramaId}, ${panoramaData.panoramaId}, 'PanoramaList');`, spy)
    store.dispatch('showProgress')
    testAction(selectPanorama, panoramaData, state, undefined, undefined, done)
    expect(spy.called)
      .toEqual(false)

    store.dispatch('closeProgress')
    testAction(selectPanorama, panoramaData, state, undefined, undefined, done)
    expect(spy.called)
      .toEqual(true)
  })

  it('setPanorama', done => {
    testAction(setPanorama, panoramaData, {}, [{
      type: 'SET_PANORAMA',
      payload: panoramaData
    }], undefined, done)
  })

  it('setHoveredPanorama', done => {
    testAction(setHoveredPanorama, panoramaData, {}, [{
      type: 'SET_HOVERED_PANORAMA',
      payload: panoramaData
    }], undefined, done)
  })

  it('SET_PANORAMAS', () => {
    const state = {
      panoramas: []
    }
    SET_PANORAMAS(state, [{ panoramaId: 'abc' }])
    expect(isEqual(state.panoramas[0].panoramaId, 'abc')).toBe(true)
  })

  it('SET_PANORAMA', () => {
    const state = {
      currentPanorama: {}
    }
    SET_PANORAMA(state, { panoramaId: 'def' })
    expect(isEqual(state.currentPanorama.panoramaId, 'def')).toBe(true)
  })

  it('SET_HOVERED_PANORAMA', () => {
    const state = {
      hoveredPanorama: {}
    }
    SET_HOVERED_PANORAMA(state, { panoramaId: 'xdre' })
    expect(isEqual(state.hoveredPanorama.panoramaId, 'xdre')).toBe(true)
  })
})
