// import App from '@/App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import store from '@/store'
import router from '@/router'
import { sync } from 'vuex-router-sync'
const unsync = sync(store, router)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueI18n)
unsync()
// describe('App.vue', () => {
// })

// helper for testing action with expected mutations
const rootState = store.state
export const testAction = async (action, payload, state = {}, expectedMutations = [], expectedDispatches = [], done) => {
  let mutationsCount = 0
  let dispatchesCount = 0

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[mutationsCount]
    // console.log('mutation', mutation, mutationsCount)
    // console.log('payload', payload)
    // console.log('type', type)
    try {
      expect(mutation.type).to.equal(type)
      if (payload !== undefined) {
        expect(mutation.payload).to.deep.equal(payload)
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
      expect(dispatch.type).to.equal(type)
      if (payload !== undefined) {
        expect(dispatch.payload).to.deep.equal(payload)
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
    expect(mutationsCount + dispatchesCount).to.equal(0)
    done()
  }
}
