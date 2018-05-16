import { getters, mutations } from '@/store/modules/data/panoramas'
import { testAction } from '../../App.spec'
import store from '@/store'
import { isEqual } from '../../../../../src/api/utils'
const actionsInjector = require('inject-loader!@/store/modules/data/panoramas') // eslint-disable-line
const {
  panoramas,
  currentPanorama
} = getters
const {
  SET_PANORAMAS,
  SET_PANORAMA
} = mutations
const panoramaId = 'eee'
const userId = 'kkk'
const panoramaData = {
  objectId: panoramaId,
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
  return panoramaIds.map(objectId => panoramasResp[objectId].data)
}())
const { actions } = actionsInjector({
  '../../../api/index': {
    async isPanoramaCubemapReady (panoramaId, filename) {
      return true
    }
  },
  'firebase': {
    database () {
      return {
        ref (ref = '') {
          return {
            orderByChild () {
              return this
            },
            equalTo () {
              return this
            },
            once (value, cb) {
              const snapshot = {
                val () {
                  return panoramasResp
                }
              }
              return cb.bind(this)(snapshot)
            }
          }
        }
      }
    }
  }
})

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
      currentPanorama: {}
    }
    const result = currentPanorama(state, { currentPanorama })
    expect(isEqual(result, {})).toBe(true)
  })

  it('fetchPanoramas', function (done) {
    store.commit('SET_PROGRESS_MAX', panoramasData.length + 12)
    store.commit('SET_PROGRESS_COUNT', 100)
    testAction(actions.fetchPanoramas, 'buildingId', {}, [{
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
      type: 'closeProgress'
    }, {
      type: 'setAppReady',
      payload: true
    }, {
      type: 'setKrpanoActive',
      payload: true
    }], done)
  })

  it('setPanorama', done => {
    testAction(actions.setPanorama, panoramaData, {}, [{
      type: 'SET_PANORAMA',
      payload: panoramaData
    }], undefined, done)
  })

  it('SET_PANORAMAS', () => {
    const state = {
      panoramas: []
    }
    SET_PANORAMAS(state, [{ objectId: 'abc' }])
    expect(isEqual(state.panoramas, [{ objectId: 'abc' }])).toBe(true)
  })

  it('SET_PANORAMA', () => {
    const state = {
      currentPanorama: {}
    }
    SET_PANORAMA(state, { objectId: 'def' })
    expect(isEqual(state.currentPanorama, { objectId: 'def' })).toBe(true)
  })
})
