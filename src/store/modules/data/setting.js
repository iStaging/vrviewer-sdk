const state = {
  setting: {
    krpanoSetting: {
      mwheel: true,
      focus: false
    }
  }
}

export const getters = {
  krpanoSetting: state => state.setting.krpanoSetting
}

export const actions = {
  importSetting ({ commit }, setting = {}) {
    commit('SET_SETTING', setting)
  }
}

export const mutations = {
  SET_SETTING (state, setting = {}) {
    state.setting = setting
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
