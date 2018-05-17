import { DEFAULT_SETTING } from '@/api/constants'

const state = {
  setting: DEFAULT_SETTING
}

export const getters = {
  autoRotateSetting: state => state.setting.autoRotateSetting,
  gyroSetting: state => state.setting.gyroSetting,
  krpanoSetting: state => state.setting.krpanoSetting,
  tripodSetting: state => state.setting.tripodSetting,
  hideUISetting: state => state.setting.hideUISetting,
  shareSetting: state => state.setting.shareSetting
}

export const actions = {
  importSetting ({ commit }, setting = {}) {
    commit('SET_SETTING', setting)
  }
}

export const mutations = {
  SET_SETTING (state, setting = {}) {
    if (setting.autoRotateSetting) {
      state.setting.autoRotateSetting = setting.autoRotateSetting
    }
    if (setting.gyroSetting) {
      state.setting.gyroSetting = setting.gyroSetting
    }
    if (setting.krpanoSetting) {
      state.setting.krpanoSetting = setting.krpanoSetting
    }
    if (setting.tripodSetting) {
      state.setting.tripodSetting = setting.tripodSetting
    }
    if (setting.hideUISetting) {
      state.setting.hideUISetting = setting.hideUISetting
    }
    if (setting.shareSetting) {
      state.setting.shareSetting = setting.shareSetting
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
