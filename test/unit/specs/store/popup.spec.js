import { getters, actions, mutations } from '@/store/modules/popup'
import { testAction } from '../App.spec'
import {
  POPUP
} from '../../../../src/api/constants'
import { isEqual } from '../../../../src/api/utils'
const {
  isPopupActive,
  popupUrl,
  popupSizeConfig
} = getters
const {
  showPopup,
  closePopup,
  setPopupUrl,
  setPopupSizeConfig
} = actions
const {
  SET_POPUP_ACTIVE,
  SET_POPUP_URL,
  SET_POPUP_SIZE_CONFIG
} = mutations

describe('store/modules/popup', () => {
  it('isPopupActive', () => {
    const state = {
      isPopupActive: false
    }
    const result = isPopupActive(state, { isPopupActive })
    expect(result).toEqual(false)
  })

  it('popupUrl', () => {
    const url = 'https://www.istaging.com/zh-tw/'
    const state = {
      popupUrl: url
    }
    const result = popupUrl(state, { popupUrl })
    expect(result).toEqual(url)
  })

  it('popupSizeConfig', () => {
    const config = {
      width: POPUP.WIDTH,
      height: POPUP.HEIGHT,
      widthPercent: POPUP.WIDTH_PERCENT,
      widthType: POPUP.WIDTH_TYPE
    }
    const state = {
      popupSizeConfig: config
    }
    const result = popupSizeConfig(state, { popupSizeConfig })
    expect(isEqual(result, config)).toBe(true)
  })

  it('showPopup', done => {
    const state = {
      isPopupActive: false
    }
    testAction(showPopup, undefined, state, [
      { type: 'SET_POPUP_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('closePopup', done => {
    const state = {
      isPopupActive: true
    }
    testAction(closePopup, undefined, state, [
      { type: 'SET_POPUP_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('setPopupUrl', done => {
    const url = 'https://www.istaging.com/zh-tw/'
    const state = {
      popupUrl: url
    }
    testAction(setPopupUrl, url, state, [
      { type: 'SET_POPUP_URL', payload: url }
    ], undefined, done)
  })

  it('setPopupSizeConfig', done => {
    const config = {
      width: 320,
      height: 568,
      widthPercent: 75,
      widthType: 'pixel'
    }
    const state = {
      popupSizeConfig: config
    }
    testAction(setPopupSizeConfig, config, state, [{
      type: 'SET_POPUP_SIZE_CONFIG',
      payload: config
    }], undefined, done)
  })

  it('SET_POPUP_ACTIVE', () => {
    const state = {
      isPopupActive: false
    }
    SET_POPUP_ACTIVE(state, true)
    expect(state.isPopupActive)
      .toEqual(true)
  })

  it('SET_POPUP_URL', () => {
    const url = 'https://www.istaging.com/zh-tw/'
    const state = {
      popupUrl: url
    }
    SET_POPUP_URL(state, url)
    expect(state.popupUrl)
      .toEqual(url)
  })

  it('SET_POPUP_SIZE_CONFIG', () => {
    const config = {
      width: 1024,
      height: 768,
      widthPercent: 45,
      widthType: 'pixel'
    }
    const state = {
      popupSizeConfig: config
    }
    SET_POPUP_SIZE_CONFIG(state, config)
    expect(isEqual(state.popupSizeConfig, config)).toBe(true)
  })
})
