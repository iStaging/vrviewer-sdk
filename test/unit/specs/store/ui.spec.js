import { getters, actions, mutations } from '@/store/modules/ui'
import { testAction } from '../App.spec'
import router from '@/router'
const {
  isUiMode
} = getters
const {
  initUiMode
} = actions
const {
  SET_UI_MODE
} = mutations

describe('store/modules/ui', () => {
  it('isUiMode', () => {
    const state = {
      isUiMode: false
    }
    const result = isUiMode(state, { isUiMode })
    expect(result).to.equal(false)
  })

  it('initUiMode url has nothing', done => {
    const state = {
      isUiMode: false
    }
    testAction(initUiMode, undefined, state, [
      { type: 'SET_UI_MODE', payload: false }
    ], undefined, done)
  })

  it('initUiMode url has ui=true', done => {
    const state = {
      isUiMode: false
    }
    router.push('/?ui=true')
    testAction(initUiMode, undefined, state, [
      { type: 'SET_UI_MODE', payload: true }
    ], undefined, done)
  })

  it('SET_UI_MODE', () => {
    const state = {
      isUiMode: false
    }
    SET_UI_MODE(state, true)
    expect(state.isUiMode)
      .to.equal(true)
  })
})
