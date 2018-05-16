import { getters, mutations } from '@/store/modules/data/pano-collection'
import { testAction } from '../../App.spec'
import store from '@/store'
const actionsInjector = require('inject-loader!@/store/modules/data/pano-collection') // eslint-disable-line
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
  SET_BUILDINGS,
  SET_BUILDING
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
const buildingsData = (function () {
  const buildingIds = Object.keys(buildingsResp)
  return buildingIds.map(objectId => buildingsResp[objectId].data)
}())
const { actions } = actionsInjector({
})

describe('store/modules/data/buildings', () => {
  it('buildings', () => {
    const state = {
      buildings: []
    }
    const result = buildings(state, { buildings })
    expect(result).to.deep.equal([])
  })

  it('currentBuilding', () => {
    const state = {
      currentBuilding: {}
    }
    const result = currentBuilding(state, { currentBuilding })
    expect(result).to.deep.equal({})
  })

  it('showComment', () => {
    const state = {
      currentBuilding: {
        showComment: false
      }
    }
    const result = showComment(state, { showComment })
    expect(result).to.equal(false)
  })

  it('showContactInfo', () => {
    const state = {
      currentBuilding: {
        showContactInfo: false
      }
    }
    const result = showContactInfo(state, { showContactInfo })
    expect(result).to.equal(false)
  })

  it('showPoweredBy', () => {
    const state = {
      currentBuilding: {
        showPoweredBy: false
      }
    }
    const result = showPoweredBy(state, { showPoweredBy })
    expect(result).to.equal(false)
  })

  it('logoSize', () => {
    const state = {
      currentBuilding: {
        logoSize: ''
      }
    }
    const result = logoSize(state, { logoSize })
    expect(result).to.equal('')
  })

  it('floorplan', () => {
    const state = {
      currentBuilding: {
        floorplan: ''
      }
    }
    const result = floorplan(state, { floorplan })
    expect(result).to.equal('')
  })

  it('fetchBuildings', function (done) {
    store.commit('SET_PROPERTY', {
      objectId: 'propertyId',
      buildingIndex: `{"${buildingId}":0}`
    })
    testAction(actions.fetchBuildings, 'userId', {}, [{
      type: 'SET_BUILDINGS',
      payload: buildingsData
    }], [{
      type: 'fetchBuilding',
      payload: ''
    }], done)
  })

  it('fetchBuilding', function (done) {
    store.commit('SET_HAS_PROPERTY', false)
    testAction(actions.fetchBuilding, buildingId, { currentBuilding: {} }, [{
      type: 'SET_BUILDING',
      payload: buildingData
    }, {
      type: 'SET_USER_ID',
      payload: userId
    }], [{
      type: 'setProgressCount',
      payload: 0
    }, {
      type: 'showProgress'
    }, {
      type: 'setBuildingNotFound',
      payload: false
    }, {
      type: 'addProgressCount',
      payload: 2
    }, {
      type: 'setProgressMax',
      payload: 100
    }, {
      type: 'fetchPublicProfile',
      payload: userId
    }, {
      type: 'fetchPanoramas',
      payload: buildingId
    }], done)
  })

  it('SET_BUILDINGS', () => {
    const state = {
      buildings: []
    }
    SET_BUILDINGS(state, [{ objectId: 'rty' }])
    expect(state.buildings)
      .to.deep.equal([{ objectId: 'rty' }])
  })

  it('SET_BUILDING', () => {
    const state = {
      currentBuilding: {}
    }
    SET_BUILDING(state, { objectId: 'qwe' })
    expect(state.currentBuilding)
      .to.deep.equal({ objectId: 'qwe' })
  })
})
