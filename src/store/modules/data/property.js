import firebase from 'firebase'
import {
  getParameterString
} from '~js/helpers'
import router from '@/router'

const state = {
  property: {}
}

export const getters = {
  property: state => state.property
}

export const actions = {
  async fetchProperty ({ dispatch, commit, rootState }, propertyId = '') {
    const fetchProperty = await firebase.database().ref(`/properties/${propertyId}`)
    fetchProperty[process.env.USE_FULL_SYNC ? 'on' : 'once']('value', async snapshot => {
      const resp = snapshot.val()
      if (!resp) {
        commit('SET_PROPERTY', {})
        const { buildingId } = rootState.route.params
        if (buildingId) {
          dispatch('fetchBuilding', buildingId)
          const parameter = getParameterString(rootState.route.query)
          router.replace(`/${buildingId}${parameter}`)
        } else {
          dispatch('setPropertyNotFound', true)
        }
        return
      }
      const property = resp.data
      const userId = resp.Owner
      console.log('property:', property)
      dispatch('fetchBuildings', userId)
      commit('SET_PROPERTY', property)
    })
  }
}

export const mutations = {
  SET_PROPERTY (state, property = {}) {
    state.property = property
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
