import {
  COMPANY
} from '@/api/constants'
import {
  getParameterString
} from '@/api/helpers'
import api from '@/api/index'
import server from '@/api/server'
import {
  addParameter
} from '@/api/utils'
import router from '@/router'

const userDefaultObj = {
  customSetting: {},
  headquarter: {
    objectId: ''
  }
}
const state = {
  userId: '',
  user: userDefaultObj,
  headquarter: {
    objectId: ''
  }
}

export const getters = {
  userId: state => state.userId,
  user: state => state.user,
  customSetting: state => state.user.customSetting,
  headquarter: state => state.headquarter
}

export const actions = {
  async fetchPublicProfile ({ dispatch, commit, state, rootState }, userId = '') {
    if (!userId) {
      return
    }
    const urlEnd = `/v2/users/${userId}/publicProfile`
    const type = 'get'
    const resp = await api.asyncRequest(urlEnd, type).catch(error => {
      console.log('fetchPublicProfile failed', error)
      return { data: userDefaultObj }
    })
    const user = resp.data
    // to prevent cache, trigger force fetch latest photo
    if (user.profileUrl) {
      user.profileUrl = addParameter(user.profileUrl, `n=${Math.random()}`)
    }
    console.log('user', user)
    commit('SET_USER_ID', user.objectId)
    commit('SET_USER', user)
    commit('SET_HEADQUARTER', user.headquarter)
    if (user.headquarter) {
      const { title = '' } = rootState.route.query
      const parameter = getParameterString(rootState.route.query)
      if ((user.headquarter.title === COMPANY.YUNG_CHING ||
        user.headquarter.title === COMPANY.U_TRUST ||
        user.headquarter.title === COMPANY.TAI_CHING ||
        user.headquarter.title === COMPANY.HOUSE_FUN) &&
        // Yung Ching company, and it should not be a group url
        !rootState.property.objectId) {
        router.replace(`/${rootState.buildings.currentBuilding.objectId}/${COMPANY.YUNG_CHING}${parameter}`)
        // if url's title is different with user headquarter, fetch url's title from api
        if (title && title !== user.headquarter.title) {
          await dispatch('fetchHeadquarters', title)
        }
      } else if (
        // default LiveTour
        user.headquarter.title !== COMPANY.YUNG_CHING &&
        user.headquarter.title !== COMPANY.U_TRUST &&
        user.headquarter.title !== COMPANY.TAI_CHING &&
        user.headquarter.title !== COMPANY.HOUSE_FUN &&
        router.currentRoute.fullPath.indexOf(`/${COMPANY.YUNG_CHING}`) > -1) {
        // 非永慶 user, url should not have /yung-ching
        router.replace(router.currentRoute.fullPath.replace(`/${COMPANY.YUNG_CHING}`, ''))
      }

      // set qr url
      let shareUrl = server.viewerUrl || ''
      if (state.headquarter && state.headquarter.qrUrl) {
        shareUrl = state.headquarter.qrUrl || shareUrl
        // productNumber created by enterprise create building api; Use editor to create building won't generate productNumber.
        // So if there's no productNumber, no need to fix it
        if (rootState.buildings.currentBuilding.productNumber) {
          const productNumber = rootState.buildings.currentBuilding.productNumber.split('__')[1]
          shareUrl = shareUrl.replace('{id}', productNumber)
        }
      } else if (rootState.property.property.objectId) {
        shareUrl += `/${parameter}`
      } else {
        shareUrl += `/${rootState.buildings.currentBuilding.objectId}${parameter}`
      }
      dispatch('setShareUrl', shareUrl)

      if (!user.customSetting) { // should have default {}
        user.customSetting = {}
      }
      if (user.customSetting.showPromotionHeader) {
        dispatch('showPromotionBar')
      }
    }
    return resp
  },

  // if url params has other company, use that company headquarter instead of user's
  // url 有其他公司的參數時，用 url 的參數，而不使用 user 本身
  async fetchHeadquarters ({ commit }, title = '') {
    const urlEnd = `/v1/headquarters?title=${title}`
    const type = 'get'
    const resp = await api.asyncRequest(urlEnd, type).catch(error => {
      throw new Error('fetchHeadquarters failed', error)
    })
    const headquarter = resp.data ? resp.data[0] : {}
    console.log('fetchHeadquarter', headquarter)
    commit('SET_HEADQUARTER', headquarter)
    return resp
  }
}

export const mutations = {
  SET_USER_ID (state, userId = '') {
    state.userId = userId
  },

  SET_USER (state, user = {}) {
    state.user = user
  },

  SET_HEADQUARTER (state, headquarter = {}) {
    state.headquarter = headquarter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
