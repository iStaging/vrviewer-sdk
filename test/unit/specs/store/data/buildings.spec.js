import { getters, mutations } from '@/store/modules/data/buildings'
import { testAction } from '../../App.spec'
import store from '@/store'
import { isEqual } from '../../../../../src/api/utils'
const actionsInjector = require('inject-loader!@/store/modules/data/buildings') // eslint-disable-line
const {
  buildings,
  currentBuilding,
  showComment,
  showContactInfo,
  showPoweredBy,
  logoSize,
  floorplan
} = getters
const {
  SET_PANO_COLLECTIONS,
  SET_PANO_COLLECTION
} = mutations
const buildingId = 'nnn'
const userId = 'lll'
const buildingData = {
  objectId: buildingId,
  floorplan: ''
}
const buildingsResp = {
  [buildingId]: {
    data: buildingData,
    Owner: userId
  }
}
const { actions } = actionsInjector({
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
                  if (ref.indexOf(`/buildings/${buildingId}`) > -1) {
                    return buildingsResp[buildingId]
                  } else if (ref.indexOf('/buildings') > -1) {
                    return buildingsResp
                  }
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

describe('store/modules/data/buildings', () => {
  it('buildings', () => {
    const state = {
      buildings: []
    }
    const result = buildings(state, { buildings })
    expect(isEqual(result, [])).toBe(true)
  })

  it('currentBuilding', () => {
    const state = {
      currentBuilding: {}
    }
    const result = currentBuilding(state, { currentBuilding })
    expect(isEqual(result, {})).toBe(true)
  })

  it('showComment', () => {
    const state = {
      currentBuilding: {
        showComment: false
      }
    }
    const result = showComment(state, { showComment })
    expect(result).toEqual(false)
  })

  it('showContactInfo', () => {
    const state = {
      currentBuilding: {
        showContactInfo: false
      }
    }
    const result = showContactInfo(state, { showContactInfo })
    expect(result).toEqual(false)
  })

  it('showPoweredBy', () => {
    const state = {
      currentBuilding: {
        showPoweredBy: false
      }
    }
    const result = showPoweredBy(state, { showPoweredBy })
    expect(result).toEqual(false)
  })

  it('logoSize', () => {
    const state = {
      currentBuilding: {
        logoSize: ''
      }
    }
    const result = logoSize(state, { logoSize })
    expect(result).toEqual('')
  })

  it('floorplan', () => {
    const state = {
      currentBuilding: {
        floorplan: ''
      }
    }
    const result = floorplan(state, { floorplan })
    expect(result).toEqual('')
  })

  it('fetchBuilding', function (done) {
    store.commit('SET_HAS_PROPERTY', false)
    testAction(actions.fetchBuilding, buildingId, { currentBuilding: {} }, [{
      type: 'SET_PANO_COLLECTION',
      payload: buildingData
    }], [{
      type: 'setProgressCount',
      payload: 0
    }, {
      type: 'showProgress'
    }, {
      type: 'addProgressCount',
      payload: 2
    }, {
      type: 'setProgressMax',
      payload: 100
    }, {
      type: 'fetchPanoramas',
      payload: buildingId
    }], done)
  })

  it('SET_PANO_COLLECTIONS', () => {
    const state = {
      buildings: []
    }
    SET_PANO_COLLECTIONS(state, [{ objectId: 'rty' }])
    expect(isEqual(state.buildings, [{ objectId: 'rty' }])).toBe(true)
  })

  it('SET_PANO_COLLECTION', () => {
    const state = {
      currentBuilding: {}
    }
    SET_PANO_COLLECTION(state, { objectId: 'qwe' })
    expect(isEqual(state.currentBuilding, { objectId: 'qwe' })).toBe(true)
  })
})
