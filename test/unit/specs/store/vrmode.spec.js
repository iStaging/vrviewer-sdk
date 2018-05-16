import { getters, actions, mutations } from '@/store/modules/vrmode'
import { testAction } from '../App.spec'
const {
  isVrMode
} = getters
const {
  enterVrMode,
  exitVrMode
} = actions
const {
  SET_VR_MODE
} = mutations

describe('store/modules/vrmode', () => {
  it('isVrMode', () => {
    const state = {
      isVrMode: false
    }
    const result = isVrMode(state, { isVrMode })
    expect(result).to.equal(false)
  })

  it('enterVrMode', done => {
    const state = {
      isVrMode: false
    }
    testAction(enterVrMode, undefined, state, [
      { type: 'SET_VR_MODE', payload: true }
    ], undefined, done)
  })

  it('exitVrMode', done => {
    const state = {
      isVrMode: true
    }
    testAction(exitVrMode, undefined, state, [
      { type: 'SET_VR_MODE', payload: false }
    ], undefined, done)
  })

  it('SET_VR_MODE', () => {
    const state = {
      isVrMode: false
    }
    SET_VR_MODE(state, true)
    expect(state.isVrMode)
      .to.equal(true)
  })
})
