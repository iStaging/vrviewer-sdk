import { getters, actions, mutations } from '@/store/modules/promotion'
import { testAction } from '../App.spec'
const {
  isPromotionBarActive
} = getters
const {
  showPromotionBar,
  closePromotionBar
} = actions
const {
  SET_PROMOTION_BAR_ACTIVE
} = mutations

describe('store/modules/promotion', () => {
  it('isPromotionBarActive', () => {
    const state = {
      isPromotionBarActive: false
    }
    const result = isPromotionBarActive(state, { isPromotionBarActive })
    expect(result).to.equal(false)
  })

  it('showPromotionBar', done => {
    const state = {
      isPromotionBarActive: false
    }
    testAction(showPromotionBar, undefined, state, [
      { type: 'SET_PROMOTION_BAR_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('closePromotionBar', done => {
    const state = {
      isPromotionBarActive: true
    }
    testAction(closePromotionBar, undefined, state, [
      { type: 'SET_PROMOTION_BAR_ACTIVE', payload: false }
    ], undefined, done)
  })

  it('SET_PROMOTION_BAR_ACTIVE', () => {
    const state = {
      isPromotionBarActive: false
    }
    SET_PROMOTION_BAR_ACTIVE(state, true)
    expect(state.isPromotionBarActive)
      .to.equal(true)
  })
})
