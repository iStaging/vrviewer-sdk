import { getters, actions, mutations } from '@/store/modules/qr-code'
import { testAction } from '../App.spec'
const {
  isShareActive,
  shareUrl
} = getters
const {
  toggleShare,
  closeShare,
  setShareUrl
} = actions
const {
  SET_SHARE_ACTIVE,
  SET_SHARE_URL
} = mutations

describe('store/modules/qr-code', () => {
  it('isShareActive', () => {
    const state = {
      isShareActive: false
    }
    const result = isShareActive(state, { isShareActive })
    expect(result).toEqual(false)
  })

  it('shareUrl', () => {
    const url = 'test://url'
    const state = {
      shareUrl: url
    }
    const result = shareUrl(state, { shareUrl })
    expect(result).toEqual(url)
  })

  it('toggleShare', done => {
    const state = {
      isShareActive: false
    }
    testAction(toggleShare, undefined, state, [
      { type: 'SET_SHARE_ACTIVE', payload: !state.isShareActive }
    ], undefined, done)
  })

  it('closeShare', done => {
    const state = {
      isShareActive: true
    }
    testAction(closeShare, undefined, state, [
      { type: 'SET_SHARE_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('setShareUrl', done => {
    const url = 'test://url'
    const state = {
      shareUrl: url
    }
    testAction(setShareUrl, url, state, [
      { type: 'SET_SHARE_URL', payload: url }
    ], undefined, done)
  })

  it('SET_SHARE_ACTIVE', () => {
    const state = {
      isShareActive: false
    }
    SET_SHARE_ACTIVE(state, true)
    expect(state.isShareActive)
      .toEqual(true)
  })

  it('SET_SHARE_URL', () => {
    const url = 'test://url'
    const state = {
      shareUrl: url
    }
    SET_SHARE_URL(state, url)
    expect(state.shareUrl)
      .toEqual(url)
  })
})
