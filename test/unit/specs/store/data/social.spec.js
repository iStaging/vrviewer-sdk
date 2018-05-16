import moment from 'moment'
import { getters, mutations } from '@/store/modules/data/social'
import { testAction } from '../../App.spec'
import store from '@/store'
import {
  SOCIAL
} from '@/api/constants'
const actionsInjector = require('inject-loader!@/store/modules/data/social') // eslint-disable-line
const {
  isCommentsActive,
  isSocialLiked,
  social,
  comments
} = getters
const {
  SET_COMMENTS_ACTIVE,
  SET_SOCIAL_LIKE,
  SET_SOCIAL,
  INCREASE_VIEW_COUNT,
  INCREASE_LIKE_COUNT,
  DECREASE_LIKE_COUNT,
  INCREASE_COMMENT_COUNT,
  SET_COMMENTS,
  ADD_COMMENT
} = mutations
const viewCount = 20
const likeCount = 5
const commentCount = 2
const comment = { 'foo': 'bar' }
const { actions } = actionsInjector({
  'firebase': {
    database () {
      return {
        ref (ref = '') {
          return {
            orderByChild () {
              return this
            },
            limitToLast () {
              return this
            },
            push () {
              return this
            },
            once (value, cb) {
              const snapshot = {}
              if (ref.indexOf('/comments') > -1) {
                snapshot.val = () => {
                  return [comment]
                }
              } else {
                snapshot.val = () => {
                  return {
                    [SOCIAL.VIEW_COUNT]: viewCount,
                    [SOCIAL.LIKE_COUNT]: likeCount,
                    [SOCIAL.COMMENT_COUNT]: commentCount
                  }
                }
                snapshot.numChildren = () => {
                  return 6
                }
              }
              return cb.bind(this)(snapshot)
            },
            transaction (cb) {
              // console.log('ref', ref)
              // console.log('transaction', cb)
              return new Promise(resolve => {
                if (ref.indexOf('/commentCount') > -1) {
                  cb.bind(this)(commentCount)
                } else if (ref.indexOf('/likeCount') > -1) {
                  cb.bind(this)(likeCount)
                } else if (ref.indexOf('/viewCount') > -1) {
                  cb.bind(this)(viewCount)
                } else {
                  cb.bind(this)()
                }
                resolve()
              })
            }
          }
        }
      }
    }
  }
})

describe('store/modules/data/social', () => {
  it('isCommentsActive', () => {
    const state = {
      isCommentsActive: false
    }
    const result = isCommentsActive(state, { isCommentsActive })
    expect(result).to.equal(false)
  })

  it('isSocialLiked', () => {
    const state = {
      isSocialLiked: false
    }
    const result = isSocialLiked(state, { isSocialLiked })
    expect(result).to.equal(false)
  })

  it('social', () => {
    const state = {
      social: false
    }
    const result = social(state, { social })
    expect(result).to.equal(false)
  })

  it('comments', () => {
    const state = {
      comments: false
    }
    const result = comments(state, { comments })
    expect(result).to.equal(false)
  })

  it('showComments', done => {
    const state = {
      isCommentsActive: false
    }
    testAction(actions.showComments, undefined, state, [
      { type: 'SET_COMMENTS_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleComments', done => {
    const state = {
      isCommentsActive: false
    }
    testAction(actions.toggleComments, undefined, state, [
      { type: 'SET_COMMENTS_ACTIVE', payload: !state.isCommentsActive }
    ], undefined, done)
  })

  it('closeComments', done => {
    const state = {
      isCommentsActive: true
    }
    testAction(actions.closeComments, undefined, state, [
      { type: 'SET_COMMENTS_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('setSocialLike', done => {
    const state = {
      isSocialLiked: false
    }
    testAction(actions.setSocialLike, true, state, [
      { type: 'SET_SOCIAL_LIKE', payload: true }
    ], undefined, done)
  })

  it('initSocial', done => {
    testAction(actions.initSocial, undefined, {}, [], [
      { type: 'setSocialLike', payload: false },
      { type: 'fetchSocial', payload: '' }
    ], done)
  })

  it('fetchSocial', done => {
    store.commit('SET_BUILDING', {
      objectId: 'aaa'
    })
    const state = {
      social: {}
    }
    testAction(actions.fetchSocial, undefined, state, [{
      type: 'SET_SOCIAL',
      payload: {
        [SOCIAL.VIEW_COUNT]: viewCount,
        [SOCIAL.LIKE_COUNT]: likeCount,
        [SOCIAL.COMMENT_COUNT]: commentCount
      }
    }], [{ type: 'increaseViewCount' }], done)
  })

  it('increaseViewCount', done => {
    testAction(actions.increaseViewCount, undefined, {}, [
      { type: 'INCREASE_VIEW_COUNT', payload: viewCount }
    ], undefined, done)
  })

  it('updateLikeCount to true', done => {
    const state = { isSocialLiked: false }
    testAction(actions.updateLikeCount, undefined, state, [
      { type: 'INCREASE_LIKE_COUNT', payload: likeCount },
      { type: 'SET_SOCIAL_LIKE', payload: true }
    ], undefined, done)
  })

  it('updateLikeCount to false', done => {
    const state = { isSocialLiked: true }
    testAction(actions.updateLikeCount, undefined, state, [
      { type: 'DECREASE_LIKE_COUNT', payload: likeCount },
      { type: 'SET_SOCIAL_LIKE', payload: false }
    ], undefined, done)
  })

  it('fetchComments', done => {
    const limit = SOCIAL.FETCH_COMMENTS_COUNTS_EACH_TIME
    const fakeComments = [comment]
    for (let item in fakeComments) {
      if (!fakeComments[item].replies) {
        fakeComments[item].replies = []
      }
    }
    testAction(actions.fetchComments, limit, {}, [
      { type: 'SET_COMMENTS', payload: fakeComments }
    ], undefined, done)
  })

  it('addComment', done => {
    const message = 'asdfasdf'
    testAction(actions.addComment, message, {}, [{
      type: 'INCREASE_COMMENT_COUNT',
      payload: commentCount
    }, {
      type: 'ADD_COMMENT',
      payload: {
        createdAt: moment().format(),
        message
      }
    }], undefined, done)
  })

  it('SET_COMMENTS_ACTIVE', () => {
    const state = {
      isCommentsActive: false
    }
    SET_COMMENTS_ACTIVE(state, true)
    expect(state.isCommentsActive)
      .to.equal(true)
  })

  it('SET_SOCIAL_LIKE', () => {
    const state = {
      isSocialLiked: false
    }
    SET_SOCIAL_LIKE(state, true)
    expect(state.isSocialLiked)
      .to.equal(true)
  })

  it('SET_SOCIAL', () => {
    const state = {
      social: {}
    }
    SET_SOCIAL(state, { a: 'b' })
    expect(state.social)
      .to.deep.equal({ a: 'b' })
  })

  it('INCREASE_VIEW_COUNT', () => {
    const state = {
      social: {
        [SOCIAL.VIEW_COUNT]: 22
      }
    }
    INCREASE_VIEW_COUNT(state, state.social[SOCIAL.VIEW_COUNT])
    expect(state.social[SOCIAL.VIEW_COUNT])
      .to.equal(23)
  })

  it('INCREASE_LIKE_COUNT', () => {
    const state = {
      social: {
        [SOCIAL.LIKE_COUNT]: 4
      }
    }
    INCREASE_LIKE_COUNT(state, state.social[SOCIAL.LIKE_COUNT])
    expect(state.social[SOCIAL.LIKE_COUNT])
      .to.equal(5)
  })

  it('DECREASE_LIKE_COUNT', () => {
    const state = {
      social: {
        [SOCIAL.LIKE_COUNT]: 14
      }
    }
    DECREASE_LIKE_COUNT(state, state.social[SOCIAL.LIKE_COUNT])
    expect(state.social[SOCIAL.LIKE_COUNT])
      .to.equal(13)
  })

  it('INCREASE_COMMENT_COUNT', () => {
    const state = {
      social: {
        [SOCIAL.COMMENT_COUNT]: 10
      }
    }
    INCREASE_COMMENT_COUNT(state, state.social[SOCIAL.COMMENT_COUNT])
    expect(state.social[SOCIAL.COMMENT_COUNT])
      .to.equal(11)
  })

  it('SET_COMMENTS', () => {
    const state = {
      comments: []
    }
    SET_COMMENTS(state, [1, 2, 3])
    expect(state.comments)
      .to.deep.equal([1, 2, 3])
  })

  it('ADD_COMMENT', () => {
    const state = {
      comments: [1, 2, 3]
    }
    ADD_COMMENT(state, { z: 4 })
    expect(state.comments)
      .to.deep.equal([1, 2, 3, { z: 4 }])
  })
})
