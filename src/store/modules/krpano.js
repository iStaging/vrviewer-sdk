import gaEvents from '~js/ga-events'
import {
  isIframe,
  isIOS
} from '~js/utils'
import {
  AUTO_START_ROTATE_TIMER
} from '~js/constants'

const state = {
  krpanoEl: null,
  isKrpanoActive: false,
  krpanoCamera: {
    krpanoLookAtH: 0,
    isCameraRotating: false,
    autoStartRotateTimer: null
  },
  krpanoXOffset: 90, // because A-frame <a-sky> has rotation 90
  isGyroEnabled: false,
  isGyroFromIframe: false
}

export const getters = {
  krpanoEl: state => state.krpanoEl,
  isKrpanoActive: state => state.isKrpanoActive,
  krpanoLookAtH: state => state.krpanoCamera.krpanoLookAtH,
  isCameraRotating: state => state.krpanoCamera.isCameraRotating,
  autoStartRotateTimer: state => state.krpanoCamera.autoStartRotateTimer,
  krpanoXOffset: state => state.krpanoXOffset,
  isGyroEnabled: state => state.isGyroEnabled,
  isGyroFromIframe: state => state.isGyroFromIframe
}

export const actions = {
  setKrpanoEl ({ commit }, krpanoEl = null) {
    commit('SET_KRPANO_EL', krpanoEl)
  },

  setKrpanoActive ({ commit }, bool = false) {
    commit('SET_KRPANO_ACTIVE', bool)
  },

  setKrpanoLookAtH ({ commit }, h = 0) {
    commit('SET_KRPANO_LOOK_AT_H', h)
  },

  startAutoRotate ({ commit, state, rootState }) {
    if (process.env.AUTO_ROTATE && rootState.route.query.autorotate !== 'false') {
      if (state.krpanoCamera.isCameraRotating === false &&
        state.krpanoEl &&
        !state.isGyroFromIframe) {
        state.krpanoEl.call(`auto_rotate();`)
        commit('SET_CAMERA_ROTATING', true)
      }
    }
  },

  stopAutoRotate ({ dispatch, commit, state, rootState }, { shouldAutoStartRotate = false, duration = AUTO_START_ROTATE_TIMER, stopMethod = '' }) {
    if (process.env.AUTO_ROTATE) {
      if (state.krpanoCamera.isCameraRotating === true) {
        state.krpanoEl.call(`stop_auto_rotate();`)
        commit('SET_CAMERA_ROTATING', false)
        if (stopMethod) {
          gaEvents.sendEvent('Panorama', `StopAutoRotateBy${stopMethod}`, rootState.panoramas.currentPanorama.objectId)
        }
      }
      if (state.krpanoCamera.autoStartRotateTimer !== null) {
        window.clearTimeout(state.krpanoCamera.autoStartRotateTimer)
      }
      if (shouldAutoStartRotate) {
        const autoStartRotateTimer = window.setTimeout(() => {
          dispatch('startAutoRotate')
        }, duration)
        commit('SET_AUTO_START_ROTATE_TIMER', autoStartRotateTimer)
      } else {
        commit('SET_AUTO_START_ROTATE_TIMER', null)
      }
    }
  },

  startGyro ({ commit, state }) {
    if (state.isGyroEnabled === false && state.krpanoEl) {
      if (state.isGyroFromIframe) {
        const gyroMessage = state.krpanoEl.get('plugin[gyroMessage]')
        if (gyroMessage) {
          gyroMessage.enable()
        }
      } else {
        state.krpanoEl.call('start_gyro();')
      }
      commit('SET_GYRO_ENABLED', true)
    } else {
      console.log('gyro doesn\'t start')
    }
  },

  toggleGyro ({ dispatch, state, rootState }) {
    if (state.isGyroEnabled === true) {
      dispatch('stopGyro')
    } else {
      dispatch('startGyro')
    }
  },

  stopGyro ({ commit, state, rootState }) {
    if (state.isGyroEnabled === true && state.krpanoEl) {
      if (state.isGyroFromIframe) {
        const gyroMessage = state.krpanoEl.get('plugin[gyroMessage]')
        if (gyroMessage) {
          gyroMessage.disable()
        }
      } else {
        state.krpanoEl.call('stop_gyro();')
      }
      gaEvents.sendEvent('Building', 'TurnGyroOff', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
      commit('SET_GYRO_ENABLED', false)
    } else {
      console.log('gyro doesn\'t stop')
    }
  },

  initGyroFromIframe ({ commit, dispatch }, bool = false) {
    function receiveMessage (event) {
      // Do we trust the sender of this message?  (might be
      // different from what we originally opened, for example).
      // if (event.origin !== "http://example.com")
      //   return;
      const data = JSON.parse(event.data)
      if (data.alpha !== null && data.beta !== null && data.gamma !== null) {
        dispatch('initGyroFromIframe', true)
      }
      window.removeEventListener('message', receiveMessage, false)
    }

    if (isIframe() && isIOS()) {
      window.addEventListener('message', receiveMessage, false)
      commit('SET_GYRO_FROM_IFRAME', bool)
    }
  },

  zoomIn ({ state }) {
    if (state.krpanoEl) {
      state.krpanoEl.call(`zoom_in();`)
    }
  },

  zoomOut ({ state }) {
    if (state.krpanoEl) {
      state.krpanoEl.call(`zoom_out();`)
    }
  }
}

export const mutations = {
  SET_KRPANO_EL (state, krpanoEl = null) {
    state.krpanoEl = krpanoEl
  },

  SET_KRPANO_ACTIVE (state, bool = false) {
    state.isKrpanoActive = bool
  },

  SET_KRPANO_LOOK_AT_H (state, h = 0) {
    state.krpanoCamera.krpanoLookAtH = h
  },

  SET_CAMERA_ROTATING (state, bool = false) {
    if (process.env.AUTO_ROTATE) {
      if (state.krpanoCamera) {
        state.krpanoCamera.isCameraRotating = bool
      }
    }
  },

  SET_AUTO_START_ROTATE_TIMER (state, timer = null) {
    if (process.env.AUTO_ROTATE) {
      if (state.krpanoCamera) {
        state.krpanoCamera.autoStartRotateTimer = timer
      }
    }
  },

  SET_GYRO_ENABLED (state, bool = false) {
    state.isGyroEnabled = bool
  },

  SET_GYRO_FROM_IFRAME (state, bool = false) {
    state.isGyroFromIframe = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
