import { getters, actions, mutations } from '../../../../src/store/modules/krpano'
import { testAction } from '../App.spec'
import store from '../../../../src/store'
import sinon from 'sinon'
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
const {
  krpanoEl,
  isKrpanoActive,
  krpanoLookAtH,
  isCameraRotating,
  autoStartRotateTimer,
  krpanoXOffset,
  isGyroEnabled,
  isGyroFromIframe
} = getters
const {
  setKrpanoEl,
  setKrpanoActive,
  setKrpanoLookAtH,
  startAutoRotate,
  stopAutoRotate,
  startGyro,
  toggleGyro,
  stopGyro
} = actions
const {
  SET_KRPANO_EL,
  SET_KRPANO_ACTIVE,
  SET_KRPANO_LOOK_AT_H,
  SET_CAMERA_ROTATING,
  SET_AUTO_START_ROTATE_TIMER,
  SET_GYRO_ENABLED,
  SET_GYRO_FROM_IFRAME
} = mutations
const Krpano = function () {
  return {
    set: function (name, value) {
    },
    call: function (name) {
      emitter.emit(name)
    }
  }
}
const krpano = new Krpano()
const Timer = function () {
  return {}
}
const timer = new Timer()
describe('store/modules/krpano', () => {
  it('krpanoEl', () => {
    const state = {
      krpanoEl: null
    }
    const result = krpanoEl(state, { krpanoEl })
    expect(result).toEqual(null)
  })

  it('isKrpanoActive', () => {
    const state = {
      isKrpanoActive: false
    }
    const result = isKrpanoActive(state, { isKrpanoActive })
    expect(result).toEqual(false)
  })

  it('krpanoLookAtH', () => {
    const state = {
      krpanoCamera: {
        krpanoLookAtH: 30
      }
    }
    const result = krpanoLookAtH(state, { krpanoLookAtH })
    expect(result).toEqual(30)
  })

  it('isCameraRotating', () => {
    const state = {
      krpanoCamera: {
        isCameraRotating: false
      }
    }
    const result = isCameraRotating(state, { isCameraRotating })
    expect(result).toEqual(false)
  })

  it('autoStartRotateTimer', () => {
    const state = {
      krpanoCamera: {
        autoStartRotateTimer: null
      }
    }
    const result = autoStartRotateTimer(state, { autoStartRotateTimer })
    expect(result).toEqual(null)
  })

  it('krpanoXOffset', () => {
    const state = {
      krpanoXOffset: 90
    }
    const result = krpanoXOffset(state, { krpanoXOffset })
    expect(result).toEqual(90)
  })

  it('isGyroEnabled', () => {
    const state = {
      isGyroEnabled: false
    }
    const result = isGyroEnabled(state, { isGyroEnabled })
    expect(result).toEqual(false)
  })

  it('isGyroFromIframe', () => {
    const state = {
      isGyroFromIframe: false
    }
    const result = isGyroFromIframe(state, { isGyroFromIframe })
    expect(result).toEqual(false)
  })

  it('setKrpanoEl', done => {
    const state = {
      krpanoEl: null
    }
    testAction(setKrpanoEl, krpano, state, [
      { type: 'SET_KRPANO_EL', payload: krpano }
    ], undefined, done)
  })

  it('setKrpanoActive', done => {
    const state = {
      isKrpanoActive: false
    }
    testAction(setKrpanoActive, true, state, [
      { type: 'SET_KRPANO_ACTIVE', payload: true }
    ], undefined, done)
  })

  it('setKrpanoLookAtH', done => {
    const state = {
      krpanoCamera: {
        krpanoLookAtH: 0
      }
    }
    testAction(setKrpanoLookAtH, { h: 80, v: 15 }, state, [
      { type: 'SET_KRPANO_LOOK_AT_H', payload: { h: 80, v: 15 } }
    ], undefined, done)
  })

  it('startAutoRotate', done => {
    const state = {
      krpanoEl: krpano,
      krpanoCamera: {
        isCameraRotating: false
      }
    }
    testAction(startAutoRotate, undefined, state, [
      { type: 'SET_CAMERA_ROTATING', payload: true }
    ], undefined, done)
  })

  it('stopAutoRotate', done => {
    const state = {
      krpanoEl: krpano,
      krpanoCamera: {
        isCameraRotating: true
      }
    }
    testAction(stopAutoRotate, { shouldAutoStartRotate: false }, state, [
      { type: 'SET_CAMERA_ROTATING', payload: false },
      { type: 'SET_AUTO_START_ROTATE_TIMER', payload: null }
    ], undefined, done)
  })

  it('stopAutoRotate and auto startAutoRotate', done => {
    const duration = 200
    store.commit('SET_CAMERA_ROTATING', true)
    store.dispatch('setKrpanoEl', krpano)
    store.dispatch('stopAutoRotate', {
      shouldAutoStartRotate: true,
      duration
    })
    expect(store.state.krpano.krpanoCamera.isCameraRotating)
      .toEqual(false)
    window.setTimeout(() => {
      expect(store.state.krpano.krpanoCamera.isCameraRotating)
        .toEqual(true)
      done()
    }, duration + 100)
  })

  it('startGyro', done => {
    const state = {
      krpanoEl: krpano,
      isGyroEnabled: false
    }
    testAction(startGyro, undefined, state, [{
      type: 'SET_GYRO_ENABLED', payload: true
    }], undefined, done)
  })

  it('toggleGyro', done => {
    const state = {
      krpanoEl: krpano,
      isGyroEnabled: false
    }
    testAction(toggleGyro, undefined, state, undefined, [{
      type: 'startGyro'
    }], done)

    state.isGyroEnabled = true
    testAction(toggleGyro, undefined, state, undefined, [{
      type: 'stopGyro'
    }], done)
  })

  it('stopGyro', done => {
    const state = {
      krpanoEl: krpano,
      isGyroEnabled: true
    }
    testAction(stopGyro, undefined, state, [{
      type: 'SET_GYRO_ENABLED', payload: false
    }], undefined, done)
  })

  it('zoomIn', () => {
    const spy = sinon.spy()
    emitter.on('zoom_in();', spy)
    store.dispatch('zoomIn')
    expect(spy.called)
      .toEqual(true)
  })

  it('zoomOut', () => {
    const spy = sinon.spy()
    emitter.on('zoom_out();', spy)
    store.dispatch('zoomOut')
    expect(spy.called)
      .toEqual(true)
  })

  it('SET_KRPANO_EL', () => {
    const state = {
      krpanoEl: null
    }
    SET_KRPANO_EL(state, krpano)
    expect(state.krpanoEl)
      .toEqual(krpano)
  })

  it('SET_KRPANO_ACTIVE', () => {
    const state = {
      isKrpanoActive: false
    }
    SET_KRPANO_ACTIVE(state, true)
    expect(state.isKrpanoActive)
      .toEqual(true)
  })

  it('SET_KRPANO_LOOK_AT_H', () => {
    const state = {
      krpanoCamera: {
        krpanoLookAt: 20
      }
    }
    SET_KRPANO_LOOK_AT_H(state, 20)
    expect(state.krpanoCamera.krpanoLookAtH)
      .toEqual(20)
  })

  it('SET_CAMERA_ROTATING', () => {
    const state = {
      krpanoCamera: {
        isCameraRotating: false
      }
    }
    SET_CAMERA_ROTATING(state, true)
    expect(state.krpanoCamera.isCameraRotating)
      .toEqual(true)
  })

  it('SET_AUTO_START_ROTATE_TIMER', () => {
    const state = {
      krpanoCamera: {
        autoStartRotateTimer: null
      }
    }
    SET_AUTO_START_ROTATE_TIMER(state, timer)
    expect(state.krpanoCamera.autoStartRotateTimer)
      .toEqual(timer)
  })

  it('SET_GYRO_ENABLED', () => {
    const state = {
      isGyroEnabled: false
    }
    SET_GYRO_ENABLED(state, true)
    expect(state.isGyroEnabled)
      .toEqual(true)
  })

  it('SET_GYRO_FROM_IFRAME', () => {
    const state = {
      isGyroFromIframe: false
    }
    SET_GYRO_FROM_IFRAME(state, true)
    expect(state.isGyroFromIframe)
      .toEqual(true)
  })
})
