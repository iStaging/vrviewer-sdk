import { getters, actions, mutations } from '../../../../src/store/modules/share'
import { testAction } from '../App.spec'
import { isEqual } from '../../../../src/api/utils'
const {
  isShareActive,
  shareUrl
} = getters
const {
  showShare,
  toggleShare,
  closeShare,
  setShareUrl
} = actions
const {
  SET_SHARE_ACTIVE,
  SET_SHARE_URL
} = mutations

describe('store/modules/share', () => {
  it('isShareActive', () => {
    const state = {
      isShareActive: false
    }
    const result = isShareActive(state, { isShareActive })
    expect(result).toEqual(false)
  })

  it('shareUrl', () => {
    const state = {
      shareUrl: {
        origin: '',
        qrcode: ''
      }
    }
    const result = shareUrl(state, { shareUrl })
    expect(isEqual(result, {
      origin: '',
      qrcode: ''
    })).toBe(true)
  })

  it('showShare', done => {
    const state = {
      isShareActive: false
    }
    testAction(showShare, undefined, state, [
      { type: 'SET_SHARE_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('toggleShare', done => {
    const state = {
      isShareActive: false
    }
    testAction(toggleShare, undefined, state, undefined, [{
      type: 'showShare'
    }], done)

    state.isShareActive = true
    testAction(toggleShare, undefined, state, undefined, [{
      type: 'closeShare'
    }], done)
  })

  it('closeShare', done => {
    const state = {
      isShareActive: true
    }
    testAction(closeShare, undefined, state, [{
      type: 'SET_SHARE_ACTIVE', payload: false
    }], undefined, done)
  })

  it('setShareUrl', done => {
    const state = {
      shareUrl: {
        origin: '',
        qrcode: ''
      }
    }
    const url = 'https://www.istaging.com/'
    testAction(setShareUrl, url, state, [{
      type: 'SET_SHARE_URL', payload: url
    }], undefined, done)
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
    const state = {
      shareUrl: {
        origin: '',
        qrcode: ''
      }
    }
    const url = 'https://www.istaging.com/'
    let divider = '?ref='
    if (url && url.indexOf('?') > -1) {
      divider = '&ref='
    }
    SET_SHARE_URL(state, url)
    expect(state.shareUrl.origin)
      .toEqual(url)
    expect(state.shareUrl.qrcode)
      .toEqual(`${url}${divider}qrcode`)
  })
})
