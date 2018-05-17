// import App from '@/App.vue'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import { isEqual } from '../../../src/api/utils'
Vue.use(VueI18n)
describe('App.vue', () => {
  it('app.vue', () => {
    expect(0).toEqual(0)
  })
})

// helper for testing action with expected mutations
const rootState = store.state
export const testAction = async (action, payload, state = {}, expectedMutations = [], expectedDispatches = [], done) => {
  let mutationsCount = 0
  let dispatchesCount = 0
  // console.log('state', state)

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[mutationsCount]
    // console.log('mutation', mutation, mutationsCount)
    // console.log('payload', payload)
    // console.log('type', type)
    try {
      expect(mutation.type).toEqual(type)
      if (payload !== undefined) {
        expect(isEqual(mutation.payload, payload)).toBe(true)
      }
    } catch (error) {
      done(error)
    }

    mutationsCount++
    if (mutationsCount + dispatchesCount >= expectedMutations.length + expectedDispatches.length) {
      done()
    }
  }

  const dispatch = (type, payload) => {
    const dispatch = expectedDispatches[dispatchesCount]
    // console.log('dispatch', dispatch, dispatchesCount)
    // console.log('payload', payload)
    // console.log('type', type)
    try {
      expect(dispatch.type).toEqual(type)
      if (payload !== undefined) {
        expect(isEqual(dispatch.payload, payload)).toBe(true)
      }
    } catch (error) {
      done(error)
    }

    dispatchesCount++
    if (dispatchesCount + mutationsCount >= expectedMutations.length + expectedDispatches.length) {
      done()
    }
  }

  // call the action with mocked store and arguments
  try {
    await action({ dispatch, commit, state, rootState }, payload)
  } catch (error) {
    console.error('testAction action error', error)
  }

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0 && expectedDispatches.length === 0) {
    expect(mutationsCount + dispatchesCount).toEqual(0)
    done()
  }
}
