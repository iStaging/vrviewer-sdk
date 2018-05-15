import { DEFAULT_SETTING } from '@/api/constants'

const state = {
  setting: DEFAULT_SETTING
}

export const getters = {
  autoRotateSetting: state => state.setting.autoRotateSetting,
  gyroSetting: state => state.setting.gyroSetting,
  krpanoSetting: state => state.setting.krpanoSetting,
  tripodSetting: state => state.setting.tripodSetting
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
