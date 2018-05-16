import { getters, mutations } from '@/store/modules/data/property'
import { testAction } from '../../App.spec'
const actionsInjector = require('inject-loader!@/store/modules/data/property') // eslint-disable-line
const {
  property,
  hasProperty
} = getters
const {
  SET_PROPERTY,
  SET_HAS_PROPERTY
} = mutations
const propertyId = 'rrr'
const userId = 'vvv'
const propertyData = {
  objectId: propertyId,
  fake: 'test',
  Owner: userId
}
const { actions } = actionsInjector({
  'firebase': {
    database () {
      return {
        ref (ref = '') {
          return {
            once (value, cb) {
              const snapshot = {
                val () {
                  return {
                    data: propertyData
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

describe('store/modules/data/property', () => {
  it('property', () => {
    const state = {
      property: {}
    }
    const result = property(state, { property })
    expect(result).to.deep.equal({})
  })

  it('hasProperty', () => {
    const state = {
      hasProperty: false
    }
    const result = hasProperty(state, { hasProperty })
    expect(result).to.equal(false)
  })

  it('fetchProperty', done => {
    testAction(actions.fetchProperty, propertyId, {}, [{
      type: 'SET_HAS_PROPERTY',
      payload: true
    }, {
      type: 'SET_PROPERTY',
      payload: propertyData
    }], [{
      type: 'fetchBuildings',
      payload: userId
    }], done)
  })

  it('setHasProperty', done => {
    testAction(actions.setHasProperty, true, {}, [{
      type: 'SET_HAS_PROPERTY',
      payload: true
    }], undefined, done)
  })

  it('SET_PROPERTY', () => {
    const state = {
      property: {}
    }
    SET_PROPERTY(state, { objectId: 'abc' })
    expect(state.property)
      .to.deep.equal({ objectId: 'abc' })
  })

  it('SET_HAS_PROPERTY', () => {
    const state = {
      hasProperty: false
    }
    SET_HAS_PROPERTY(state, true)
    expect(state.hasProperty)
      .to.equal(true)
  })
})
