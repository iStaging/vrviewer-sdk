import firebase from 'firebase'
import moment from 'moment'
import {
  SOCIAL
} from '~js/constants'
import CommentsManager from '@/store/manager/comments-manager'
import gaEvents from '~js/ga-events'

const state = {
  isCommentsActive: false,
  isSocialLiked: false,
  social: {},
  comments: [],
  visitors: []
}

export const getters = {
  isCommentsActive: state => state.isCommentsActive,
  isSocialLiked: state => state.isSocialLiked,
  social: state => state.social,
  comments: state => state.comments,
  visitors: state => state.visitors
}

let socialRef, viewCountRef, likeCountRef, commentsRef, commentCountRef, visitorsRef, visitorCountRef
const isLikePrefix = 'istaging_sharevr_like_'
export const actions = {
  showComments ({ commit, rootState }) {
    if (state.isCommentsActive === false) {
      commit('SET_COMMENTS_ACTIVE', true)
      gaEvents.sendEvent('Building', 'ShowComments', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  toggleComments ({ dispatch }) {
    if (state.isCommentsActive === true) {
      dispatch('closeComments')
    } else {
      dispatch('showComments')
    }
  },

  closeComments ({ commit, rootState }) {
    if (state.isCommentsActive === true) {
      commit('SET_COMMENTS_ACTIVE', false)
      gaEvents.sendEvent('Building', 'CloseComments', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
    }
  },

  setSocialLike ({ commit }, isLike = false) {
    commit('SET_SOCIAL_LIKE', isLike)
  },

  initSocial ({ dispatch, rootState }) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    const basicRef = `${SOCIAL.BASIC_FOLDER}/${buildingId}`
    socialRef = firebase.database().ref(`${basicRef}`)
    viewCountRef = firebase.database().ref(`${basicRef}/${SOCIAL.VIEW_COUNT}`)
    likeCountRef = firebase.database().ref(`${basicRef}/${SOCIAL.LIKE_COUNT}`)
    commentsRef = firebase.database().ref(`${basicRef}/${SOCIAL.COMMENTS}`)
    visitorsRef = firebase.database().ref(`${basicRef}/${SOCIAL.VISITORS}`)
    commentCountRef = firebase.database().ref(`${basicRef}/${SOCIAL.COMMENT_COUNT}`)
    visitorCountRef = firebase.database().ref(`${basicRef}/${SOCIAL.VISITOR_COUNT}`)
    const isLike = window.localStorage.getItem(`${isLikePrefix}${buildingId}`)
    dispatch('setSocialLike', JSON.parse(isLike) || false)
    dispatch('fetchSocial')
  },

  fetchSocial ({ dispatch, commit, rootState }) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !socialRef) {
      return
    }
    socialRef.once('value', snapshot => {
      const resp = snapshot.val()
      const social = {
        [SOCIAL.VIEW_COUNT]: 0,
        [SOCIAL.LIKE_COUNT]: 0,
        [SOCIAL.COMMENT_COUNT]: 0,
        [SOCIAL.VISITOR_COUNT]: 0,
        Owner: rootState.user.userId
      }
      if (snapshot.numChildren() === 0) {
        // set Default value for building and child data
        socialRef.set(social)
      } else {
        Object.keys(social).map(key => (social[key] = resp[key] || 0))
        if (resp[SOCIAL.VISITOR_COUNT] === undefined) {
          visitorCountRef.transaction(visitorCount => 0)
        }
      }
      commit('SET_SOCIAL', social)
      dispatch('increaseViewCount')
    })
  },

  increaseViewCount ({ commit, state, rootState }) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !viewCountRef) {
      return
    }
    viewCountRef.transaction(viewCount => {
      commit('INCREASE_VIEW_COUNT', viewCount)
      return state.social[SOCIAL.VIEW_COUNT]
    })
  },

  updateLikeCount ({ commit, state, rootState }) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !likeCountRef) {
      return
    }
    likeCountRef.transaction(likeCount => {
      if (likeCount !== null) {
        if (state.isSocialLiked) {
          commit('DECREASE_LIKE_COUNT', likeCount)
          commit('SET_SOCIAL_LIKE', false)
          gaEvents.sendEvent('Building', 'ClickUnLike', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
          window.localStorage.setItem(`${isLikePrefix}${buildingId}`, 'false')
          if (likeCount > 0) {
            return state.social[SOCIAL.LIKE_COUNT]
          } else {
            return 0
          }
        } else {
          gaEvents.sendEvent('Building', 'ClickLike', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
          commit('INCREASE_LIKE_COUNT', likeCount)
          commit('SET_SOCIAL_LIKE', true)
          window.localStorage.setItem(`${isLikePrefix}${buildingId}`, 'true')
          return state.social[SOCIAL.LIKE_COUNT]
        }
      }
      return likeCount
    })
  },

  fetchComments ({ commit, rootState }, limit = SOCIAL.FETCH_COMMENTS_COUNTS_EACH_TIME) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !commentsRef) {
      return
    }
    commentsRef.orderByChild('createdAt')
      .limitToLast(limit)
      .once('value', snapshot => {
        const commentsObj = snapshot.val()
        if (commentsObj) {
          const commentsManager = new CommentsManager()
          commentsManager.factory(commentsObj, rootState.user.user)
          const comments = commentsManager.getComments()
          console.log('comments', comments)
          commit('SET_COMMENTS', comments)
        }
      })
  },

  addComment ({ commit, state, rootState }, message = '') {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !commentsRef || !commentCountRef) {
      return
    }
    const promise = new Promise((resolve, reject) => {
      commentCountRef.transaction(commentCount => {
        commit('INCREASE_COMMENT_COUNT', commentCount)
        return state.social[SOCIAL.COMMENT_COUNT]
      })
      const comment = {
        createdAt: moment().format(),
        message
      }
      commentsRef.push(comment)
      commit('ADD_COMMENT', comment)
      resolve()
    })
    promise.catch(error => {
      console.error('add comment error', error)
    })
    return promise
  },

  addVisitor ({ commit, state, rootState }, user = {}) {
    const buildingId = rootState.buildings.currentBuilding.objectId
    if (!buildingId || !visitorsRef || !visitorCountRef) {
      return
    }
    const promise = new Promise((resolve, reject) => {
      visitorCountRef.transaction(visitorCount => {
        commit('INCREASE_VISITOR_COUNT', visitorCount)
        return state.social[SOCIAL.VISITOR_COUNT]
      })
      const visitor = {
        createdAt: moment().format(),
        name: user.name,
        email: user.email
      }
      visitorsRef.push(visitor)
      commit('ADD_VISITOR', visitor)
      resolve()
    })
    promise.catch(error => {
      console.error('add visitor error', error)
    })
    return promise
  }
}

export const mutations = {
  SET_COMMENTS_ACTIVE (state, bool = false) {
    state.isCommentsActive = bool
  },

  SET_SOCIAL_LIKE (state, isLike = false) {
    state.isSocialLiked = isLike
  },

  SET_SOCIAL (state, social = {}) {
    state.social = social
  },

  INCREASE_VIEW_COUNT (state, count = 0) {
    if (count !== null) {
      state.social[SOCIAL.VIEW_COUNT] = count + 1
    }
  },

  INCREASE_LIKE_COUNT (state, count = 0) {
    if (count !== null) {
      state.social[SOCIAL.LIKE_COUNT] = count + 1
    }
  },

  DECREASE_LIKE_COUNT (state, count = 0) {
    if (count !== null) {
      state.social[SOCIAL.LIKE_COUNT] = count - 1
    }
  },

  INCREASE_COMMENT_COUNT (state, count = 0) {
    if (count !== null) {
      state.social[SOCIAL.COMMENT_COUNT] = count + 1
    }
  },

  INCREASE_VISITOR_COUNT (state, count = 0) {
    if (count !== null) {
      state.social[SOCIAL.VISITOR_COUNT] = count + 1
    }
  },

  SET_COMMENTS (state, comments = []) {
    state.comments = comments
  },

  ADD_COMMENT (state, comment = {}) {
    state.comments.push(comment)
  },

  ADD_VISITOR (state, visitor = {}) {
    state.visitors.push(visitor)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
