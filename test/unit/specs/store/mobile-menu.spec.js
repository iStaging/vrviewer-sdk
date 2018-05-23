import { getters, actions, mutations } from '../../../../src/store/modules/mobile-menu'
import { testAction } from '../main.spec'
const {
  isMobileMenuActive
} = getters
const {
  showMobileMenu,
  closeMobileMenu
} = actions
const {
  SET_MOBILE_MENU_ACTIVE
} = mutations

describe('store/modules/mobile-menu', () => {
  it('isMobileMenuActive', () => {
    const state = {
      isMobileMenuActive: false
    }
    const result = isMobileMenuActive(state, { isMobileMenuActive })
    expect(result).toEqual(false)
  })

  it('showMobileMenu', done => {
    const state = {
      isMobileMenuActive: false
    }
    testAction(showMobileMenu, undefined, state, [
      { type: 'SET_MOBILE_MENU_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('closeMobileMenu', done => {
    const state = {
      isMobileMenuActive: true
    }
    testAction(closeMobileMenu, undefined, state, [
      { type: 'SET_MOBILE_MENU_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_MOBILE_MENU_ACTIVE', () => {
    const state = {
      isMobileMenuActive: false
    }
    SET_MOBILE_MENU_ACTIVE(state, true)
    expect(state.isMobileMenuActive)
      .toEqual(true)
  })
})
