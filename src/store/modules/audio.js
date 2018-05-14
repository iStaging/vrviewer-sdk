import gaEvents from '~js/ga-events'

const state = {
  audioEl: null,
  isAudioPlaying: false
}

export const getters = {
  audioEl: state => state.audioEl,
  isAudioPlaying: state => state.isAudioPlaying
}

export const actions = {
  setAudioEl ({ commit, state }, audioEl = null) {
    if (audioEl === null) {
      commit('SET_AUDIO_STATUS', false)
    }
    if (state.audioEl) {
      state.audioEl.pause()
    }
    commit('SET_AUDIO_EL', audioEl)
  },

  playAudio ({ commit, state, rootState }) {
    if (state.isAudioPlaying === false) {
      if (state.audioEl) {
        state.audioEl.play()
        gaEvents.sendEvent('Building', 'TurnMusicOn', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
        commit('SET_AUDIO_STATUS', true)
      }
    }
  },

  toggleAudio ({ dispatch, state }) {
    if (state.isAudioPlaying === true) {
      dispatch('pauseAudio')
    } else {
      dispatch('playAudio')
    }
  },

  pauseAudio ({ commit, state, rootState }) {
    if (state.isAudioPlaying === true) {
      if (state.audioEl) {
        state.audioEl.pause()
        gaEvents.sendEvent('Building', 'TurnMusicOff', rootState.route.params.buildingId || rootState.buildings.currentBuilding.objectId || '')
        commit('SET_AUDIO_STATUS', false)
      }
    }
  }
}

export const mutations = {
  SET_AUDIO_EL (state, audioEl = null) {
    state.audioEl = audioEl
    if (state.audioEl) {
      state.audioEl.load()
    }
  },

  SET_AUDIO_STATUS (state, bool = false) {
    state.isAudioPlaying = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
