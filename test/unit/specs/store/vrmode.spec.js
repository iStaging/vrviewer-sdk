import { getters, actions, mutations } from '../../../../src/store/modules/vrmode'
import { testAction } from '../App.spec'
import store from '../../../../src/store'
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
const Krpano = function () {
  return {
    set: function (name, value) {
    },
    call: function (name) {
    }
  }
}
const krpano = new Krpano()

describe('store/modules/vrmode', () => {
  it('isVrMode', () => {
    const state = {
      isVrMode: false
    }
    const result = isVrMode(state, { isVrMode })
    expect(result).toEqual(false)
  })

  it('enterVrMode', done => {
    store.dispatch('setKrpanoEl', krpano)
    const state = {
      isVrMode: false
    }
    testAction(enterVrMode, undefined, state, [
      { type: 'SET_VR_MODE', payload: true },
      { type: 'SET_CAMERA_ROTATING', payload: false }
    ], undefined, done)
  })

  it('exitVrMode', done => {
    store.dispatch('setKrpanoEl', krpano)
    const state = {
      isVrMode: true
    }
    testAction(exitVrMode, undefined, state, [
      { type: 'SET_VR_MODE', payload: false },
      { type: 'SET_CAMERA_ROTATING', payload: true }
    ], undefined, done)
  })

  it('SET_VR_MODE', () => {
    const state = {
      isVrMode: false
    }
    SET_VR_MODE(state, true)
    expect(state.isVrMode)
      .toEqual(true)
  })
})
